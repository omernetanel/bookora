import { CheckCircle2 } from "lucide-react";

export function StatusLegend() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-2">
        <span className="h-3 w-6 rounded-md bg-foreground/40" />
        מאושר — כרגיל
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-6 rounded-md border-2 border-dashed border-foreground/50" />
        ממתין — מסגרת מקווקוות
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-6 rounded-md bg-foreground/40 opacity-40 grayscale" />
        בוטל — דהוי + קו על השם
      </span>
      <span className="flex items-center gap-2">
        <span className="relative h-3 w-6 rounded-md bg-foreground/40">
          <CheckCircle2 className="absolute -end-1.5 -top-1.5 h-3 w-3 text-foreground" />
        </span>
        הושלם — סימון ✓
      </span>
    </div>
  );
}
