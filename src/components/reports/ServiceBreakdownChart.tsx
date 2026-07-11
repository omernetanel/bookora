"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import { revenueByService } from "@/lib/mock-reports";

function ServiceTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  if (!entry) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-card">
      <p className="text-xs text-muted-foreground">{entry.payload.name}</p>
      <p dir="ltr" className="text-sm font-semibold text-foreground">
        ₪{Number(entry.value).toLocaleString("en-US")}
      </p>
    </div>
  );
}

export function ServiceBreakdownChart() {
  return (
    <div dir="ltr" className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueByService} layout="vertical" margin={{ left: 0, right: 12 }}>
          <CartesianGrid stroke="var(--color-border)" horizontal={false} strokeDasharray="3 3" />
          <XAxis
            type="number"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: number) => `₪${(value / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            orientation="right"
            tick={{ fill: "var(--color-foreground)", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            width={104}
          />
          <Tooltip cursor={{ fill: "var(--color-border)", opacity: 0.3 }} content={ServiceTooltip} />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]} maxBarSize={22}>
            {revenueByService.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
