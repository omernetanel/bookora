import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "relative overflow-hidden bg-primary text-primary-foreground shadow-md hover:brightness-110",
  secondary:
    "border border-border bg-card text-foreground hover:bg-border/40",
  ghost: "text-muted-foreground hover:bg-border/40 hover:text-foreground",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {variant === "primary" ? (
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-white/0 to-black/10" />
      ) : null}
      <span className="relative flex items-center gap-1.5">{children}</span>
    </button>
  );
}
