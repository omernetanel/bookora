"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, HelpCircle, Menu } from "lucide-react";
import { NotificationsPanel } from "./NotificationsPanel";
import { useSidebar } from "./SidebarProvider";
import { useTour } from "@/components/tour/TourProvider";

type TopBarProps = {
  title: string;
  subtitle?: string;
};

export function TopBar({ title, subtitle }: TopBarProps) {
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useSidebar();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasSidebarOpenRef = useRef(false);

  const { start: startTour } = useTour();

  useEffect(() => {
    if (wasSidebarOpenRef.current && !isSidebarOpen) {
      menuButtonRef.current?.focus();
    }
    wasSidebarOpenRef.current = isSidebarOpen;
  }, [isSidebarOpen]);

  function toggleNotifications() {
    setIsNotificationsOpen((current) => !current);
    setHasUnread(false);
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="תפריט"
          onClick={toggleSidebar}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-border/40 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled
          title="בקרוב"
          className="hidden cursor-not-allowed items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground opacity-60 sm:flex"
        >
          12 מאי – 18 מאי, 2026
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>

        <button
          type="button"
          aria-label="הפעל סיור מודרך"
          title="סיור מודרך"
          onClick={startTour}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-border/40"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <div ref={notificationsRef} className="relative">
          <button
            type="button"
            aria-label="התראות"
            data-tour="notifications-bell"
            onClick={toggleNotifications}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-border/40"
          >
            <Bell className="h-5 w-5" />
            {hasUnread ? (
              <span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            ) : null}
          </button>

          <NotificationsPanel
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            containerRef={notificationsRef}
          />
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card">
          <span className="font-heading text-sm font-bold text-foreground">
            א
          </span>
        </div>
      </div>
    </header>
  );
}
