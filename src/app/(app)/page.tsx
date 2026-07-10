import { TopBar } from "@/components/layout/TopBar";
import { StatCard } from "@/components/dashboard/StatCard";
import { DayCalendar } from "@/components/dashboard/DayCalendar";

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="לוח בקרה" subtitle="ברוך שובך, אורי!" />

      <div className="flex flex-col gap-6 px-8 pb-8">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="תורים היום" value="24" />
          <StatCard label="השבוע" value="156" />
          <StatCard label="לקוחות חדשים" value="12" />
          <StatCard label="הכנסות" value="₪24,680" delta="+12.5%" />
        </div>

        <DayCalendar />
      </div>
    </main>
  );
}
