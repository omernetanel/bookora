"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
  HEBREW_WEEKDAY_SHORT,
  dateKey,
  staffMembers,
  type DayAppointment,
} from "@/lib/mock-schedule";
import { SERVICE_BG, STATUS_CLASSES } from "@/lib/appointment-styles";

type WeekViewProps = {
  weekStart: Date;
  getAppointments: (date: Date) => DayAppointment[];
  onEditAppointment: (appointment: DayAppointment, date: Date) => void;
  onSelectDay: (date: Date) => void;
};

export function WeekView({
  weekStart,
  getAppointments,
  onEditAppointment,
  onSelectDay,
}: WeekViewProps) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
      {days.map((date) => {
        const appointments = getAppointments(date);
        const isToday = dateKey(date) === dateKey(today);

        return (
          <div key={dateKey(date)} className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onSelectDay(date)}
              className="flex items-center gap-2 rounded-lg px-1 py-1 text-start transition-colors hover:bg-border/40"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                }`}
              >
                {date.getDate()}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {HEBREW_WEEKDAY_SHORT[date.getDay()]}
              </span>
            </button>

            <div className="flex flex-col gap-1.5">
              {appointments.length === 0 ? (
                <p className="px-1 text-xs text-muted-foreground/70">אין תורים</p>
              ) : (
                appointments.map((appointment) => {
                  const staff = staffMembers.find((member) => member.id === appointment.staffId);

                  return (
                    <button
                      key={appointment.id}
                      type="button"
                      onClick={() => onEditAppointment(appointment, date)}
                      className={`relative overflow-hidden rounded-lg text-start shadow-sm ring-1 ring-white/10 transition-transform hover:scale-[1.02] ${SERVICE_BG[appointment.color]} ${STATUS_CLASSES[appointment.status]}`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-black/10" />

                      <div className="relative flex flex-col gap-0.5 px-2.5 py-1.5">
                        <div className="flex items-center justify-between gap-1">
                          <span dir="ltr" className="text-[11px] font-medium text-primary-foreground/80">
                            {appointment.start}
                          </span>
                          <div className="flex items-center gap-1">
                            {appointment.status === "completed" ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground/90" />
                            ) : null}
                            {staff ? (
                              <Image
                                src={staff.avatarUrl}
                                alt=""
                                width={16}
                                height={16}
                                className="h-4 w-4 shrink-0 rounded-full object-cover"
                              />
                            ) : null}
                          </div>
                        </div>
                        <p
                          className={`truncate text-sm font-bold leading-tight text-primary-foreground ${
                            appointment.status === "cancelled" ? "line-through" : ""
                          }`}
                        >
                          {appointment.clientName}
                        </p>
                        <p className="truncate text-[11px] leading-tight text-primary-foreground/80">
                          {appointment.serviceName}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
