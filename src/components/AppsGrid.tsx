import { APPS } from "@/data/apps";
import { ArrowUpRight } from "lucide-react";

export function AppsGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {APPS.map((app, i) => {
        const Icon = app.icon;
        return (
          <a
            key={app.slug}
            href={`#app-${app.slug}`}
            className="group relative panel p-5 overflow-hidden hover:border-primary/60 transition-all duration-500 hover:-translate-y-1"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* corner brackets */}
            <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/70" />
            <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary/70" />
            <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-primary/70" />
            <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary/70" />

            {/* scanline overlay */}
            <span className="absolute inset-0 scanline opacity-30 pointer-events-none" />
            <span className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 border border-primary/30 group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_oklch(0.68_0.22_255/0.5)] transition-all">
                  <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
              </div>
              <div className="mt-4 font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">{app.category}</div>
              <h3 className="mt-1 font-display text-lg font-bold">{app.name}</h3>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{app.tagline}</p>

              <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                <span className="font-mono text-[10px] text-muted-foreground">{app.domain}</span>
                <span className="font-mono text-[10px] text-primary">0{(APPS.indexOf(app) + 1).toString().padStart(2, "0")}</span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
