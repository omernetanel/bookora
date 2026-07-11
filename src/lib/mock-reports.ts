import { services, staffMembers } from "./mock-schedule";
import { chartColor } from "./chart-colors";

/** Deterministic PRNG (mulberry32) — never Math.random()/Date.now(), so
 * server and client render the exact same numbers (see CLAUDE.md "Lessons
 * learned": hydration mismatches). */
function mulberry32(seed: number) {
  let state = seed | 0;
  return function random() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(20260517);

// Fixed reference date — the demo's "today" — never Date.now().
const REFERENCE_DATE = new Date(2026, 4, 17);

function formatDateLabel(date: Date): string {
  return `${date.getDate()}.${date.getMonth() + 1}`;
}

const SERVICE_CHART_COLOR = {
  "service-1": chartColor.chart1,
  "service-2": chartColor.chart2,
  "service-3": chartColor.chart3,
  "service-4": chartColor.chart4,
  "service-5": chartColor.chart5,
} as const;

export type WeeklyRevenuePoint = { label: string; revenue: number };

export const weeklyRevenue: WeeklyRevenuePoint[] = Array.from({ length: 8 }, (_, i) => {
  const weeksAgo = 7 - i;
  const date = new Date(REFERENCE_DATE);
  date.setDate(date.getDate() - weeksAgo * 7);
  const trend = i * 850;
  const noise = Math.round((random() - 0.5) * 5000);
  return { label: formatDateLabel(date), revenue: Math.max(9000, 21000 + trend + noise) };
});

export type ServiceRevenue = { name: string; revenue: number; fill: string };

export const revenueByService: ServiceRevenue[] = services
  .map((service) => {
    const bookingsThisMonth = Math.round(8 + random() * 14);
    return {
      name: service.name,
      revenue: bookingsThisMonth * service.price,
      fill: SERVICE_CHART_COLOR[service.color],
    };
  })
  .sort((a, b) => b.revenue - a.revenue);

export type StaffUtilization = { name: string; role: string; utilization: number };

export const staffUtilization: StaffUtilization[] = staffMembers.map((staff) => ({
  name: staff.name,
  role: staff.role,
  utilization: Math.round(55 + random() * 38),
}));

export const heatmapDays = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳"];
export const heatmapHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

export type HeatmapCell = { day: string; hour: number; intensity: number };

export const heatmapData: HeatmapCell[] = heatmapDays.flatMap((day, dayIndex) =>
  heatmapHours.map((hour) => {
    const middayBoost = 4 - Math.abs(hour - 13);
    const fridayTaper = day === "ו׳" && hour > 13 ? -3 : 0;
    const base = 1 + middayBoost * 0.5 + fridayTaper + (dayIndex === 5 ? -1 : 0);
    const noise = (random() - 0.5) * 1.5;
    const intensity = Math.max(0, Math.min(4, Math.round(base + noise)));
    return { day, hour, intensity };
  }),
);

export type TopClient = { name: string; visits: number; totalSpent: number };

const clientNames = [
  "שרה לוי",
  "מיכל כהן",
  "דוד לוי",
  "אמה ישראלי",
  "יוסי מזרחי",
  "אולגה פרץ",
  "רונית אבני",
  "עומר שגיא",
  "נועה פישר",
  "אליהו בר",
];

export const topClients: TopClient[] = clientNames
  .map((name) => {
    const visits = Math.round(2 + random() * 9);
    const avgSpend = 350 + random() * 400;
    return { name, visits, totalSpent: Math.round(visits * avgSpend) };
  })
  .sort((a, b) => b.totalSpent - a.totalSpent)
  .slice(0, 5);

export const reportKpis = {
  monthlyRevenue: revenueByService.reduce((sum, item) => sum + item.revenue, 0),
  monthlyAppointments: Math.round(140 + random() * 40),
  newClients: Math.round(14 + random() * 10),
  avgUtilization: Math.round(
    staffUtilization.reduce((sum, item) => sum + item.utilization, 0) / staffUtilization.length,
  ),
};
