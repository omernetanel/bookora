"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
  GRID_ROW_START,
  GRID_ROW_SPAN,
  QUARTERS_PER_HOUR,
  durationToRowSpan,
  timeToRowStart,
} from "@/lib/calendar-grid";
import { dateKey, staffMembers, type DayAppointment } from "@/lib/mock-schedule";
import { SERVICE_BG, STATUS_CLASSES } from "@/lib/appointment-styles";

const RANGE_START_HOUR = 9;
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16] as const;

// Fixed to 3 staff for now — the grid column template below is static on
// purpose, so it stays a discoverable literal for Tailwind's build scanner.
const STAFF_COL_START = ["col-start-2", "col-start-3", "col-start-4"] as const;

// Only shows the live time indicator when the viewed date is the real
// current day — otherwise a "now" line on a past/future date would be wrong.
function useNowRowStart(viewedDate: Date): number | null {
  const [nowRowStart, setNowRowStart] = useState<number | null>(null);

  useEffect(() => {
    function update() {
      const now = new Date();
      if (dateKey(now) !== dateKey(viewedDate)) {
        setNowRowStart(null);
        return;
      }
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
  }, [viewedDate]);

  return nowRowStart;
}

type DayViewProps = {
  currentDate: Date;
  appointments: DayAppointment[];
  onEditAppointment: (appointment: DayAppointment, date: Date) => void;
};

export function DayView({ currentDate, appointments, onEditAppointment }: DayViewProps) {
  const nowRowStart = useNowRowStart(currentDate);

  return (
    <>
      <div className="mb-4 flex items-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-3 w-6 rounded-md bg-foreground/40" />
          מאושר — כרגיל
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-6 rounded-md border-2 border-dashed border-foreground/50" />
          ממתין — מסגרת מקווקוות
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-6 rounded-md bg-foreground/40 opacity-40 grayscale" />
          בוטל — דהוי + קו על השם
        </span>
        <span className="flex items-center gap-2">
          <span className="relative h-3 w-6 rounded-md bg-foreground/40">
            <CheckCircle2 className="absolute -end-1.5 -top-1.5 h-3 w-3 text-foreground" />
          </span>
          הושלם — סימון ✓
        </span>
      </div>

      <div className="grid grid-cols-[3.5rem_repeat(3,1fr)] gap-x-2">
        <div />
        {staffMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-2 px-1 pb-3">
            <Image
              src={member.avatarUrl}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 rounded-full border border-border object-cover"
            />
            <span className="truncate text-sm font-medium text-foreground">{member.name}</span>
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
          const staffIndex = staffMembers.findIndex((member) => member.id === appointment.staffId);
          if (staffIndex === -1) return null;

          const rowStartIndex = timeToRowStart(appointment.start, RANGE_START_HOUR) - 1;
          const durationQuarters = durationToRowSpan(appointment.start, appointment.end);
          const rowSpanIndex = durationQuarters - 1;
          const hasRoomForService = durationQuarters >= 3;

          return (
            <button
              key={appointment.id}
              type="button"
              onClick={() => onEditAppointment(appointment, currentDate)}
              className={`${GRID_ROW_START[rowStartIndex]} ${GRID_ROW_SPAN[rowSpanIndex]} ${STAFF_COL_START[staffIndex]} relative mx-0.5 overflow-hidden rounded-xl text-start shadow-sm ring-1 ring-white/10 transition-transform hover:scale-[1.02] ${SERVICE_BG[appointment.color]} ${STATUS_CLASSES[appointment.status]}`}
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
            </button>
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

        {appointments.length === 0 ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-card">
              אין תורים מתוכננים ליום זה
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
