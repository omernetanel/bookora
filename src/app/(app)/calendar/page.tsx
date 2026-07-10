import { TopBar } from "@/components/layout/TopBar";
import { DayCalendar } from "@/components/dashboard/DayCalendar";

export default function CalendarPage() {
  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="יומן" subtitle="לוח הזמנים המלא של העסק" />

      <div className="flex flex-col gap-6 px-8 pb-8">
        <DayCalendar />
      </div>
    </main>
  );
}
