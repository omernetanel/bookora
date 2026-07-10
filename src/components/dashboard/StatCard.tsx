type StatCardProps = {
  label: string;
  value: string;
  delta?: string;
};

export function StatCard({ label, value, delta }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span
          dir="ltr"
          className="font-heading text-3xl font-bold text-foreground"
        >
          {value}
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
