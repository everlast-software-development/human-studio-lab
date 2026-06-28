import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { APPS } from "@/data/apps";
import { track } from "@/lib/analytics";
import { Activity, Cpu, Gauge, Network, ShieldCheck } from "lucide-react";

type Stats = { accuracy: number; latency: number; uptime: number; nodes: number };

// Deterministic stat generator so SSR/client match.
function statsFor(slug: string): Stats {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return {
    accuracy: 92 + (h % 7),                 // 92-98%
    latency: 40 + ((h >> 3) % 80),          // 40-120ms
    uptime: 9970 + ((h >> 5) % 29),         // 99.70-99.99 (x100)
    nodes: 6 + ((h >> 7) % 18),             // 6-23
  };
}

export function AppInfographics() {
  return (
    <section id="infographics" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <div className="font-mono text-xs tracking-[0.25em] uppercase text-cyan">// Telemetry</div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-black leading-tight">
            Live <span className="text-gradient">App Telemetry</span> & Feature Diagrams
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Each application is instrumented like a spacecraft — measured, monitored, and engineered for trust.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {APPS.map((app, idx) => (
            <InfographicCard key={app.slug} app={app} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InfographicCard({ app, index }: { app: (typeof APPS)[number]; index: number }) {
  const s = statsFor(app.slug);
  const Icon = app.icon;
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered) return;
    const t = setTimeout(() => track({ name: "app_detail_view", app: app.slug }), 400);
    return () => clearTimeout(t);
  }, [hovered, app.slug]);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      className="relative panel p-6 overflow-hidden group hover:border-primary/60 transition-all"
    >
      <span className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <span className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <header className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/40 bg-primary/10">
            <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.25em] text-cyan uppercase">UNIT.{(index + 1).toString().padStart(2, "0")}</div>
            <div className="font-display text-lg font-bold">{app.name}</div>
          </div>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" /> TELEMETRY
        </span>
      </header>

      {/* Stats row */}
      <div className="relative mt-6 grid grid-cols-4 gap-2">
        <Metric icon={Gauge} label="ACCURACY" value={`${s.accuracy}%`} pct={s.accuracy} />
        <Metric icon={Activity} label="LATENCY" value={`${s.latency}ms`} pct={100 - (s.latency / 1.5)} />
        <Metric icon={ShieldCheck} label="UPTIME" value={`${(s.uptime / 100).toFixed(2)}%`} pct={s.uptime / 100} />
        <Metric icon={Network} label="NODES" value={`${s.nodes}`} pct={(s.nodes / 24) * 100} />
      </div>

      {/* Feature diagram */}
      <div className="relative mt-6 panel p-4 bg-background/40">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground mb-3">
          <span>FEATURE.GRAPH</span>
          <span className="flex items-center gap-1.5"><Cpu className="h-3 w-3 text-primary" /> v1.{index}.0</span>
        </div>
        <div className="relative h-32">
          <svg viewBox="0 0 320 120" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id={`g-${app.slug}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="oklch(0.68 0.22 255)" />
                <stop offset="100%" stopColor="oklch(0.72 0.2 305)" />
              </linearGradient>
            </defs>
            {/* central core */}
            <circle cx="160" cy="60" r="18" fill="url(#g-${app.slug})" opacity="0.25" />
            <circle cx="160" cy="60" r="10" fill="oklch(0.68 0.22 255)" />
            {app.functionalities.map((f, i) => {
              const angle = (i / app.functionalities.length) * Math.PI * 2 - Math.PI / 2;
              const x = 160 + 110 * Math.cos(angle);
              const y = 60 + 45 * Math.sin(angle);
              return (
                <g key={f.title}>
                  <line x1="160" y1="60" x2={x} y2={y} stroke="oklch(0.68 0.22 255 / 0.4)" strokeDasharray="2 3" />
                  <circle cx={x} cy={y} r="5" fill="oklch(0.85 0.16 220)" />
                  <text
                    x={x}
                    y={y + (y > 60 ? 16 : -10)}
                    textAnchor="middle"
                    className="fill-muted-foreground"
                    style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9 }}
                  >
                    {f.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>{app.domain}</span>
        <Link
          to="/apps/$slug"
          params={{ slug: app.slug }}
          onClick={() => track({ name: "app_detail_view", app: app.slug })}
          className="text-primary hover:text-accent transition-colors"
        >
          ▸ INSPECT
        </Link>
      </div>
    </article>
  );
}

function Metric({
  icon: Icon, label, value, pct,
}: { icon: typeof Gauge; label: string; value: string; pct: number }) {
  const clamped = Math.max(4, Math.min(100, pct));
  return (
    <div className="relative panel p-2.5 bg-background/40">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 text-cyan" />
        <span className="font-mono text-[9px] tracking-widest text-muted-foreground">{label}</span>
      </div>
      <div className="mt-1 font-display text-base font-bold text-gradient">{value}</div>
      <div className="mt-1.5 h-1 rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
