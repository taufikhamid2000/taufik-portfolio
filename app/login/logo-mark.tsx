export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="15" fill="#4338ca" />
      <path
        d="M9 10.5 16 7l7 3.5v7L16 21l-7-3.5v-7Zm7 3.4-4.3 2.1 4.3 2.1 4.3-2.1L16 13.9Z"
        fill="#f1f5f9"
      />
    </svg>
  );
}
