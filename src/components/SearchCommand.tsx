import { useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import { Search, ArrowRight, Hash, AppWindow, Compass } from "lucide-react";
import { APPS } from "@/data/apps";
import { track } from "@/lib/analytics";

type Entry = {
  id: string;
  kind: "app" | "section" | "page";
  label: string;
  hint: string;
  href: string;
  keywords?: string;
};

const SECTIONS: Entry[] = [
  { id: "s-eco", kind: "section", label: "Ecosystem", hint: "8 apps · 1 grid", href: "#ecosystem" },
  { id: "s-apps", kind: "section", label: "Applications", hint: "Full stack of intelligent apps", href: "#applications" },
  { id: "s-info", kind: "section", label: "Telemetry & Infographics", hint: "Live app metrics", href: "#infographics" },
  { id: "s-road", kind: "section", label: "Roadmap", hint: "2025 → 2027 mission timeline", href: "#roadmap" },
  { id: "s-vision", kind: "section", label: "Vision", hint: "Manifesto", href: "#vision" },
  { id: "s-lab", kind: "section", label: "The Lab", hint: "Research · Design · Engineering", href: "#lab" },
  { id: "s-contact", kind: "section", label: "Contact", hint: "Book a consultation", href: "#contact" },
];

const PAGES: Entry[] = [
  { id: "p-home", kind: "page", label: "Home", hint: "Human Studio Lab", href: "/" },
];

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const entries: Entry[] = useMemo(() => [
    ...APPS.map<Entry>((a) => ({
      id: `a-${a.slug}`,
      kind: "app",
      label: a.name,
      hint: a.tagline,
      href: `#app-${a.slug}`,
      keywords: `${a.category} ${a.domain} ${a.functionalities.map((f) => f.title).join(" ")}`,
    })),
    ...SECTIONS,
    ...PAGES,
  ], []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) track({ name: "search_open" });
          return !v;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (query.trim().length === 0) return;
      const q = query.toLowerCase();
      const count = entries.filter((e) =>
        `${e.label} ${e.hint} ${e.keywords ?? ""}`.toLowerCase().includes(q)
      ).length;
      track({ name: "search_query", query, results: count });
    }, 400);
    return () => clearTimeout(t);
  }, [query, open, entries]);

  const select = (e: Entry) => {
    track({ name: "search_select", target: e.id });
    setOpen(false);
    if (e.href.startsWith("#")) {
      const id = e.href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = e.href;
    } else {
      window.location.href = e.href;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); track({ name: "search_open" }); }}
        className="group inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:border-primary/60 hover:text-foreground transition-all"
        aria-label="Open search"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search</span>
        <span className="hidden md:inline-flex items-center gap-1 rounded border border-border/70 px-1.5 py-0.5 text-[9px] text-muted-foreground/80">⌘K</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />
          <div className="relative w-full max-w-xl panel overflow-hidden shadow-[0_0_80px_oklch(0.68_0.22_255/0.4)] border-primary/40">
            <span className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
            <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Command label="Search Human Studio Lab" shouldFilter className="relative">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40">
                <Search className="h-4 w-4 text-primary" />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search apps, sections, pages…"
                  className="flex-1 bg-transparent outline-none font-mono text-sm placeholder:text-muted-foreground"
                  autoFocus
                />
                <span className="font-mono text-[10px] text-muted-foreground">ESC</span>
              </div>

              <Command.List className="max-h-[360px] overflow-y-auto py-2">
                <Command.Empty className="px-4 py-8 text-center font-mono text-xs text-muted-foreground">
                  ▸ No matches in the grid.
                </Command.Empty>

                <Command.Group heading="Applications" className="px-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-cyan">
                  {entries.filter((e) => e.kind === "app").map((e) => (
                    <Row key={e.id} entry={e} onSelect={select} icon={<AppWindow className="h-4 w-4 text-primary" />} />
                  ))}
                </Command.Group>

                <Command.Group heading="Sections" className="px-2 mt-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-cyan">
                  {entries.filter((e) => e.kind === "section").map((e) => (
                    <Row key={e.id} entry={e} onSelect={select} icon={<Hash className="h-4 w-4 text-cyan" />} />
                  ))}
                </Command.Group>

                <Command.Group heading="Pages" className="px-2 mt-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-cyan">
                  {entries.filter((e) => e.kind === "page").map((e) => (
                    <Row key={e.id} entry={e} onSelect={select} icon={<Compass className="h-4 w-4 text-accent" />} />
                  ))}
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between border-t border-border/40 px-4 py-2 font-mono text-[10px] text-muted-foreground">
                <span>HSL://search.grid</span>
                <span>↑↓ navigate · ↵ open</span>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}

function Row({
  entry, onSelect, icon,
}: { entry: Entry; onSelect: (e: Entry) => void; icon: React.ReactNode }) {
  return (
    <Command.Item
      value={`${entry.label} ${entry.hint} ${entry.keywords ?? ""}`}
      onSelect={() => onSelect(entry)}
      className="group flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-primary/15 aria-selected:border aria-selected:border-primary/40"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/50">{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="block font-display text-sm font-bold truncate">{entry.label}</span>
        <span className="block font-mono text-[10px] text-muted-foreground truncate">{entry.hint}</span>
      </span>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-aria-selected:text-primary" />
    </Command.Item>
  );
}
