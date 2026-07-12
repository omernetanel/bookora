import { TopBar } from "@/components/layout/TopBar";
import { Calendar } from "@/components/dashboard/Calendar";

export default function CalendarPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <TopBar title="יומן" subtitle="לוח הזמנים המלא של העסק" />

      <div className="flex flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
        <Calendar />
      </div>
    </main>
  );
}
