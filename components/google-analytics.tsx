/** ID GA4 — snippet global no `<head>` do layout. */
export const GA_MEASUREMENT_ID = 'G-18DPESPQBD';

export const GA_INLINE_INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`;
