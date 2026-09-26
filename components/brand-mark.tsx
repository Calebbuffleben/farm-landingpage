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
        'relative grid shrink-0 place-items-center',
        inverted ? 'text-white' : 'text-accent',
        className,
      ].join(' ')}
    >
      <svg viewBox="0 0 32 32" className="size-full" aria-hidden>
        <path
          fill="currentColor"
          d="M4.8 3.8h5L16 17.6 22.2 3.8H27.2L16 28.6 4.8 3.8z"
        />
      </svg>
    </span>
  );
}
