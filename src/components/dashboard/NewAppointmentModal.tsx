"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const MOCK_STAFF = ["אור כהן", "מיכל לוי", "דניאל אברהם"];
const MOCK_SERVICES = ["תספורת", "ייעוץ", "קיצוץ זקן", "צביעה", "עיסוי"];

type NewAppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function NewAppointmentModal({ isOpen, onClose }: NewAppointmentModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
            className="absolute inset-0 bg-background/80"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-appointment-title"
            className="relative flex w-full max-w-md flex-col gap-5 rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-center justify-between">
              <h2
                id="new-appointment-title"
                className="font-heading text-lg font-semibold text-foreground"
              >
                תור חדש
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

            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">לקוח</span>
                <input
                  type="text"
                  placeholder="שם הלקוח"
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">שירות</span>
                <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                  {MOCK_SERVICES.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">איש צוות</span>
                <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                  {MOCK_STAFF.map((member) => (
                    <option key={member}>{member}</option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-foreground">תאריך</span>
                  <input
                    type="date"
                    dir="ltr"
                    defaultValue="2026-05-14"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-foreground">שעה</span>
                  <input
                    type="time"
                    dir="ltr"
                    defaultValue="09:00"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  />
                </label>
              </div>

              <p className="text-xs text-muted-foreground">
                שמירת תורים תופעל לאחר חיבור המערכת לבסיס נתונים.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-border/40"
                >
                  ביטול
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                >
                  שמירה
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
