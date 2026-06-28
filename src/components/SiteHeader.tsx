import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SearchCommand } from "@/components/SearchCommand";

const NAV = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Applications", href: "#applications" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Vision", href: "#vision" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
        <Link to="/" className="flex items-center gap-3 sm:gap-4 group" aria-label="Human Studio Lab — Home">
          <Logo className="h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32 drop-shadow-[0_0_24px_oklch(0.68_0.22_255/0.55)] group-hover:drop-shadow-[0_0_36px_oklch(0.72_0.2_305/0.65)] transition-all" />
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <SearchCommand />
          <a href="#contact" className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-mono font-medium uppercase tracking-widest text-foreground hover:bg-primary/20 hover:shadow-[0_0_24px_oklch(0.68_0.22_255/0.5)] transition-all">
            Initiate
          </a>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <SearchCommand />
          <button className="text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/40 panel rounded-none px-5 py-4 space-y-3">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">{n.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}
