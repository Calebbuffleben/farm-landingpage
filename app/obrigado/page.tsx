import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';
import { ConversionPixel } from '@/components/conversion-pixel';

export default function ObrigadoPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-5 py-16">
      <ConversionPixel />
      <div className="w-full max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <BrandMark className="size-11" />
        </div>
        <p className="eyebrow mb-3">Pedido recebido</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          Pedido recebido. Falamos com você em breve.
        </h1>
        <div className="mt-8 flex justify-center">
          <Link className="btn !w-auto px-5" href="/">
            Voltar para a página principal
          </Link>
        </div>
      </div>
    </main>
  );
}
