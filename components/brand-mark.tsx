export function BrandMark({
  className = 'size-9',
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span
      className={[
        'relative grid shrink-0 place-items-center overflow-hidden rounded-sm',
        inverted ? 'bg-white text-accent' : 'bg-accent text-accent-ink',
        className,
      ].join(' ')}
    >
      <svg viewBox="0 0 32 32" className="size-[72%]" fill="none" aria-hidden>
        <path
          d="M6.5 7.5 16 25.5 25.5 7.5"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
