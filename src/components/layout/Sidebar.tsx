"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Users,
  Tag,
  UserCog,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/", label: "לוח בקרה", icon: LayoutDashboard },
  { href: "/calendar", label: "יומן", icon: Calendar },
  { href: "/appointments", label: "תורים", icon: ClipboardList },
  { href: "/clients", label: "לקוחות", icon: Users },
  { href: "/services", label: "שירותים", icon: Tag },
  { href: "/staff", label: "צוות", icon: UserCog },
  { href: "/settings", label: "הגדרות", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-e border-border bg-card">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <span className="font-heading text-lg font-bold text-primary-foreground">
            B
          </span>
        </div>
        <span className="font-heading text-xl font-bold text-foreground">
          Bookora
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-border/40 hover:text-foreground"
              }`}
            >
              {isActive ? (
                <motion.div
                  layoutId="sidebar-active-highlight"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              ) : null}
              <Icon className="relative h-5 w-5 shrink-0" />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-4 py-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-border/40 hover:text-foreground"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          התנתקות
        </button>
      </div>
    </aside>
  );
}
