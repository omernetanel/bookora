"use client";

import {
  HEBREW_WEEKDAY_SHORT,
  dateKey,
  monthGridDays,
  type DayAppointment,
} from "@/lib/mock-schedule";
import { SERVICE_BG } from "@/lib/appointment-styles";

const MAX_VISIBLE_DOTS = 3;

type MonthViewProps = {
  currentDate: Date;
  getAppointments: (date: Date) => DayAppointment[];
  onSelectDay: (date: Date) => void;
};

export function MonthView({ currentDate, getAppointments, onSelectDay }: MonthViewProps) {
  const today = new Date();
  const days = monthGridDays(currentDate);
  const currentMonth = currentDate.getMonth();

  return (
    <div className="flex flex-col gap-1.5">
      <div className="grid grid-cols-7 gap-1.5">
        {HEBREW_WEEKDAY_SHORT.map((label) => (
          <div key={label} className="px-1 text-center text-xs text-muted-foreground">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((date) => {
          const isCurrentMonth = date.getMonth() === currentMonth;
          const isToday = dateKey(date) === dateKey(today);
          const appointments = getAppointments(date).filter(
            (appointment) => appointment.status !== "cancelled",
          );
          const visibleAppointments = appointments.slice(0, MAX_VISIBLE_DOTS);
          const overflowCount = appointments.length - visibleAppointments.length;

          return (
            <button
              key={dateKey(date)}
              type="button"
              onClick={() => onSelectDay(date)}
              className={`flex min-h-20 flex-col items-center gap-1.5 rounded-lg border border-border p-2 text-start transition-colors hover:bg-border/40 ${
                isCurrentMonth ? "" : "opacity-40"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                }`}
              >
                {date.getDate()}
              </span>

              <div className="flex flex-wrap items-center justify-center gap-1">
                {visibleAppointments.map((appointment) => (
                  <span
                    key={appointment.id}
                    className={`h-1.5 w-1.5 rounded-full ${SERVICE_BG[appointment.color]}`}
                  />
                ))}
                {overflowCount > 0 ? (
                  <span dir="ltr" className="text-[10px] text-muted-foreground">
                    +{overflowCount}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
