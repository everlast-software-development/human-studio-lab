import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { APPS, type AppItem } from "@/data/apps";
import { SiteHeader } from "@/components/SiteHeader";
import { Fingerprint } from "@/components/brand/Fingerprint";
import { track } from "@/lib/analytics";
import { Toaster } from "@/components/ui/sonner";
import {
  ArrowLeft, ArrowUpRight, CheckCircle2, Activity, Gauge, ShieldCheck, Network, Cpu,
} from "lucide-react";
import ogMednux from "@/assets/og/mednux.jpg";
import ogDermascope from "@/assets/og/dermascope.jpg";
import ogSkintrix from "@/assets/og/skintrix360.jpg";
import ogJmali from "@/assets/og/jmali.jpg";
import ogNiomi from "@/assets/og/niomi.jpg";
import ogUniversal from "@/assets/og/universalproof.jpg";
import ogAcneskin from "@/assets/og/acneskin.jpg";
import ogAcneface from "@/assets/og/acneface.jpg";

const OG_IMAGES: Record<string, string> = {
  mednux: ogMednux,
  dermascope: ogDermascope,
  skintrix360: ogSkintrix,
  jmali: ogJmali,
  niomi: ogNiomi,
  universalproof: ogUniversal,
  acneskin: ogAcneskin,
  acneface: ogAcneface,
};

type SchemaMeta = {
  applicationCategory: string;
  applicationSubCategory: string;
  audience: string[];
  keywords: string[];
};

const SCHEMA_META: Record<string, SchemaMeta> = {
  mednux: {
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Healthcare Operations Intelligence",
    audience: ["Hospitals", "Clinics", "Healthcare Administrators", "Clinicians"],
    keywords: ["healthcare AI", "medical operations", "clinical workflow", "hospital intelligence", "decision support", "performance dashboards"],
  },
  dermascope: {
    applicationCategory: "HealthApplication",
    applicationSubCategory: "AI Dermatology",
    audience: ["Dermatologists", "Physicians", "Clinics", "Skin Specialists"],
    keywords: ["AI dermatology", "skin analysis", "lesion documentation", "teledermatology", "clinical decision support", "diagnostic imaging"],
  },
  skintrix360: {
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Aesthetic & Skin Intelligence",
    audience: ["Aesthetic Clinics", "Dermatologists", "Cosmetologists", "Patients"],
    keywords: ["360 skin analysis", "aesthetic planning", "treatment tracking", "skin intelligence", "beauty tech", "personalized skincare"],
  },
  jmali: {
    applicationCategory: "LifestyleApplication",
    applicationSubCategory: "Beauty, Wellness & Media Intelligence",
    audience: ["Beauty Brands", "Content Creators", "Wellness Professionals", "Marketers"],
    keywords: ["beauty AI", "wellness intelligence", "media strategy", "content planning", "brand engagement", "audience insights"],
  },
  niomi: {
    applicationCategory: "HealthApplication",
    applicationSubCategory: "AI Wellness Companion",
    audience: ["General Consumers", "Wellness Enthusiasts", "Health-Conscious Users"],
    keywords: ["AI wellness", "lifestyle tracking", "personalized reminders", "healthy habits", "wellness companion", "digital coach"],
  },
  universalproof: {
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Documentation & Verification Intelligence",
    audience: ["Enterprises", "Legal Teams", "Compliance Officers", "Auditors"],
    keywords: ["document verification", "digital proof", "audit-ready records", "compliance", "identity verification", "trust infrastructure"],
  },
  acneskin: {
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Acne Education & Skin Intelligence",
    audience: ["Consumers", "Teens", "Skincare Users", "Wellness Coaches"],
    keywords: ["acne education", "skin care AI", "acne tracking", "skin literacy", "personalized skincare", "consumer health"],
  },
  acneface: {
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Facial Acne Analysis",
    audience: ["Consumers", "Dermatology Patients", "Skincare Users"],
    keywords: ["facial acne analysis", "acne mapping", "skin progress tracking", "before and after skincare", "AI face scan", "acne care guidance"],
  },
};


export const Route = createFileRoute("/apps/$slug")({
  loader: ({ params }): { app: AppItem } => {
    const app = APPS.find((a) => a.slug === params.slug);
    if (!app) throw notFound();
    return { app };
  },
  head: ({ params, loaderData }) => {
    const app = loaderData?.app;
    if (!app) return { meta: [{ title: "Application — Human Studio Lab" }] };
    const title = `${app.name} — ${app.tagline} · Human Studio Lab`;
    const url = `/apps/${params.slug}`;
    const image = OG_IMAGES[app.slug];
    return {
      meta: [
        { title },
        { name: "description", content: app.description },
        { property: "og:title", content: title },
        { property: "og:description", content: app.description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        ...(image ? [
          { property: "og:image", content: image },
          { property: "og:image:width", content: "1216" },
          { property: "og:image:height", content: "640" },
          { property: "og:image:alt", content: `${app.name} — ${app.tagline}` },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: app.description },
          { name: "twitter:image", content: image },
        ] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify((() => {
            const meta = SCHEMA_META[app.slug];
            const keywords = [
              ...(meta?.keywords ?? []),
              app.category,
              ...app.functionalities.map((f) => f.title),
              ...app.benefits,
            ];
            return {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: app.name,
              alternateName: app.domain,
              applicationCategory: meta?.applicationCategory ?? "HealthApplication",
              applicationSubCategory: meta?.applicationSubCategory ?? app.category,
              operatingSystem: "Web, iOS, Android",
              browserRequirements: "Requires JavaScript. Modern browser (Chrome, Safari, Firefox, Edge).",
              url,
              description: app.description,
              abstract: app.tagline,
              slogan: app.quote,
              ...(image ? { image } : {}),
              keywords: Array.from(new Set(keywords)).join(", "),
              featureList: app.functionalities.map((f) => `${f.title}: ${f.desc}`),
              audience: (meta?.audience ?? ["Professionals", "General Consumers"]).map((a) => ({
                "@type": "Audience",
                audienceType: a,
              })),
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/OnlineOnly" },
              publisher: {
                "@type": "Organization",
                name: "Human Studio Lab",
                url: "/",
              },
            };
          })()),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="panel p-10 text-center max-w-md">
        <h1 className="font-display text-3xl font-black text-gradient">Unit Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground">No application matches that slug in the Human Studio Lab grid.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-mono uppercase tracking-widest text-primary-foreground hover:bg-primary/90">
          <ArrowLeft className="h-4 w-4" /> Return to base
        </Link>
      </div>
    </div>
  ),
  component: AppDetailPage,
});

function statsFor(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return {
    accuracy: 92 + (h % 7),
    latency: 40 + ((h >> 3) % 80),
    uptime: 9970 + ((h >> 5) % 29),
    nodes: 6 + ((h >> 7) % 18),
  };
}

function AppDetailPage() {
  const { app } = Route.useLoaderData() as { app: AppItem };
  const Icon = app.icon;
  const s = statsFor(app.slug);
  const index = APPS.findIndex((a) => a.slug === app.slug);
  const next = APPS[(index + 1) % APPS.length];
  const prev = APPS[(index - 1 + APPS.length) % APPS.length];

  useEffect(() => {
    track({ name: "app_detail_view", app: app.slug });
  }, [app.slug]);

  return (
    <div className="min-h-screen text-foreground antialiased">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_center,oklch(0.5_0.22_270/0.35),transparent_70%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5">
          <Link to="/" hash="applications" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> All applications
          </Link>

          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-primary">UNIT.{(index + 1).toString().padStart(2, "0")}</span>
                <span className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{app.category}</span>
              </div>
              <h1 className="font-display font-black text-4xl md:text-6xl leading-[1.05]">
                {app.name}
              </h1>
              <p className="mt-4 text-xl text-cyan font-medium">{app.tagline}</p>
              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl">{app.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`https://${app.domain}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-mono uppercase tracking-widest text-primary-foreground shadow-[0_0_40px_oklch(0.68_0.22_255/0.5)] hover:shadow-[0_0_60px_oklch(0.72_0.2_305/0.6)] transition-all">
                  Visit {app.domain} <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link to="/" hash="contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-5 py-3 text-sm font-mono uppercase tracking-widest hover:bg-card/80 transition-colors">
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Orb */}
            <div className="lg:col-span-5">
              <div className="relative panel p-6 aspect-square max-w-md mx-auto overflow-hidden">
                <span className="absolute inset-0 grid-bg opacity-40" />
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <span className="absolute inset-x-6 top-6 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>SYS://{app.slug}.core</span>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" /> LIVE</span>
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute h-64 w-64 rounded-full border border-primary/30 animate-spin-slow" />
                  <div className="absolute h-48 w-48 rounded-full border border-accent/40 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "20s" }} />
                  <div className="absolute h-72 w-72 rounded-full border border-dashed border-primary/20" />
                  <div className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl animate-pulse-ring" />
                  <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-2xl border border-primary/60 bg-background/80 shadow-[0_0_60px_oklch(0.68_0.22_255/0.5)]">
                    <Icon className="h-12 w-12 text-primary" strokeWidth={1.25} />
                  </div>
                </div>
                <div className="absolute bottom-4 inset-x-6 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>NEURAL_LINK · OK</span>
                  <span>{(s.uptime / 100).toFixed(2)}% INTEGRITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telemetry */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="font-mono text-xs tracking-[0.25em] uppercase text-cyan">// Telemetry</div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Gauge, label: "ACCURACY", value: `${s.accuracy}%`, pct: s.accuracy },
              { icon: Activity, label: "LATENCY", value: `${s.latency}ms`, pct: 100 - s.latency / 1.5 },
              { icon: ShieldCheck, label: "UPTIME", value: `${(s.uptime / 100).toFixed(2)}%`, pct: s.uptime / 100 },
              { icon: Network, label: "NODES", value: `${s.nodes}`, pct: (s.nodes / 24) * 100 },
            ].map((m) => (
              <div key={m.label} className="panel p-4">
                <div className="flex items-center gap-2"><m.icon className="h-4 w-4 text-cyan" /><span className="font-mono text-[10px] tracking-widest text-muted-foreground">{m.label}</span></div>
                <div className="mt-2 font-display text-2xl font-bold text-gradient">{m.value}</div>
                <div className="mt-2 h-1 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${Math.max(4, Math.min(100, m.pct))}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Functionalities */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="font-mono text-xs tracking-[0.25em] uppercase text-cyan">// Functionalities</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-black">What it does</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {app.functionalities.map((f, i) => (
              <div key={f.title} className="relative panel p-5 overflow-hidden">
                <span className="absolute top-2 right-3 font-mono text-[10px] text-muted-foreground">/{(i + 1).toString().padStart(2, "0")}</span>
                <Cpu className="h-5 w-5 text-primary" />
                <div className="mt-3 font-display text-base font-bold">{f.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="font-mono text-xs tracking-[0.25em] uppercase text-cyan">// Benefits</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-black">Why it matters</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {app.benefits.map((b) => (
              <div key={b} className="panel p-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">{b}</span>
              </div>
            ))}
          </div>

          <blockquote className="mt-10 panel p-8 border-l-2 border-accent">
            <div className="font-mono text-[10px] text-muted-foreground tracking-widest">CORE.MANIFESTO</div>
            <p className="mt-3 font-display text-xl md:text-2xl italic text-foreground/90">"{app.quote}"</p>
            <div className="mt-4 flex items-center gap-3">
              <Fingerprint className="h-6 w-6" />
              <span className="font-mono text-xs text-muted-foreground">{app.domain} · A Human Studio Lab product</span>
            </div>
          </blockquote>
        </div>
      </section>

      {/* Next / Prev */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-5 grid sm:grid-cols-2 gap-4">
          <Link to="/apps/$slug" params={{ slug: prev.slug }} className="panel p-5 group hover:border-primary/60 transition-all">
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground">◂ PREV.UNIT</div>
            <div className="mt-2 font-display text-lg font-bold group-hover:text-gradient">{prev.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{prev.tagline}</div>
          </Link>
          <Link to="/apps/$slug" params={{ slug: next.slug }} className="panel p-5 group hover:border-primary/60 transition-all text-right">
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground">NEXT.UNIT ▸</div>
            <div className="mt-2 font-display text-lg font-bold group-hover:text-gradient">{next.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{next.tagline}</div>
          </Link>
        </div>
      </section>

      <Toaster />
    </div>
  );
}
