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
      <svg viewBox="0 0 32 32" className="size-[68%]" fill="none" aria-hidden>
        <path
          d="M7 24V9.5C7 8.12 8.12 7 9.5 7H23"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path d="M8 16h10" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        <path
          d="M18.5 5.5c0 3.3-1.8 5.5-5.5 5.5 0-3.4 1.9-5.5 5.5-5.5Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
