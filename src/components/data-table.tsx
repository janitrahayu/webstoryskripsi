import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Row = Record<string, ReactNode>;

export function DataTable({
  columns,
  rows,
  caption,
  highlightRow,
}: {
  columns: { key: string; label: string; numeric?: boolean; className?: string }[];
  rows: Row[];
  caption?: string;
  highlightRow?: (row: Row, i: number) => boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
      {caption ? (
        <p className="border-b border-line px-4 py-3 text-sm font-medium text-ink">{caption}</p>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-paper-deep/70 text-xs uppercase tracking-wide text-muted">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 font-medium",
                    c.numeric && "text-right",
                    c.className,
                  )}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  "border-t border-line",
                  highlightRow?.(row, i) ? "bg-paddy-mist/50 font-medium text-paddy" : "text-ink",
                )}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-4 py-2.5",
                      c.numeric && "text-right tabular-nums",
                      c.className,
                    )}
                  >
                    {row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
