import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,box-shadow,background-color,color] duration-150 ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-paddy text-paper shadow-[var(--shadow-border)] hover:bg-paddy-soft active:scale-[0.98]",
        outline:
          "bg-transparent text-ink shadow-[var(--shadow-border)] hover:bg-paddy-mist hover:text-paddy",
        ghost: "text-ink hover:bg-paddy-mist hover:text-paddy",
        link: "text-paddy underline-offset-4 hover:underline px-0",
      },
      size: {
        default: "h-11 rounded-md px-4 text-sm",
        sm: "h-9 rounded-sm px-3 text-sm",
        lg: "h-12 rounded-md px-5 text-base",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
