"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  addMinutesToTime,
  dateKey,
  findConflict,
  formatHebrewDate,
  formatHebrewMonth,
  formatHebrewWeekRange,
  getAppointmentsForDate,
  REFERENCE_DATE,
  services,
  staffMembers,
  startOfWeek,
  timeToMinutes,
  type DayAppointment,
} from "@/lib/mock-schedule";
import {
  AppointmentModal,
  type AppointmentFormValues,
} from "./AppointmentModal";
import { DayView } from "./DayView";
import { DayViewMobile } from "./DayViewMobile";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import { Button } from "@/components/ui/Button";

type ViewMode = "day" | "week" | "month";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(REFERENCE_DATE);
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [appointmentsByDate, setAppointmentsByDate] = useState<Record<string, DayAppointment[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<DayAppointment | null>(null);
  const [editingDate, setEditingDate] = useState<Date>(REFERENCE_DATE);
  const [modalSession, setModalSession] = useState(0);

  function getAppointmentsFor(date: Date): DayAppointment[] {
    const key = dateKey(date);
    return appointmentsByDate[key] ?? getAppointmentsForDate(date);
  }

  function updateAppointmentsFor(
    date: Date,
    updater: (current: DayAppointment[]) => DayAppointment[],
  ) {
    const key = dateKey(date);
    setAppointmentsByDate((current) => ({
      ...current,
      // Sorted here (not just at generation time) so WeekView — which
      // renders in array order rather than positioning by time like
      // DayView — stays correct after a create/edit/cancel, not just on
      // first load.
      [key]: updater(current[key] ?? getAppointmentsForDate(date)).sort(
        (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start),
      ),
    }));
  }

  function changeDate(deltaDays: number) {
    setCurrentDate((current) => {
      const next = new Date(current);
      next.setDate(next.getDate() + deltaDays);
      return next;
    });
  }

  function changeMonth(deltaMonths: number) {
    setCurrentDate((current) => {
      const next = new Date(current);
      next.setMonth(next.getMonth() + deltaMonths);
      return next;
    });
  }

  function goToPrevious() {
    if (viewMode === "month") changeMonth(-1);
    else changeDate(viewMode === "week" ? -7 : -1);
  }

  function goToNext() {
    if (viewMode === "month") changeMonth(1);
    else changeDate(viewMode === "week" ? 7 : 1);
  }

  function goToToday() {
    setCurrentDate(new Date());
  }

  function openCreateModal() {
    setEditingAppointment(null);
    setEditingDate(currentDate);
    setIsModalOpen(true);
    setModalSession((session) => session + 1);
  }

  function openEditModal(appointment: DayAppointment, date: Date) {
    setEditingAppointment(appointment);
    setEditingDate(date);
    setIsModalOpen(true);
    setModalSession((session) => session + 1);
  }

  function handleSave(values: AppointmentFormValues, editingId: string | null): string | null {
    const service = services[values.serviceIndex];
    const end = addMinutesToTime(values.start, service.durationMinutes);
    const dayAppointments = getAppointmentsFor(editingDate);
    const conflict = findConflict(
      dayAppointments,
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
        ? dayAppointments.find((appointment) => appointment.id === editingId)?.status ?? "confirmed"
        : "confirmed",
    };

    updateAppointmentsFor(editingDate, (current) =>
      editingId
        ? current.map((appointment) => (appointment.id === editingId ? updated : appointment))
        : [...current, updated],
    );

    return null;
  }

  function handleCancelAppointment(id: string) {
    updateAppointmentsFor(editingDate, (current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "cancelled" } : appointment,
      ),
    );
  }

  const weekStart = startOfWeek(currentDate);
  const heading =
    viewMode === "day"
      ? formatHebrewDate(currentDate)
      : viewMode === "week"
        ? formatHebrewWeekRange(weekStart)
        : formatHebrewMonth(currentDate);

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-heading text-lg font-semibold text-foreground">{heading}</h2>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="הקודם"
              onClick={goToPrevious}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-border/40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goToToday}
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-border/40"
            >
              היום
            </button>
            <button
              type="button"
              aria-label="הבא"
              onClick={goToNext}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-border/40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-border p-1">
            <button
              type="button"
              onClick={() => setViewMode("day")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "day"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              יום
            </button>
            <button
              type="button"
              onClick={() => setViewMode("week")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "week"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              שבוע
            </button>
            <button
              type="button"
              onClick={() => setViewMode("month")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "month"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
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

      <AppointmentModal
        key={modalSession}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingAppointment={editingAppointment}
        onSave={handleSave}
        onCancelAppointment={handleCancelAppointment}
        date={editingDate}
      />

      {viewMode === "day" ? (
        <>
          <div className="hidden lg:block">
            <DayView
              currentDate={currentDate}
              appointments={getAppointmentsFor(currentDate)}
              onEditAppointment={openEditModal}
            />
          </div>
          <div className="lg:hidden">
            <DayViewMobile
              currentDate={currentDate}
              appointments={getAppointmentsFor(currentDate)}
              onEditAppointment={openEditModal}
            />
          </div>
        </>
      ) : viewMode === "week" ? (
        <WeekView
          weekStart={weekStart}
          getAppointments={getAppointmentsFor}
          onEditAppointment={openEditModal}
          onSelectDay={(date) => {
            setCurrentDate(date);
            setViewMode("day");
          }}
        />
      ) : (
        <MonthView
          currentDate={currentDate}
          getAppointments={getAppointmentsFor}
          onSelectDay={(date) => {
            setCurrentDate(date);
            setViewMode("day");
          }}
        />
      )}
    </section>
  );
}
