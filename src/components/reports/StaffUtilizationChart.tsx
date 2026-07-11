"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import { chartColor } from "@/lib/chart-colors";
import { staffUtilization } from "@/lib/mock-reports";

function UtilizationTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  if (!entry) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-card">
      <p className="text-xs text-muted-foreground">{entry.payload.role}</p>
      <p dir="ltr" className="text-sm font-semibold text-foreground">
        {entry.value}%
      </p>
    </div>
  );
}

export function StaffUtilizationChart() {
  return (
    <div dir="ltr" className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={staffUtilization} barCategoryGap="35%">
          <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={40}
            tickFormatter={(value: number) => `${value}%`}
          />
          <Tooltip cursor={{ fill: "var(--color-border)", opacity: 0.3 }} content={UtilizationTooltip} />
          <Bar dataKey="utilization" fill={chartColor.chart2} radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
