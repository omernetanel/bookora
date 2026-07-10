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
import {
  addMinutesToTime,
  findConflict,
  initialAppointments,
  services,
  staffMembers,
  type DayAppointment,
  type ServiceColor,
} from "@/lib/mock-schedule";
import {
  AppointmentModal,
  type AppointmentFormValues,
} from "./AppointmentModal";
import { Button } from "@/components/ui/Button";

const RANGE_START_HOUR = 9;
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16] as const;

const SERVICE_BG: Record<ServiceColor, string> = {
  "service-1": "bg-service-1",
  "service-2": "bg-service-2",
  "service-3": "bg-service-3",
  "service-4": "bg-service-4",
  "service-5": "bg-service-5",
};

const STATUS_CLASSES: Record<DayAppointment["status"], string> = {
  confirmed: "",
  pending: "border-2 border-dashed border-foreground/40 opacity-80",
  cancelled: "opacity-35 grayscale",
  completed: "",
};

// Fixed to 3 staff for now — the grid column template below is static on
// purpose, so it stays a discoverable literal for Tailwind's build scanner.
const STAFF_COL_START = ["col-start-2", "col-start-3", "col-start-4"] as const;

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
  const [appointments, setAppointments] = useState<DayAppointment[]>(initialAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<DayAppointment | null>(null);
  const [modalSession, setModalSession] = useState(0);

  function openCreateModal() {
    setEditingAppointment(null);
    setIsModalOpen(true);
    setModalSession((session) => session + 1);
  }

  function openEditModal(appointment: DayAppointment) {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
    setModalSession((session) => session + 1);
  }

  function handleSave(values: AppointmentFormValues, editingId: string | null): string | null {
    const service = services[values.serviceIndex];
    const end = addMinutesToTime(values.start, service.durationMinutes);
    const conflict = findConflict(
      appointments,
      values.staffId,
      values.start,
      end,
      editingId ?? undefined,
    );

    if (conflict) {
      const staffName =
        staffMembers.find((member) => member.id === values.staffId)?.name ?? "";
      return `השעה הזו כבר תפוסה אצל ${staffName} — ${conflict.clientName} (${conflict.start}–${conflict.end})`;
    }

    const updated: DayAppointment = {
      id: editingId ?? crypto.randomUUID(),
      clientName: values.clientName,
      serviceName: service.name,
      color: service.color,
      staffId: values.staffId,
      start: values.start,
      end,
      status: editingId
        ? appointments.find((appointment) => appointment.id === editingId)?.status ?? "confirmed"
        : "confirmed",
    };

    setAppointments((current) =>
      editingId
        ? current.map((appointment) => (appointment.id === editingId ? updated : appointment))
        : [...current, updated],
    );

    return null;
  }

  function handleCancelAppointment(id: string) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "cancelled" } : appointment,
      ),
    );
  }

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

          <Button onClick={openCreateModal} className="px-3 py-1.5">
            <Plus className="h-4 w-4" />
            תור חדש
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/50" />
          מאושר
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-dashed border-foreground/50" />
          ממתין
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          בוטל
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-foreground/50" />
          הושלם
        </span>
      </div>

      <AppointmentModal
        key={modalSession}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingAppointment={editingAppointment}
        onSave={handleSave}
        onCancelAppointment={handleCancelAppointment}
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
            <button
              key={appointment.id}
              type="button"
              onClick={() => openEditModal(appointment)}
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
      </div>
    </section>
  );
}
