import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="border-b border-line bg-paper-deep/60">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <Badge>{kicker}</Badge>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lead}</p>
      </div>
    </header>
  );
}

export function Section({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      {kicker ? (
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-paddy">{kicker}</p>
      ) : null}
      <h2 className="mt-2 font-display text-3xl font-semibold">{title}</h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/90">{children}</div>
    </section>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-lg border-l-4 border-paddy bg-paddy-mist/60 px-5 py-4 text-sm leading-relaxed text-paddy">
      {children}
    </aside>
  );
}
