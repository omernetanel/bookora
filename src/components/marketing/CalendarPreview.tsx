"use client";

import { Fragment, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type ServiceColor = "service-1" | "service-2" | "service-3" | "service-4" | "service-5";

type PreviewAppointment = {
  time: string;
  client: string;
  service: string;
  color: ServiceColor;
};

const APPOINTMENTS: PreviewAppointment[] = [
  { time: "09:00", client: "שרה לוי", service: "ייעוץ ראשוני", color: "service-1" },
  { time: "10:30", client: "מיכל כהן", service: "עריכת חוזה", color: "service-2" },
  { time: "12:00", client: "דוד לוי", service: "ייעוץ מס", color: "service-3" },
  { time: "14:00", client: "אמה ישראלי", service: "בדיקת נאותות", color: "service-4" },
  { time: "16:00", client: "יוסי מזרחי", service: "ליווי משפטי", color: "service-5" },
];

const ROW_CLASSES: Record<ServiceColor, string> = {
  "service-1": "border-service-1 bg-service-1/20",
  "service-2": "border-service-2 bg-service-2/20",
  "service-3": "border-service-3 bg-service-3/20",
  "service-4": "border-service-4 bg-service-4/20",
  "service-5": "border-service-5 bg-service-5/20",
};

export function CalendarPreview() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      className="relative"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_42%,color-mix(in_srgb,var(--color-primary)_32%,transparent),transparent_68%)] blur-3xl"
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-xl border border-border bg-card p-4 shadow-card sm:p-5"
      >
        <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">היום שלך</p>
            <p dir="ltr" className="mt-0.5 text-xs text-muted-foreground">
              14 May 2026
            </p>
          </div>
          <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
            תצוגה חיה
          </span>
        </div>

        <div className="mb-3 inline-flex items-center gap-1 rounded-lg border border-border p-1 text-xs">
          <span className="rounded-md bg-primary/10 px-2.5 py-1 font-medium text-primary">יום</span>
          <span className="px-2.5 py-1 text-muted-foreground">שבוע</span>
          <span className="px-2.5 py-1 text-muted-foreground">חודש</span>
        </div>

        <div className="flex flex-col gap-2">
          {APPOINTMENTS.map((appointment, index) => (
            <Fragment key={appointment.time}>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15, ease: [0.2, 0.7, 0.2, 1] }}
                className={`flex items-center gap-2.5 rounded-lg border-e-[3px] px-2.5 py-2 ${ROW_CLASSES[appointment.color]}`}
              >
                <span dir="ltr" className="min-w-[42px] text-xs text-muted-foreground">
                  {appointment.time}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {appointment.client}
                  </span>
                  <span className="text-xs text-muted-foreground">{appointment.service}</span>
                </div>
              </motion.div>
              {index === 1 ? <NowLine /> : null}
            </Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function NowLine() {
  return (
    <div className="relative my-1 border-t border-dashed border-primary/60">
      <span className="absolute start-0 -top-2 bg-card px-1.5 text-[10px] text-primary">עכשיו</span>
      <span className="absolute end-0 -top-1 h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
    </div>
  );
}
