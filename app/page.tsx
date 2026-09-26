import { BrandMark } from '@/components/brand-mark';
import { DemoForm } from '@/components/demo-form';

const LOGIN_URL =
  process.env.NEXT_PUBLIC_APP_LOGIN_URL || 'http://localhost:3100/login';

const PAINS = [
  'O vendedor não alimenta o CRM a tempo. Sem informações, o gestor não tem como tomar uma decisão.',
  'O gestor e o vendedor precisam ficar revisando áudios e conversas para entender o que está acontecendo.',
  'A tomada de decisão demora para acontecer e a venda é perdida.',
];

const SOLUTIONS = [
  'Lê as conversas que o time já tem no WhatsApp. O vendedor ou gestor não preenchem nada.',
  'Assunto da conversa é resumido, sem precisar ficar lendo conversas e ouvindo áudios novamente.',
  'O gestor sabe exatamente o que está acontecendo com o cliente, sem precisar ficar revisando conversas e áudios.',
];

const SOLUTION_KICKERS = ['', '', ''];

const frame = 'mx-auto w-full min-w-0 max-w-[100rem] px-5 sm:px-8 lg:px-12 xl:px-16';

export default function LandingPage() {
  return (
    <div className="min-h-dvh w-full max-w-full overflow-x-clip bg-bg">
      <header className="sticky top-0 z-20 border-b border-line/80 bg-bg/90 backdrop-blur-md">
        <div className={`${frame} flex items-center justify-between gap-4 py-3`}>
          <div className="flex min-w-0 items-center gap-3">
            <BrandMark className="size-9 shrink-0" />
            <div className="min-w-0">
              <div className="font-display text-[22px] leading-none tracking-[-0.04em]">Veros</div>
              <div className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-faint sm:block">
                Inteligência comercial
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <a className="text-sm text-muted hover:text-ink" href={LOGIN_URL}>
              Já tenho conta
            </a>
            <a className="btn !min-h-10 !w-auto px-4 text-sm" href="#pedido">
              Solicitar uma demonstração
            </a>
          </div>
        </div>
        <div className={`${frame} pb-3 sm:hidden`}>
          <a className="btn" href="#pedido">
            Solicitar uma demonstração
          </a>
        </div>
      </header>

      <section className="soil relative">
        <span className="grain" />
        <div className={`${frame} relative z-10 py-16 sm:py-24 lg:py-28`}>
          <p className="eyebrow reveal mb-6 !text-crop">Para gerentes, gestores e diretores</p>
          <h1 className="reveal-2 font-display text-[clamp(2.25rem,3.5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Seu vendedor sabe a verdade{' '}
            <span className="lg:block">sobre a negociação.</span>{' '}
            <span className="lg:mt-1 lg:block">O seu CRM não.</span>
          </h1>
          <p className="reveal-3 mt-6 max-w-xl text-[clamp(1.15rem,1.5vw,1.4rem)] font-medium leading-snug text-white/72">
            Você só descobre que uma grande venda subiu{' '}
            <br className="hidden sm:block" />
            no telhado quando já é tarde demais.
          </p>
          <p className="reveal-3 mt-8 max-w-2xl text-base leading-relaxed text-white/70">
            Transforme áudios soltos do WhatsApp em fatos comerciais estruturados.
            <span className="mt-2 block text-white">
              Visibilidade total do pipeline sem exigir que o vendedor digite uma única linha.
            </span>
          </p>
        </div>
      </section>

      <section>
        <div className={`${frame} grid grid-cols-1 items-start gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24`}>
          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-4">
            <p className="eyebrow mb-4">O problema</p>
            <h2 className="max-w-full text-pretty font-display text-[clamp(1.9rem,2.5vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
              Quem controla a conversa é o vendedor. O gestor não vê.
            </h2>
          </div>
          <ol className="min-w-0 lg:col-span-8">
            {PAINS.map((pain, i) => (
              <li key={pain} className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-5 border-t border-line py-7 sm:gap-8 sm:py-8">
                <span className="font-mono text-sm tabular-nums text-accent">0{i + 1}</span>
                <p className="text-pretty font-display text-[clamp(1.2rem,1.6vw,1.65rem)] leading-snug tracking-[-0.03em] text-ink">
                  {pain}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <p className="hinge px-5 py-5 text-center font-mono text-[12px] font-medium uppercase tracking-[0.18em] sm:py-6 sm:text-sm">
        Sem planilha. Sem parar o vendedor.
      </p>

      <section className="soil relative">
        <span className="grain" />
        <div className={`${frame} relative z-10 grid grid-cols-1 items-start gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24`}>
          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-4">
            <p className="eyebrow mb-4 !text-crop">A solução</p>
            <h2 className="max-w-full text-pretty font-display text-[clamp(1.9rem,2.5vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
              O Veros lê a conversa. O painel diz o que fazer.
            </h2>
          </div>
          <ol className="min-w-0 lg:col-span-8">
            {SOLUTIONS.map((item, i) => (
              <li key={item} className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-5 border-t border-white/15 py-7 sm:gap-8 sm:py-8">
                <span className="font-mono text-sm tabular-nums text-crop">0{i + 1}</span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-crop">
                    {SOLUTION_KICKERS[i]}
                  </p>
                  <p className="mt-2 text-pretty font-display text-[clamp(1.2rem,1.6vw,1.65rem)] leading-snug tracking-[-0.03em] text-white">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pedido" className="scroll-mt-24 border-t border-line bg-surface">
        <div className={`${frame} grid grid-cols-1 items-start gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24`}>
          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-5">
            <p className="eyebrow mb-3">Demonstração</p>
            <h2 className="max-w-full text-pretty font-display text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Solicitar uma demonstração
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
              A gente agenda a conversa com a sua operação.
            </p>
            <a className="mt-8 inline text-sm text-muted hover:text-ink sm:hidden" href={LOGIN_URL}>
              Já tenho conta
            </a>
          </div>
          <div className="w-full min-w-0 max-w-xl lg:col-span-6 lg:col-start-7 lg:justify-self-end">
            <DemoForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className={`${frame} flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-faint`}>
          <span>Veros — inteligência comercial do agro</span>
          <span>Dados usados só para o contato da demonstração.</span>
        </div>
      </footer>
    </div>
  );
}
