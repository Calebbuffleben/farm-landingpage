import type { CampaignParams } from './campaign-params';

export type DemoLeadPayload = CampaignParams & {
  name: string;
  company: string;
  email: string;
  phone: string;
  consent: true;
  companyUrl?: string;
};

export class LeadApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function submitDemoLead(payload: DemoLeadPayload): Promise<void> {
  const res = await fetch('/api/demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (res.ok) return;
  let message = 'Não foi possível enviar o pedido. Tente de novo.';
  try {
    const body = (await res.json()) as { message?: string | string[] };
    if (typeof body.message === 'string') message = body.message;
    else if (Array.isArray(body.message)) message = body.message[0] ?? message;
  } catch {
    /* ignore */
  }
  throw new LeadApiError(res.status, message);
}
