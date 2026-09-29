import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "paddy",
  ...props
}: React.ComponentProps<"span"> & { tone?: "paddy" | "muted" | "ink" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
        tone === "paddy" && "bg-paddy-mist text-paddy",
        tone === "muted" && "bg-paper-deep text-muted",
        tone === "ink" && "bg-ink text-paper",
        className,
      )}
      {...props}
    />
  );
}
