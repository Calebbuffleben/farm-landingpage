import { NextResponse } from 'next/server';

type DemoBody = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  consent?: unknown;
  companyUrl?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  utmTerm?: unknown;
  gclid?: unknown;
};

export async function POST(request: Request) {
  let body: DemoBody;
  try {
    body = (await request.json()) as DemoBody;
  } catch {
    return NextResponse.json({ message: 'Pedido inválido.' }, { status: 400 });
  }

  if (typeof body.companyUrl === 'string' && body.companyUrl.trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const name = text(body.name);
  const company = text(body.company);
  const email = text(body.email).toLowerCase();
  const phone = normalizeBrPhone(text(body.phone));
  if (name.length < 2) {
    return NextResponse.json({ message: 'Informe o nome.' }, { status: 400 });
  }
  if (company.length < 2) {
    return NextResponse.json({ message: 'Informe o nome da empresa.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: 'Confira o e-mail.' }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ message: 'Informe um WhatsApp com DDD.' }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ message: 'É preciso autorizar o contato para seguir.' }, { status: 400 });
  }

  const apiKey = process.env.MAILGUN_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ message: 'Envio de e-mail indisponível.' }, { status: 503 });
  }

  try {
    const domain = await sendingDomain(apiKey);
    const to = await notifyTo(apiKey);
    if (to.length === 0) {
      return NextResponse.json(
        { message: 'Nenhum destinatário autorizado no sandbox do Mailgun.' },
        { status: 503 },
      );
    }
    await sendDemoMail(apiKey, domain, to, {
      name,
      company,
      email,
      phone,
      utmSource: optional(body.utmSource),
      utmMedium: optional(body.utmMedium),
      utmCampaign: optional(body.utmCampaign),
      utmContent: optional(body.utmContent),
      utmTerm: optional(body.utmTerm),
      gclid: optional(body.gclid),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Não foi possível enviar o pedido.';
    return NextResponse.json({ message }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function optional(value: unknown): string | null {
  const trimmed = text(value);
  return trimmed ? trimmed.slice(0, 200) : null;
}

function normalizeBrPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13) return null;
  if (digits.length >= 12 && !digits.startsWith('55')) return null;
  return digits;
}

function mailgunBase(): string {
  return process.env.MAILGUN_REGION === 'eu'
    ? 'https://api.eu.mailgun.net'
    : 'https://api.mailgun.net';
}

function authHeader(apiKey: string): string {
  return `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`;
}

async function sendingDomain(apiKey: string): Promise<string> {
  const configured = process.env.MAILGUN_DOMAIN?.trim();
  if (configured) return configured;
  const res = await fetch(`${mailgunBase()}/v3/domains?limit=100`, {
    headers: { Authorization: authHeader(apiKey) },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Não foi possível falar com o Mailgun.');
  const data = (await res.json()) as { items?: { name?: string }[] };
  const names = (data.items ?? []).map((item) => item.name).filter((name): name is string => Boolean(name));
  const sandbox = names.find((name) => name.startsWith('sandbox')) ?? names[0];
  if (!sandbox) throw new Error('A conta Mailgun não tem domínio de envio.');
  return sandbox;
}

async function notifyTo(apiKey: string): Promise<string[]> {
  const configured = process.env.DEMO_NOTIFY_TO?.trim();
  if (configured) {
    return configured.split(',').map((item) => item.trim()).filter(Boolean);
  }
  const res = await fetch(`${mailgunBase()}/v5/sandbox/auth_recipients`, {
    headers: { Authorization: authHeader(apiKey) },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Mailgun não listou destinatários do sandbox (${res.status}).`);
  }
  const data = (await res.json()) as { recipients?: { email?: string; activated?: boolean }[] };
  const recipients = data.recipients ?? [];
  const active = recipients.filter((item) => item.activated && item.email).map((item) => item.email as string);
  if (recipients.length > 0 && active.length === 0) {
    throw new Error('O destinatário do sandbox ainda não confirmou o convite do Mailgun.');
  }
  return active;
}

async function sendDemoMail(
  apiKey: string,
  domain: string,
  to: string[],
  lead: {
    name: string;
    company: string;
    email: string;
    phone: string;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    utmContent: string | null;
    utmTerm: string | null;
    gclid: string | null;
  },
) {
  const from = process.env.DEMO_MAIL_FROM?.trim() || `Veros <postmaster@${domain}>`;
  const lines = [
    'Novo pedido de demonstração Veros',
    '',
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `E-mail: ${lead.email}`,
    `WhatsApp: ${lead.phone}`,
    `utm_source: ${lead.utmSource ?? '—'}`,
    `utm_medium: ${lead.utmMedium ?? '—'}`,
    `utm_campaign: ${lead.utmCampaign ?? '—'}`,
    `utm_content: ${lead.utmContent ?? '—'}`,
    `utm_term: ${lead.utmTerm ?? '—'}`,
    `gclid: ${lead.gclid ?? '—'}`,
  ];
  const body = new URLSearchParams({
    from,
    to: to.join(','),
    subject: `Demo Veros — ${lead.company}`,
    text: lines.join('\n'),
  });
  const res = await fetch(`${mailgunBase()}/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(apiKey),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  });
  const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!res.ok || !data.id) {
    throw new Error(data.message || 'O Mailgun recusou o envio.');
  }
}
