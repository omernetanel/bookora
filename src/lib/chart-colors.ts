/**
 * Recharts needs literal color strings for its `fill`/`stroke` props — CSS
 * classes can't be applied to individual data marks. These reference the
 * chart-* tokens in `src/app/theme.css` (the single source of truth) via
 * `var()`, so no hex value is duplicated here.
 */
export const chartColor = {
  chart1: "var(--color-chart-1)",
  chart2: "var(--color-chart-2)",
  chart3: "var(--color-chart-3)",
  chart4: "var(--color-chart-4)",
  chart5: "var(--color-chart-5)",
} as const;

export type ChartColorKey = keyof typeof chartColor;

/** Sequential heatmap ramp — Tailwind classes generated from the
 * chart-heat-* tokens (complete literal strings, required for the JIT scanner). */
export const heatmapClasses = [
  "bg-chart-heat-1",
  "bg-chart-heat-2",
  "bg-chart-heat-3",
  "bg-chart-heat-4",
  "bg-chart-heat-5",
] as const;
