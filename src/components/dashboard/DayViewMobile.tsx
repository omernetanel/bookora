"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { staffMembers, type DayAppointment } from "@/lib/mock-schedule";
import { SERVICE_BG, STATUS_CLASSES } from "@/lib/appointment-styles";
import { StatusLegend } from "./StatusLegend";

type DayViewMobileProps = {
  currentDate: Date;
  appointments: DayAppointment[];
  onEditAppointment: (appointment: DayAppointment, date: Date) => void;
};

export function DayViewMobile({
  currentDate,
  appointments,
  onEditAppointment,
}: DayViewMobileProps) {
  return (
    <>
      <StatusLegend />

      {appointments.length === 0 ? (
        <p className="rounded-lg border border-border bg-background px-4 py-6 text-center text-sm text-muted-foreground">
          אין תורים מתוכננים ליום זה
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {appointments.map((appointment) => {
            const staff = staffMembers.find((member) => member.id === appointment.staffId);

            return (
              <button
                key={appointment.id}
                type="button"
                onClick={() => onEditAppointment(appointment, currentDate)}
                className={`relative flex items-center gap-3 overflow-hidden rounded-xl text-start shadow-sm ring-1 ring-white/10 ${SERVICE_BG[appointment.color]} ${STATUS_CLASSES[appointment.status]}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-black/10" />

                <div className="relative flex flex-1 flex-col gap-0.5 px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span dir="ltr" className="text-xs font-medium text-primary-foreground/80">
                      {appointment.start}–{appointment.end}
                    </span>
                    {appointment.status === "completed" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground/90" />
                    ) : null}
                  </div>
                  <p
                    className={`font-bold text-primary-foreground ${
                      appointment.status === "cancelled" ? "line-through" : ""
                    }`}
                  >
                    {appointment.clientName}
                  </p>
                  <p className="text-xs text-primary-foreground/80">{appointment.serviceName}</p>
                </div>

                {staff ? (
                  <div className="relative flex shrink-0 flex-col items-center gap-1 px-3">
                    <Image
                      src={staff.avatarUrl}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full border border-white/20 object-cover"
                    />
                    <span className="max-w-14 truncate text-[10px] text-primary-foreground/80">
                      {staff.name}
                    </span>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
