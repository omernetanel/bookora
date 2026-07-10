import { AnimatedNumber } from "./AnimatedNumber";

type StatCardProps = {
  label: string;
  value: number;
  prefix?: string;
  delta?: string;
};

export function StatCard({ label, value, prefix, delta }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-card/60 p-6 shadow-card backdrop-blur-md">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span dir="ltr" className="font-heading text-3xl font-bold text-foreground">
          <AnimatedNumber value={value} prefix={prefix} />
        </span>
        {delta ? (
          <span dir="ltr" className="text-sm font-medium text-success">
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
