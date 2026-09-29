import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/pendahuluan", label: "Pendahuluan" },
  { to: "/landasan-teori", label: "Tinjauan Pustaka" },
  { to: "/metode", label: "Metode" },
  { to: "/hasil", label: "Hasil" },
  { to: "/kesimpulan", label: "Kesimpulan" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#isi"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paddy focus:px-3 focus:py-2 focus:text-paper"
      >
        Loncat ke isi
      </a>
      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src="/logo-stis.png" alt="Logo" className="h-10 w-auto" />       
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold tracking-tight"><em>Web Story</em> Skripsi</span>
              <span className="hidden text-xs text-muted sm:block">Politeknik Statistika STIS</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Utama">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-sm px-3 py-2 text-sm transition-colors duration-150",
                    active ? "bg-paddy-mist font-medium text-paddy" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a
                href="https://drive.google.com/uc?export=download&id=1lfkOYDUg3ZTbGriVpdd89jFXKndsDQQN"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download />
                Unduh Buku Skripsi
              </a>
            </Button>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-md text-ink lg:hidden"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-line bg-paper px-4 py-3 lg:hidden" aria-label="Seluler">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-base",
                      active ? "bg-paddy-mist font-medium text-paddy" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="https://drive.google.com/uc?export=download&id=1lfkOYDUg3ZTbGriVpdd89jFXKndsDQQN"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-paper underline-offset-4 hover:underline"
              >
                <Download className="size-4" />
                Unduh Buku Skripsi
              </a>
            </div>
          </nav>
        ) : null}
      </header>

      <main id="isi" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-line bg-paper-deep/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            Politeknik Statistika STIS · Tahun Ajaran 2025/2026 · Janitra Hayu Pramestya · 222212678
          </p>
        </div>
      </footer>
    </div>
  );
}
