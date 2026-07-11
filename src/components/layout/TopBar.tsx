"use client";

import { useRef, useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { NotificationsPanel } from "./NotificationsPanel";

type TopBarProps = {
  title: string;
  subtitle?: string;
};

export function TopBar({ title, subtitle }: TopBarProps) {
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  function toggleNotifications() {
    setIsNotificationsOpen((current) => !current);
    setHasUnread(false);
  }

  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled
          title="בקרוב"
          className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground opacity-60"
        >
          12 מאי – 18 מאי, 2026
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>

        <div ref={notificationsRef} className="relative">
          <button
            type="button"
            aria-label="התראות"
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

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
          <span className="font-heading text-sm font-bold text-foreground">
            א
          </span>
        </div>
      </div>
    </header>
  );
}
