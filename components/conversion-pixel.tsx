import Script from 'next/script';

const SAFE = /^[A-Z0-9_./-]+$/i;

export function ConversionPixel() {
  const id = process.env.NEXT_PUBLIC_GTAG_ID?.trim();
  const label = process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL?.trim();
  if (!id || !label || !SAFE.test(id) || !SAFE.test(label)) return null;
  const sendTo = `${id}/${label}`;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');
gtag('event', 'conversion', { send_to: '${sendTo}' });`}
      </Script>
    </>
  );
}
