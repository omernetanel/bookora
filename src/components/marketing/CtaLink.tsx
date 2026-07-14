import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type CtaLinkProps = {
  children: ReactNode;
};

export function CtaLink({ children }: CtaLinkProps) {
  return (
    <Link
      href="/demo"
      className="relative flex items-center overflow-hidden rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-[filter] hover:brightness-110"
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-white/0 to-black/10" />
      <span className="relative flex items-center gap-2">
        {children}
        <ArrowLeft className="h-4 w-4" />
      </span>
    </Link>
  );
}
