import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { track } from "@/lib/analytics";
import { APPS } from "@/data/apps";
import {
  Rocket, FlaskConical, Cpu, Satellite, Globe2, Sparkles,
  type LucideIcon,
} from "lucide-react";

type Milestone = {
  id: string;
  quarter: string;
  year: string;
  title: string;
  status: "shipped" | "active" | "next" | "future";
  icon: LucideIcon;
  summary: string;
  details: string[];
  apps?: string[];
};

const MILESTONES: Milestone[] = [
  {
    id: "m-genesis",
    quarter: "Q1", year: "2025",
    title: "Genesis Protocol",
    status: "shipped",
    icon: FlaskConical,
    summary: "Foundational research, neural backbone & studio formation.",
    details: [
      "Established Human Studio Lab thesis & ecosystem map",
      "Built shared intelligence core (vision · language · prediction)",
      "Privacy-first infra & audit-ready foundation laid",
    ],
  },
  {
    id: "m-skin",
    quarter: "Q3", year: "2025",
    title: "Skin Intelligence Wave",
    status: "shipped",
    icon: Sparkles,
    summary: "DermaScope.ai & Skintrix360.ai go online.",
    details: [
      "DermaScope: clinical-grade lesion documentation",
      "Skintrix360: 360° aesthetic mapping & follow-up",
      "Cross-product image pipeline activated",
    ],
    apps: ["dermascope", "skintrix360"],
  },
  {
    id: "m-mednux",
    quarter: "Q1", year: "2026",
    title: "Mednux Healthcare Grid",
    status: "active",
    icon: Cpu,
    summary: "Operational intelligence for hospitals & clinics.",
    details: [
      "Workflow coordination & live operational dashboards",
      "Decision support for clinical & business operations",
      "Pilot deployments with healthcare partners",
    ],
    apps: ["mednux"],
  },
  {
    id: "m-trust",
    quarter: "Q2", year: "2026",
    title: "UniversalProof Trust Layer",
    status: "active",
    icon: Satellite,
    summary: "Documentation, verification & proof intelligence.",
    details: [
      "Audit-ready record structuring",
      "Verification & evidence organization workflows",
      "Compliance-grade trust primitives",
    ],
    apps: ["universalproof"],
  },
  {
    id: "m-wellness",
    quarter: "Q3", year: "2026",
    title: "Wellness · Beauty · Acne Suite",
    status: "next",
    icon: Rocket,
    summary: "NIOMI, Jmali, AcneSkin & AcneFace into orbit.",
    details: [
      "NIOMI intelligent wellness companion launch",
      "Jmali beauty & media intelligence platform",
      "AcneSkin + AcneFace acne intelligence stack",
    ],
    apps: ["niomi", "jmali", "acneskin", "acneface"],
  },
  {
    id: "m-grid",
    quarter: "Q1", year: "2027",
    title: "Unified Intelligence Grid",
    status: "future",
    icon: Globe2,
    summary: "Cross-product intelligence & partner network expansion.",
    details: [
      "Shared insight layer across all 8 applications",
      "Open partner API for healthcare & beauty integrators",
      "Global ecosystem rollout",
    ],
    apps: APPS.map((a) => a.slug),
  },
];

const STATUS_META: Record<Milestone["status"], { label: string; dot: string; ring: string }> = {
  shipped: { label: "SHIPPED", dot: "bg-cyan", ring: "border-cyan/60" },
  active:  { label: "ACTIVE",  dot: "bg-primary animate-pulse", ring: "border-primary/70" },
  next:    { label: "NEXT",    dot: "bg-accent", ring: "border-accent/60" },
  future:  { label: "FUTURE",  dot: "bg-muted-foreground/60", ring: "border-border" },
};

export function Roadmap() {
  const [active, setActive] = useState<string>(MILESTONES[2].id);
  const current = MILESTONES.find((m) => m.id === active) ?? MILESTONES[0];

  const handleSelect = (m: Milestone) => {
    setActive(m.id);
    track({ name: "roadmap_milestone_view", milestone: m.id });
  };

  return (
    <section id="roadmap" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <div className="font-mono text-xs tracking-[0.25em] uppercase text-cyan">// Roadmap</div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-black leading-tight">
            Mission Timeline — <span className="text-gradient">2025 → 2027</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            A live trajectory of the Human Studio Lab ecosystem. Hover or tap any milestone to inspect its payload.
          </p>
        </div>

        {/* Track */}
        <div className="mt-14 panel p-6 md:p-10 relative overflow-hidden">
          <span className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <div className="relative">
            {/* base line */}
            <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="absolute left-0 right-0 top-7 h-px bg-primary/40 blur-[2px]" />

            <ol className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4">
              {MILESTONES.map((m, i) => {
                const meta = STATUS_META[m.status];
                const isActive = m.id === active;
                const Icon = m.icon;
                return (
                  <li key={m.id} className="relative flex flex-col items-center">
                    <button
                      type="button"
                      onMouseEnter={() => handleSelect(m)}
                      onFocus={() => handleSelect(m)}
                      onClick={() => handleSelect(m)}
                      aria-pressed={isActive}
                      className={`group relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border bg-background/90 backdrop-blur transition-all ${meta.ring} ${
                        isActive
                          ? "scale-110 shadow-[0_0_30px_oklch(0.68_0.22_255/0.6)]"
                          : "hover:scale-105 hover:shadow-[0_0_20px_oklch(0.68_0.22_255/0.4)]"
                      }`}
                    >
                      <span className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                      <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                      <span className="absolute -bottom-1 -left-1 font-mono text-[9px] text-muted-foreground">
                        /{(i + 1).toString().padStart(2, "0")}
                      </span>
                    </button>
                    <div className="mt-3 text-center">
                      <div className="font-mono text-[10px] tracking-widest text-cyan">{m.quarter} · {m.year}</div>
                      <div className="font-display text-xs font-bold mt-0.5 leading-tight">{m.title}</div>
                      <div className="font-mono text-[9px] tracking-widest text-muted-foreground mt-1">{meta.label}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Detail panel */}
          <div className="mt-12 grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 panel p-5 relative overflow-hidden">
              <span className="absolute inset-0 scanline opacity-30 pointer-events-none" />
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground">SELECTED.NODE</div>
              <div className="mt-1 font-display text-2xl font-black">{current.title}</div>
              <div className="mt-1 font-mono text-xs text-cyan">{current.quarter} {current.year} · {STATUS_META[current.status].label}</div>
              <p className="mt-3 text-sm text-muted-foreground">{current.summary}</p>
            </div>
            <div className="lg:col-span-3 panel p-5">
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground">PAYLOAD.DETAILS</div>
              <ul className="mt-3 space-y-2">
                {current.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="font-mono text-[10px] text-primary mt-1">▸ 0{i + 1}</span>
                    <span className="text-foreground/90">{d}</span>
                  </li>
                ))}
              </ul>

              {current.apps && current.apps.length > 0 && (
                <div className="mt-5 pt-4 border-t border-border/40">
                  <div className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">LINKED.UNITS</div>
                  <div className="flex flex-wrap gap-2">
                    {current.apps.map((slug) => {
                      const a = APPS.find((x) => x.slug === slug);
                      if (!a) return null;
                      const Icon = a.icon;
                      return (
                        <Link
                          key={slug}
                          to="/apps/$slug"
                          params={{ slug }}
                          onClick={() => track({ name: "app_detail_view", app: slug })}
                          className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-2.5 py-1 text-xs font-mono hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_18px_oklch(0.68_0.22_255/0.45)] transition-all"
                        >
                          <Icon className="h-3.5 w-3.5 text-cyan" />
                          <span>{a.name}</span>
                          <span className="text-primary">▸</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
