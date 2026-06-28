import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { AppsGrid } from "@/components/AppsGrid";
import { AppsDetail } from "@/components/AppsDetail";
import { Roadmap } from "@/components/Roadmap";
import { AppInfographics } from "@/components/AppInfographics";
import { ContactForm } from "@/components/ContactForm";
import { Fingerprint } from "@/components/brand/Fingerprint";
import { APPS } from "@/data/apps";
import { track } from "@/lib/analytics";
import { Toaster } from "@/components/ui/sonner";
import heroOrb from "@/assets/hero-orb.jpg";
import humanAi from "@/assets/human-ai.jpg";
import { Logo } from "@/components/brand/Logo";
import {
  Cpu, ShieldCheck, Layers, Zap, ChevronRight,
  HeartPulse, Sparkles, Brain, Network, Lock, Atom,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Human Studio Lab — The Future of Intelligent Applications" },
      { name: "description", content: "AI innovation house building 8 intelligent applications across healthcare, beauty, wellness and proof verification. One vision. Limitless impact." },
      { property: "og:title", content: "Human Studio Lab — The Future of Intelligent Applications" },
      { property: "og:description", content: "One vision. Eight intelligent solutions. Built for a smarter world." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen text-foreground antialiased">
      <SiteHeader />
      <Hero />
      <Marquee />
      <Ecosystem />
      <Applications />
      <AppInfographics />
      <Roadmap />
      <ArchitectureSection />
      <Vision />
      <Lab />
      <ContactForm />
      <Footer />
      <Toaster />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="absolute inset-0 grid-bg opacity-40 animate-grid-fade pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_center,oklch(0.5_0.22_270/0.4),transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            <span>Volume 01 · 2026 Edition</span>
          </div>

          <h1 className="mt-6 font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
            The Future of <br />
            <span className="text-gradient glow-text">Intelligent Applications</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            One vision. <span className="text-foreground font-semibold">Eight intelligent solutions.</span> Built for a smarter world.
            Human Studio Lab is the AI innovation and software development house crafting human-centric applications for healthcare, beauty, wellness and trust.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#applications" className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-mono font-medium uppercase tracking-widest text-primary-foreground shadow-[0_0_40px_oklch(0.68_0.22_255/0.5)] hover:shadow-[0_0_60px_oklch(0.72_0.2_305/0.6)] transition-all">
              Explore the 8 Applications
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#vision" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-6 py-3 text-sm font-mono uppercase tracking-widest hover:bg-card/80 transition-colors">
              Our Vision
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            <Stat n="8" label="Intelligent Apps" />
            <Stat n="1" label="Unified Ecosystem" />
            <Stat n="∞" label="Possibilities" />
          </div>
        </div>

        {/* Right: hero visual */}
        <div className="lg:col-span-5 relative z-10">
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-transparent to-accent/30 blur-3xl animate-pulse-ring" />
            <div className="absolute inset-4 rounded-full border border-primary/30 animate-spin-slow" />
            <div className="absolute inset-10 rounded-full border border-dashed border-accent/40 animate-spin-slow" style={{ animationDirection: "reverse" }} />
            <img
              src={heroOrb}
              alt="Human Studio Lab AI fingerprint orb"
              width={1280}
              height={1280}
              className="relative w-full h-full object-cover rounded-full p-4 mix-blend-screen"
            />

            {/* floating product chips */}
            {APPS.slice(0, 6).map((app, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const x = 50 + 50 * Math.cos(angle);
              const y = 50 + 50 * Math.sin(angle);
              const Icon = app.icon;
              return (
                <div
                  key={app.slug}
                  className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
                  style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }}
                >
                  <div className="flex items-center gap-2 panel px-2.5 py-1.5 shadow-[0_0_24px_oklch(0.68_0.22_255/0.4)]">
                    <Icon className="h-3.5 w-3.5 text-cyan" />
                    <span className="font-mono text-[10px] text-foreground">{app.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom feature strip */}
      <div className="relative mx-auto max-w-7xl px-5 mt-16">
        <div className="panel grid grid-cols-2 md:grid-cols-4 divide-x divide-border/40">
          {[
            { icon: Cpu, label: "AI-Powered Innovation" },
            { icon: Brain, label: "Human-Centric Design" },
            { icon: ShieldCheck, label: "Secure · Scalable · Trusted" },
            { icon: Zap, label: "Built for Real Impact" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3 px-4 py-4">
              <f.icon className="h-5 w-5 text-primary shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-wider">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="panel p-3 text-center">
      <div className="font-display text-3xl font-black text-gradient">{n}</div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const items = ["MEDNUX.AI", "DERMASCOPE.AI", "SKINTRIX360.AI", "JMALI.AI", "NIOMI", "UNIVERSALPROOF.COM", "ACNESKIN.AI", "ACNEFACE.AI", "+ FUTURE APPLICATIONS"];
  return (
    <section className="border-y border-border/40 bg-background/60 backdrop-blur overflow-hidden">
      <div className="flex gap-12 py-4 animate-[shimmer_30s_linear_infinite] whitespace-nowrap" style={{
        animation: "marquee 35s linear infinite",
      }}>
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            <span className="text-primary mr-3">◆</span>{t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </section>
  );
}

/* ---------- ECOSYSTEM ---------- */
function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          kicker="A Human Studio Lab Ecosystem"
          title="Eight AI Applications. One Intelligent Grid."
          subtitle="Powering tomorrow. Enhancing today. Intelligent solutions that work for people, everywhere."
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative panel p-8 aspect-square overflow-hidden">
              <img src={humanAi} alt="Human-centric AI" width={1024} height={1280} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan">Where Human-Centric</div>
                <div className="font-display text-2xl font-bold text-gradient">AI Comes to Life.</div>
              </div>
              <span className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground">NODE.00 / HUMAN.CORE</span>
              <span className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" /> ONLINE
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {[
              { icon: HeartPulse, title: "Healthcare Intelligence", desc: "Smarter operations, better outcomes — Mednux.ai." },
              { icon: ShieldCheck, title: "Proof Intelligence", desc: "Trusted documents, verified everywhere — UniversalProof.com." },
              { icon: Sparkles, title: "Skin Intelligence", desc: "360° insights for healthier skin — DermaScope.ai & Skintrix360.ai." },
              { icon: Atom, title: "Acne Intelligence", desc: "Targeted clarity. Confident you — AcneSkin.ai & AcneFace.ai." },
              { icon: Network, title: "Beauty & Media Intelligence", desc: "Inspire, engage, elevate beauty — Jmali.ai." },
              { icon: Brain, title: "Wellness Intelligence", desc: "Personalized guidance for better living — NIOMI." },
            ].map((it) => (
              <div key={it.title} className="group panel p-5 flex items-start gap-4 hover:border-primary/60 transition-all">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/30 group-hover:shadow-[0_0_24px_oklch(0.68_0.22_255/0.5)] transition-all">
                  <it.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display font-bold">{it.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{it.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- APPLICATIONS ---------- */
function Applications() {
  return (
    <section id="applications" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          kicker="// 08 Intelligent Applications"
          title="The Full Stack of Human-Centric AI."
          subtitle="Each application is a node in the Human Studio Lab grid — purpose-built, privacy-focused, and engineered for measurable impact."
        />
        <div className="mt-14">
          <AppsGrid />
        </div>
        <div className="mt-24">
          <AppsDetail />
        </div>
      </div>
    </section>
  );
}

/* ---------- ARCHITECTURE ---------- */
function ArchitectureSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          kicker="// Architecture"
          title="One Unified Intelligence Layer."
          subtitle="Every application shares the same neural backbone — designed for security, scale, and seamless cross-product intelligence."
        />

        <div className="mt-14 panel p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative grid md:grid-cols-3 gap-6">
            {[
              { layer: "L01", title: "Applications", desc: "8 intelligent products serving healthcare, beauty, wellness and proof.", icon: Layers },
              { layer: "L02", title: "Intelligence Core", desc: "Shared models for vision, language, prediction and decision support.", icon: Brain },
              { layer: "L03", title: "Secure Foundation", desc: "Privacy-first infrastructure, encryption-by-default, audit-ready.", icon: Lock },
            ].map((l) => (
              <div key={l.layer} className="relative panel p-6 group hover:border-primary/60 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-cyan">{l.layer}</span>
                  <l.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{l.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{l.desc}</p>
                <div className="mt-6 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: "92%" }} />
                </div>
              </div>
            ))}
          </div>

          {/* connection lines */}
          <svg className="hidden md:block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-px pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 1">
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="oklch(0.68 0.22 255 / 0.35)" strokeDasharray="2 2" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ---------- VISION ---------- */
function Vision() {
  return (
    <section id="vision" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="font-mono text-xs tracking-[0.25em] uppercase text-cyan">// Vision</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-black leading-tight">
            Where <span className="text-gradient">human-centric AI</span> comes to life.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Human Studio Lab is an AI innovation and software development house crafting intelligent, human-centric applications that solve real-world challenges and create limitless possibilities.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            We build for people — not for spectacle. Every product begins with a problem worth solving, an outcome worth measuring, and a person whose life can be made better.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { k: "AI-Powered", v: "Innovation" },
              { k: "Human-Centric", v: "Design" },
              { k: "Secure & Scalable", v: "By Default" },
              { k: "Built for", v: "Real Impact" },
            ].map((p) => (
              <div key={p.k} className="panel p-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.k}</div>
                <div className="font-display text-lg font-bold text-foreground">{p.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="panel p-8 relative overflow-hidden">
            <span className="absolute inset-0 scanline pointer-events-none opacity-50" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <Fingerprint className="h-14 w-14" />
                <span className="font-mono text-[10px] text-muted-foreground">CORE.MANIFESTO.v1</span>
              </div>
              <ol className="space-y-4 text-sm">
                {[
                  "Intelligence must serve people, not replace them.",
                  "Every product begins with a real outcome to improve.",
                  "Privacy and trust are not features — they are foundations.",
                  "Beautiful systems are easier to use, easier to trust.",
                  "Eight applications, one ecosystem, infinite compound value.",
                ].map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-xs text-primary shrink-0 mt-0.5">0{i + 1}</span>
                    <span className="text-foreground/90">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- LAB ---------- */
function Lab() {
  return (
    <section id="lab" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          kicker="// The Lab"
          title="An AI Innovation & Software Development House."
          subtitle="We design, build and operate intelligent applications end-to-end — research, product, engineering and trust under one roof."
        />

        <div className="mt-12 grid md:grid-cols-4 gap-5">
          {[
            { n: "01", t: "Research", d: "Applied AI research grounded in real workflows." },
            { n: "02", t: "Design", d: "Human-centric interaction design for trust and clarity." },
            { n: "03", t: "Engineering", d: "Scalable, secure software systems built for production." },
            { n: "04", t: "Operations", d: "Continuous learning, measurement and improvement." },
          ].map((s) => (
            <div key={s.n} className="panel p-6 group hover:border-primary/60 transition-all">
              <div className="font-mono text-xs text-primary">/{s.n}</div>
              <div className="mt-3 font-display text-xl font-bold">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              <div className="mt-4 h-px bg-gradient-to-r from-primary/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION HEADER ---------- */
function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="font-mono text-xs tracking-[0.25em] uppercase text-cyan">{kicker}</div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-black leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-border/40 mt-12">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-12 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 py-2">
            <Logo className="h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48 drop-shadow-[0_0_28px_oklch(0.68_0.22_255/0.5)]" />
          </div>
          <div className="mt-2 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">THE CREATOR OF INTELLIGENT APPLICATIONS</div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Building intelligent solutions for people, industries, and the future.
          </p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">Ecosystem</div>
          <ul className="space-y-2 text-sm">
            {APPS.slice(0, 4).map((a) => (
              <li key={a.slug}><a href={`#app-${a.slug}`} className="hover:text-primary transition-colors">{a.name}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">More</div>
          <ul className="space-y-2 text-sm">
            {APPS.slice(4).map((a) => (
              <li key={a.slug}><a href={`#app-${a.slug}`} className="hover:text-primary transition-colors">{a.name}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40 py-5">
        <div className="mx-auto max-w-7xl px-5 flex flex-col md:flex-row gap-3 items-center justify-between font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          <span>© 2026 Human Studio Lab · All systems operational</span>
          <span className="flex items-center gap-4">
            <span>humanstudiolab.com</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" /> NETWORK LIVE</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
