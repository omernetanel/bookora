"use client";

import { useEffect, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, UserPlus, XCircle, type LucideIcon } from "lucide-react";

type NotificationKind = "new" | "reminder" | "cancelled";

type NotificationItem = {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  time: string;
};

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    kind: "new",
    title: "תור חדש נקבע",
    description: "שרה לוי קבעה תור לייעוץ ראשוני",
    time: "לפני 12 דקות",
  },
  {
    id: "2",
    kind: "reminder",
    title: "תזכורת פגישה",
    description: "פגישה עם דוד לוי בעוד שעה",
    time: "לפני 40 דקות",
  },
  {
    id: "3",
    kind: "cancelled",
    title: "תור בוטל",
    description: "אולגה פרץ ביטלה את התור שלה",
    time: "אתמול",
  },
];

const ICONS: Record<NotificationKind, LucideIcon> = {
  new: UserPlus,
  reminder: Calendar,
  cancelled: XCircle,
};

type NotificationsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  /** The trigger button + panel's shared wrapper — clicks anywhere inside it
   * (including the toggle button) must NOT count as "outside". Checking the
   * panel alone would race the toggle button's own click handler: a click on
   * the button would close via this listener and then immediately reopen via
   * the toggle, since mousedown fires before click. */
  containerRef: RefObject<HTMLDivElement | null>;
};

export function NotificationsPanel({ isOpen, onClose, containerRef }: NotificationsPanelProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleClickAway(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickAway);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, containerRef]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          role="menu"
          aria-label="התראות"
          className="absolute end-0 top-full z-40 mt-2 w-80 rounded-xl border border-border bg-card p-2 shadow-card"
        >
          <div className="px-2 py-1.5">
            <h3 className="text-sm font-semibold text-foreground">התראות</h3>
          </div>
          <div className="flex flex-col">
            {NOTIFICATIONS.map((item) => {
              const Icon = ICONS[item.kind];
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-border/40"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    <p className="text-xs text-muted-foreground/70">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
