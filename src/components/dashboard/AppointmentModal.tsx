"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { services, staffMembers, type DayAppointment } from "@/lib/mock-schedule";
import { Button } from "@/components/ui/Button";

export type AppointmentFormValues = {
  clientName: string;
  serviceIndex: number;
  staffId: string;
  start: string;
};

const DEFAULT_VALUES: AppointmentFormValues = {
  clientName: "",
  serviceIndex: 0,
  staffId: staffMembers[0].id,
  start: "09:00",
};

function formatDateLTR(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

function valuesFromAppointment(appointment: DayAppointment): AppointmentFormValues {
  const serviceIndex = services.findIndex(
    (service) => service.name === appointment.serviceName,
  );
  return {
    clientName: appointment.clientName,
    serviceIndex: serviceIndex === -1 ? 0 : serviceIndex,
    staffId: appointment.staffId,
    start: appointment.start,
  };
}

type AppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editingAppointment: DayAppointment | null;
  onSave: (values: AppointmentFormValues, editingId: string | null) => string | null;
  onCancelAppointment: (id: string) => void;
  date: Date;
};

export function AppointmentModal({
  isOpen,
  onClose,
  editingAppointment,
  onSave,
  onCancelAppointment,
  date,
}: AppointmentModalProps) {
  const [values, setValues] = useState<AppointmentFormValues>(() =>
    editingAppointment ? valuesFromAppointment(editingAppointment) : DEFAULT_VALUES,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const conflictMessage = onSave(values, editingAppointment?.id ?? null);
    if (conflictMessage) {
      setError(conflictMessage);
      return;
    }
    onClose();
  }

  const isEditing = editingAppointment !== null;

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-modal-title"
            className="relative flex max-h-[90vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-center justify-between">
              <h2
                id="appointment-modal-title"
                className="font-heading text-lg font-semibold text-foreground"
              >
                {isEditing ? "עריכת תור" : "תור חדש"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="סגור"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-border/40 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">לקוח</span>
                <input
                  type="text"
                  required
                  placeholder="שם הלקוח"
                  value={values.clientName}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, clientName: event.target.value }))
                  }
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">שירות</span>
                <select
                  value={values.serviceIndex}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      serviceIndex: Number(event.target.value),
                    }))
                  }
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  {services.map((service, index) => (
                    <option key={service.name} value={index}>
                      {service.name} · {service.durationMinutes} דקות
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">איש צוות</span>
                <select
                  value={values.staffId}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, staffId: event.target.value }))
                  }
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  {staffMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-foreground">תאריך</span>
                  <input
                    type="text"
                    dir="ltr"
                    disabled
                    value={formatDateLTR(date)}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground disabled:cursor-not-allowed"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-foreground">שעה</span>
                  <input
                    type="time"
                    dir="ltr"
                    required
                    value={values.start}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, start: event.target.value }))
                    }
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  />
                </label>
              </div>

              {error ? (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <p className="text-xs text-muted-foreground">
                השינויים נשמרים בתצוגה הזו בלבד עד לחיבור המערכת לבסיס נתונים.
              </p>

              <div className="flex items-center justify-between pt-2">
                {isEditing ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onCancelAppointment(editingAppointment.id);
                      onClose();
                    }}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    ביטול התור
                  </Button>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-3">
                  <Button variant="secondary" onClick={onClose}>
                    ביטול
                  </Button>
                  <Button type="submit">שמירה</Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
