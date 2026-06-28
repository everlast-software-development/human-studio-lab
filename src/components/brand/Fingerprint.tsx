export function Fingerprint({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fp-grad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="oklch(0.85 0.16 220)" />
          <stop offset="50%" stopColor="oklch(0.68 0.22 255)" />
          <stop offset="100%" stopColor="oklch(0.72 0.2 305)" />
        </linearGradient>
      </defs>
      <g stroke="url(#fp-grad)" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M32 8c-10 0-18 8-18 18v8" />
        <path d="M32 14c-7 0-13 6-13 13v9" opacity="0.85" />
        <path d="M32 20c-5 0-8 4-8 8v12" opacity="0.85" />
        <path d="M32 26c-2 0-3 1-3 3v18" opacity="0.85" />
        <path d="M32 8c10 0 18 8 18 18v6c0 4-1 6-2 9" />
        <path d="M32 14c7 0 13 6 13 13v5c0 4-1 7-3 11" opacity="0.85" />
        <path d="M32 20c5 0 8 4 8 8v6c0 3-1 6-3 10" opacity="0.85" />
        <path d="M32 26c2 0 3 1 3 3v8c0 4-1 8-3 12" opacity="0.85" />
        <circle cx="14" cy="34" r="1.2" fill="url(#fp-grad)" />
        <circle cx="50" cy="34" r="1.2" fill="url(#fp-grad)" />
        <circle cx="19" cy="40" r="1" fill="url(#fp-grad)" />
        <circle cx="45" cy="40" r="1" fill="url(#fp-grad)" />
      </g>
      <text x="32" y="38" textAnchor="middle" fontFamily="Orbitron" fontWeight="900" fontSize="11" fill="url(#fp-grad)">AI</text>
    </svg>
  );
}
