import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("font-display text-xl font-semibold", className)} {...props} />;
}

export function CardDesc({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mt-2 text-sm leading-relaxed text-muted", className)} {...props} />;
}
