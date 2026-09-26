import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';
import './globals.css';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-plex-serif',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const title = 'O negócio acontece no WhatsApp do RTV. Você não vê. — Veros';
const description =
  'Áudio, objeção e “te retorno amanhã” ficam no celular. O Veros lê as conversas da revenda e mostra ao gestor o que fazer — sem o RTV preencher nada.';

export const metadata: Metadata = {
  title,
  description,
  applicationName: 'Veros',
  openGraph: {
    title,
    description,
    siteName: 'Veros',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: '#16130f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable}`}
    >
      <body className={plexSans.className}>{children}</body>
    </html>
  );
}
