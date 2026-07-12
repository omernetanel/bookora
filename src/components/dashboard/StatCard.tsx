import { AnimatedNumber } from "./AnimatedNumber";

type StatCardProps = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta?: string;
};

export function StatCard({ label, value, prefix, suffix, delta }: StatCardProps) {
  const isNegativeDelta = delta?.trim().startsWith("-") ?? false;

  return (
    <div className="rounded-xl border border-white/10 bg-card/60 p-6 shadow-card backdrop-blur-md">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span dir="ltr" className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
        </span>
        {delta ? (
          <span
            dir="ltr"
            className={`text-sm font-medium ${isNegativeDelta ? "text-destructive" : "text-success"}`}
          >
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
