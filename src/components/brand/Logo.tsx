import { Fingerprint } from "./Fingerprint";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Fingerprint className="h-full w-auto shrink-0" />
      <span
        className="font-mono font-bold tracking-tight leading-none select-none"
        style={{
          background: "linear-gradient(135deg, oklch(0.85 0.16 220), oklch(0.68 0.22 255), oklch(0.72 0.2 305))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        <span className="block text-[0.6em] uppercase tracking-[0.25em] opacity-70">Human</span>
        <span className="block text-[1em] uppercase tracking-[0.15em]">Studio Lab</span>
      </span>
    </div>
  );
}
