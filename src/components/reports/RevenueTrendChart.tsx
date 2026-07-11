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
import { weeklyRevenue } from "@/lib/mock-reports";

function RevenueTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const value = payload[0]?.value;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-card">
      <p dir="ltr" className="text-xs text-muted-foreground">
        {label}
      </p>
      <p dir="ltr" className="text-sm font-semibold text-foreground">
        ₪{Number(value).toLocaleString("en-US")}
      </p>
    </div>
  );
}

export function RevenueTrendChart() {
  return (
    <div dir="ltr" className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyRevenue} barCategoryGap="30%">
          <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={44}
            tickFormatter={(value: number) => `₪${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip cursor={{ fill: "var(--color-border)", opacity: 0.3 }} content={RevenueTooltip} />
          <Bar dataKey="revenue" fill={chartColor.chart1} radius={[4, 4, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
