export type CampaignParams = {
  gclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

const KEYS = [
  'gclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export function readCampaignParams(search: string): CampaignParams {
  const q = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const pick = (key: (typeof KEYS)[number]) => {
    const value = q.get(key)?.trim();
    return value ? value.slice(0, 200) : undefined;
  };
  return {
    gclid: pick('gclid'),
    utmSource: pick('utm_source'),
    utmMedium: pick('utm_medium'),
    utmCampaign: pick('utm_campaign'),
    utmContent: pick('utm_content'),
    utmTerm: pick('utm_term'),
  };
}
