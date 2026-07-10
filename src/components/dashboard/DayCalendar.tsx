"use client";

import { Fragment, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Plus } from "lucide-react";
import {
  GRID_ROW_START,
  GRID_ROW_SPAN,
  QUARTERS_PER_HOUR,
  durationToRowSpan,
  timeToRowStart,
} from "@/lib/calendar-grid";
import { NewAppointmentModal } from "./NewAppointmentModal";

const RANGE_START_HOUR = 9;
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16] as const;

type ServiceColor =
  | "service-1"
  | "service-2"
  | "service-3"
  | "service-4"
  | "service-5";

const SERVICE_BG: Record<ServiceColor, string> = {
  "service-1": "bg-service-1",
  "service-2": "bg-service-2",
  "service-3": "bg-service-3",
  "service-4": "bg-service-4",
  "service-5": "bg-service-5",
};

type AppointmentStatus = "confirmed" | "pending" | "cancelled" | "completed";

const STATUS_CLASSES: Record<AppointmentStatus, string> = {
  confirmed: "",
  pending: "border-2 border-dashed border-foreground/40 opacity-80",
  cancelled: "opacity-35 grayscale",
  completed: "",
};

type StaffMember = {
  id: string;
  name: string;
};

const staffMembers: StaffMember[] = [
  { id: "s1", name: "אור כהן" },
  { id: "s2", name: "מיכל לוי" },
  { id: "s3", name: "דניאל אברהם" },
];

// Fixed to 3 staff for now — the grid column template below is static on
// purpose, so it stays a discoverable literal for Tailwind's build scanner.
const STAFF_COL_START = ["col-start-2", "col-start-3", "col-start-4"] as const;

type DayAppointment = {
  id: string;
  clientName: string;
  serviceName: string;
  start: string;
  end: string;
  color: ServiceColor;
  staffId: string;
  status: AppointmentStatus;
};

const appointments: DayAppointment[] = [
  { id: "1", clientName: "שרה לוי", serviceName: "תספורת", start: "09:00", end: "09:45", color: "service-1", staffId: "s1", status: "confirmed" },
  { id: "2", clientName: "מיכל כהן", serviceName: "ייעוץ", start: "10:00", end: "10:45", color: "service-3", staffId: "s2", status: "confirmed" },
  { id: "3", clientName: "דוד לוי", serviceName: "קיצוץ זקן", start: "11:00", end: "11:30", color: "service-2", staffId: "s1", status: "pending" },
  { id: "4", clientName: "אמה ישראלי", serviceName: "צביעה", start: "12:00", end: "13:00", color: "service-4", staffId: "s3", status: "confirmed" },
  { id: "5", clientName: "אולגה פרץ", serviceName: "תספורת", start: "14:00", end: "14:45", color: "service-1", staffId: "s2", status: "cancelled" },
  { id: "6", clientName: "יוסי מזרחי", serviceName: "עיסוי", start: "10:30", end: "11:15", color: "service-5", staffId: "s3", status: "completed" },
];

function useNowRowStart(): number | null {
  const [nowRowStart, setNowRowStart] = useState<number | null>(null);

  useEffect(() => {
    function update() {
      const now = new Date();
      const hours = now.getHours();
      if (hours < RANGE_START_HOUR || hours >= RANGE_START_HOUR + HOURS.length) {
        setNowRowStart(null);
        return;
      }
      const time = `${String(hours).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setNowRowStart(timeToRowStart(time, RANGE_START_HOUR));
    }

    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return nowRowStart;
}

export function DayCalendar() {
  const nowRowStart = useNowRowStart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          14 במאי, 2026
        </h2>

        <div className="flex items-center gap-3">
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

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            תור חדש
          </button>
        </div>
      </div>

      <NewAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="grid grid-cols-[3.5rem_repeat(3,1fr)] gap-x-2">
        <div />
        {staffMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-2 px-1 pb-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-foreground">
              {member.name.charAt(0)}
            </div>
            <span className="truncate text-sm font-medium text-foreground">
              {member.name}
            </span>
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-[3.5rem_repeat(3,1fr)] grid-rows-[repeat(32,1.25rem)] gap-x-2">
        {HOURS.map((hour, index) => {
          const rowStart = GRID_ROW_START[index * QUARTERS_PER_HOUR];
          return (
            <Fragment key={hour}>
              <div
                className={`${rowStart} row-span-4 col-start-1 border-t border-border pe-3 text-xs text-muted-foreground`}
              >
                {hour}:00
              </div>
              {STAFF_COL_START.map((colStart) => (
                <div
                  key={`${hour}-${colStart}`}
                  className={`${rowStart} row-span-4 ${colStart} border-t border-border`}
                />
              ))}
            </Fragment>
          );
        })}

        {appointments.map((appointment) => {
          const staffIndex = staffMembers.findIndex(
            (member) => member.id === appointment.staffId,
          );
          if (staffIndex === -1) return null;

          const rowStartIndex = timeToRowStart(appointment.start, RANGE_START_HOUR) - 1;
          const durationQuarters = durationToRowSpan(appointment.start, appointment.end);
          const rowSpanIndex = durationQuarters - 1;
          const hasRoomForService = durationQuarters >= 3;

          return (
            <div
              key={appointment.id}
              className={`${GRID_ROW_START[rowStartIndex]} ${GRID_ROW_SPAN[rowSpanIndex]} ${STAFF_COL_START[staffIndex]} relative mx-0.5 overflow-hidden rounded-xl shadow-sm ring-1 ring-white/10 ${SERVICE_BG[appointment.color]} ${STATUS_CLASSES[appointment.status]}`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-black/10" />

              <div className="relative flex h-full flex-col justify-center gap-px px-2.5 py-1">
                {appointment.status === "completed" ? (
                  <CheckCircle2 className="absolute end-1 top-1 h-3.5 w-3.5 text-primary-foreground/90" />
                ) : null}
                <p className="text-[11px] font-medium leading-tight text-primary-foreground/80">
                  {appointment.start}
                </p>
                <p
                  className={`truncate text-sm font-bold leading-tight text-primary-foreground ${
                    appointment.status === "cancelled" ? "line-through" : ""
                  }`}
                >
                  {appointment.clientName}
                </p>
                {hasRoomForService ? (
                  <p className="truncate text-[11px] leading-tight text-primary-foreground/80">
                    {appointment.serviceName}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}

        {nowRowStart ? (
          <div
            className={`${GRID_ROW_START[nowRowStart - 1]} col-start-2 col-span-3 z-10 flex items-center`}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-destructive" />
            <span className="h-px flex-1 bg-destructive" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
