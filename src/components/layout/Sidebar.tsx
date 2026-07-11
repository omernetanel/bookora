"use client";

import Image from "next/image";
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
  BarChart3,
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
  { href: "/reports", label: "דוחות", icon: BarChart3 },
  { href: "/settings", label: "הגדרות", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-e border-border bg-card">
      <div dir="ltr" className="flex items-center px-6 pt-6">
        <Image
          src="/lynkologow.png"
          alt="LYNKO"
          width={151}
          height={36}
          className="h-9 w-auto"
          priority
        />
      </div>

      <div className="mx-6 mb-4 mt-3 w-fit rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
        תצוגת דמו
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
