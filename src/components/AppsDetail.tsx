import { APPS } from "@/data/apps";
import { CheckCircle2 } from "lucide-react";

export function AppsDetail() {
  return (
    <div className="space-y-24">
      {APPS.map((app, i) => {
        const Icon = app.icon;
        const reverse = i % 2 === 1;
        return (
          <article
            key={app.slug}
            id={`app-${app.slug}`}
            className="scroll-mt-24 grid lg:grid-cols-2 gap-10 items-center"
          >
            <div className={reverse ? "lg:order-2" : ""}>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-primary">/{(i + 1).toString().padStart(2, "0")}</span>
                <span className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{app.category}</span>
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-bold">{app.name}</h3>
              <p className="mt-2 text-lg text-cyan font-medium">{app.tagline}</p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">{app.description}</p>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {app.functionalities.map((f) => (
                  <div key={f.title} className="panel p-4">
                    <div className="font-display text-sm font-bold text-foreground">{f.title}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {app.benefits.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs font-medium">
                    <CheckCircle2 className="h-3 w-3 text-cyan" /> {b}
                  </span>
                ))}
              </div>

              <blockquote className="mt-6 border-l-2 border-accent pl-4 italic text-sm text-muted-foreground">
                "{app.quote}"
              </blockquote>

              <div className="mt-6 font-mono text-xs text-muted-foreground">
                <span className="text-primary">▸</span> {app.domain}  ·  A Human Studio Lab product
              </div>
            </div>

            {/* Visualization panel */}
            <div className={reverse ? "lg:order-1" : ""}>
              <div className="relative panel p-6 aspect-square max-w-lg mx-auto overflow-hidden">
                <span className="absolute inset-0 grid-bg opacity-40" />
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <span className="absolute inset-x-6 top-6 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>SYS://{app.slug}.core</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                    LIVE
                  </span>
                </span>

                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Orbital rings */}
                  <div className="absolute h-64 w-64 rounded-full border border-primary/30 animate-spin-slow" />
                  <div className="absolute h-48 w-48 rounded-full border border-accent/40 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "20s" }} />
                  <div className="absolute h-72 w-72 rounded-full border border-dashed border-primary/20" />
                  <div className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl animate-pulse-ring" />

                  {/* central icon */}
                  <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-2xl border border-primary/60 bg-background/80 shadow-[0_0_60px_oklch(0.68_0.22_255/0.5)]">
                    <Icon className="h-12 w-12 text-primary" strokeWidth={1.25} />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-cyan animate-pulse" />
                  </div>

                  {/* radial nodes */}
                  {[0, 72, 144, 216, 288].map((deg, idx) => (
                    <span
                      key={deg}
                      className="absolute h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_oklch(0.85_0.16_220)]"
                      style={{
                        transform: `rotate(${deg}deg) translateY(-128px)`,
                        animationDelay: `${idx * 0.3}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="absolute bottom-4 inset-x-6 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>NEURAL_LINK · OK</span>
                  <span>{Math.floor(85 + Math.random() * 14)}.{Math.floor(Math.random() * 9)}% INTEGRITY</span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
