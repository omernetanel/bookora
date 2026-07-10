import { Fragment } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  GRID_ROW_START,
  GRID_ROW_SPAN,
  QUARTERS_PER_HOUR,
  durationToRowSpan,
  timeToRowStart,
} from "@/lib/calendar-grid";

const RANGE_START_HOUR = 9;
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16] as const;

type ServiceColor = "service-1" | "service-2" | "service-3" | "service-4" | "service-5";

const SERVICE_BG: Record<ServiceColor, string> = {
  "service-1": "bg-service-1",
  "service-2": "bg-service-2",
  "service-3": "bg-service-3",
  "service-4": "bg-service-4",
  "service-5": "bg-service-5",
};

type DayAppointment = {
  id: string;
  clientName: string;
  serviceName: string;
  start: string;
  end: string;
  color: ServiceColor;
};

const appointments: DayAppointment[] = [
  { id: "1", clientName: "שרה לוי", serviceName: "תספורת", start: "09:00", end: "09:45", color: "service-1" },
  { id: "2", clientName: "מיכל כהן", serviceName: "ייעוץ", start: "10:00", end: "10:45", color: "service-3" },
  { id: "3", clientName: "דוד לוי", serviceName: "קיצוץ זקן", start: "11:00", end: "11:30", color: "service-2" },
  { id: "4", clientName: "אמה ישראלי", serviceName: "צביעה", start: "12:00", end: "13:00", color: "service-4" },
  { id: "5", clientName: "אולגה פרץ", serviceName: "תספורת", start: "14:00", end: "14:45", color: "service-1" },
];

export function DayCalendar() {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          14 במאי, 2026
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="היום הקודם"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-border/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-border/40"
          >
            היום
          </button>
          <button
            type="button"
            aria-label="היום הבא"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-border/40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <button
            type="button"
            className="rounded-md bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
          >
            יום
          </button>
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            שבוע
          </button>
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            חודש
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[3.5rem_1fr] grid-rows-[repeat(32,1.25rem)]">
        {HOURS.map((hour, index) => {
          const rowStart = GRID_ROW_START[index * QUARTERS_PER_HOUR];
          return (
            <Fragment key={hour}>
              <div
                className={`${rowStart} row-span-4 col-start-1 border-t border-border pe-3 text-xs text-muted-foreground`}
              >
                {hour}:00
              </div>
              <div
                className={`${rowStart} row-span-4 col-start-2 border-t border-border`}
              />
            </Fragment>
          );
        })}

        {appointments.map((appointment) => {
          const rowStartIndex = timeToRowStart(appointment.start, RANGE_START_HOUR) - 1;
          const rowSpanIndex =
            durationToRowSpan(appointment.start, appointment.end) - 1;

          return (
            <div
              key={appointment.id}
              className={`${GRID_ROW_START[rowStartIndex]} ${GRID_ROW_SPAN[rowSpanIndex]} col-start-2 mx-1 overflow-hidden rounded-lg p-2 ${SERVICE_BG[appointment.color]}`}
            >
              <p className="text-xs text-primary-foreground/80">
                {appointment.start}
              </p>
              <p className="truncate text-sm font-semibold text-primary-foreground">
                {appointment.clientName}
              </p>
              <p className="truncate text-xs text-primary-foreground/80">
                {appointment.serviceName}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
