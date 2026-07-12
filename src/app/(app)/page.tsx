import { TopBar } from "@/components/layout/TopBar";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatCardGrid } from "@/components/dashboard/StatCardGrid";
import { Calendar } from "@/components/dashboard/Calendar";
import { getAppointmentsForDate, startOfWeek } from "@/lib/mock-schedule";
import { reportKpis, weeklyRevenue } from "@/lib/mock-reports";

// Recomputed per request (not frozen at build time) so "today"/"this week"
// stay accurate to the real calendar date instead of the last deploy day.
export const dynamic = "force-dynamic";

function countActiveAppointments(date: Date): number {
  return getAppointmentsForDate(date).filter((appointment) => appointment.status !== "cancelled")
    .length;
}

export default function DashboardPage() {
  const today = new Date();
  const appointmentsToday = countActiveAppointments(today);

  const weekStart = startOfWeek(today);
  let appointmentsThisWeek = 0;
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);
    appointmentsThisWeek += countActiveAppointments(day);
  }

  const currentWeekRevenue = weeklyRevenue[weeklyRevenue.length - 1].revenue;
  const previousWeekRevenue = weeklyRevenue[weeklyRevenue.length - 2].revenue;
  const revenueDeltaPercent =
    ((currentWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100;
  const revenueDelta = `${revenueDeltaPercent >= 0 ? "+" : ""}${revenueDeltaPercent.toFixed(1)}%`;

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <TopBar title="לוח בקרה" subtitle="ברוך שובך, אור כהן!" />

      <div className="flex flex-col gap-6 px-8 pb-8">
        <StatCardGrid>
          <StatCard label="תורים היום" value={appointmentsToday} />
          <StatCard label="השבוע" value={appointmentsThisWeek} />
          <StatCard label="לקוחות חדשים" value={reportKpis.newClients} />
          <StatCard
            label="הכנסות השבוע"
            value={currentWeekRevenue}
            prefix="₪"
            delta={revenueDelta}
          />
        </StatCardGrid>

        <Calendar />
      </div>
    </main>
  );
}
