import Script from 'next/script';

/** Preencha quando a conversão de Google Ads estiver criada. Vazio = pixel desligado. */
const ADS_GTAG_ID = '';
const ADS_CONVERSION_LABEL = '';

const SAFE = /^[A-Z0-9_./-]+$/i;

export function ConversionPixel() {
  const id = ADS_GTAG_ID.trim();
  const label = ADS_CONVERSION_LABEL.trim();
  if (!id || !label || !SAFE.test(id) || !SAFE.test(label)) return null;
  const sendTo = `${id}/${label}`;
  return (
    <Script id="gtag-conversion" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('config', '${id}');
gtag('event', 'conversion', { send_to: '${sendTo}' });`}
    </Script>
  );
}
