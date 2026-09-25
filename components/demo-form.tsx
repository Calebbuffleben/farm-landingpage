'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { readCampaignParams, type CampaignParams } from '@/lib/campaign-params';
import { LeadApiError, submitDemoLead } from '@/lib/leads-api';

export function DemoForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [companyUrl, setCompanyUrl] = useState('');
  const [campaign, setCampaign] = useState<CampaignParams>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setCampaign(readCampaignParams(window.location.search));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError('É preciso autorizar o contato para seguir.');
      setBusy(false);
      return;
    }
    setBusy(true);
    try {
      await submitDemoLead({
        name,
        company,
        email,
        phone,
        consent: true,
        companyUrl: companyUrl || undefined,
        ...campaign,
      });
      router.push('/obrigado');
    } catch (err) {
      if (err instanceof LeadApiError) setError(friendlyError(err));
      else setError('Não foi possível enviar o pedido. Tente de novo.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div
        aria-hidden
        className="absolute -left-[10000px] h-0 w-0 overflow-hidden"
      >
        <label>
          Site da empresa
          <input
            tabIndex={-1}
            autoComplete="off"
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
          />
        </label>
      </div>

      <label className="label" htmlFor="name">
        Nome
        <input
          id="name"
          className="input mt-1"
          autoComplete="name"
          required
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="label" htmlFor="company">
        Nome da Empresa
        <input
          id="company"
          className="input mt-1"
          autoComplete="organization"
          required
          minLength={2}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>
      <label className="label" htmlFor="email">
        E-mail
        <input
          id="email"
          className="input mt-1"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="label" htmlFor="phone">
        WhatsApp
        <input
          id="phone"
          className="input mt-1"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          placeholder="(16) 99999-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <label className="flex items-start gap-3 text-[13px] leading-snug text-muted">
        <input
          className="mt-0.5 size-4 accent-accent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          Autorizo o Veros a usar estes dados para entrar em contato sobre a demonstração.
        </span>
      </label>

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <button className="btn" type="submit" disabled={busy || !consent}>
        {busy ? 'Enviando…' : 'Quero ver o painel com as minhas conversas'}
      </button>
    </form>
  );
}

function friendlyError(err: LeadApiError): string {
  if (err.status === 429) return 'Muitas tentativas. Espere um minuto e tente de novo.';
  if (/phone/i.test(err.message)) return 'Informe um WhatsApp com DDD.';
  if (/consent/i.test(err.message)) return 'É preciso autorizar o contato para seguir.';
  if (/email/i.test(err.message)) return 'Confira o e-mail.';
  return 'Não foi possível enviar o pedido. Tente de novo.';
}
