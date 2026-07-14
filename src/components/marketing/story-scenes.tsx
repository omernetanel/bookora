import type { ReactNode } from "react";
import { Bell, Calendar, UserPlus, XCircle } from "lucide-react";

export type StoryScene = {
  id: string;
  title: string;
  description: string;
  visual: ReactNode;
};

function MiniCalendar() {
  const rows = [
    { time: "09:00", client: "שרה לוי", color: "bg-service-1" },
    { time: "10:30", client: "מיכל כהן", color: "bg-service-2" },
    { time: "12:00", client: "דוד לוי", color: "bg-service-3" },
    { time: "14:00", client: "אמה ישראלי", color: "bg-service-4" },
  ];
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center gap-1 rounded-lg border border-border p-1 text-xs">
        <span className="rounded-md bg-primary/10 px-2.5 py-1 font-medium text-primary">יום</span>
        <span className="px-2.5 py-1 text-muted-foreground">שבוע</span>
        <span className="px-2.5 py-1 text-muted-foreground">חודש</span>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.time} className="flex items-center gap-2.5 rounded-lg bg-background px-2.5 py-2">
            <span className={`h-6 w-1 rounded-full ${row.color}`} />
            <span dir="ltr" className="text-xs text-muted-foreground">
              {row.time}
            </span>
            <span className="text-sm font-medium text-foreground">{row.client}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniClients() {
  const clients = [
    { name: "שרה לוי", tag: "VIP", phone: "050-1234567" },
    { name: "דוד לוי", tag: "חדש", phone: "052-9876543" },
    { name: "מיכל כהן", tag: "קבוע", phone: "054-5551234" },
  ];
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-card">
      <p className="mb-4 text-sm font-semibold text-foreground">לקוחות</p>
      <div className="flex flex-col gap-3">
        {clients.map((client) => (
          <div key={client.name} className="flex items-center gap-3 rounded-lg bg-background px-3 py-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              {client.name[0]}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium text-foreground">{client.name}</span>
                <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {client.tag}
                </span>
              </div>
              <span dir="ltr" className="text-end text-xs text-muted-foreground">
                {client.phone}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniReports() {
  const bars = [
    { label: "1", height: 40, color: "bg-chart-1" },
    { label: "2", height: 62, color: "bg-chart-2" },
    { label: "3", height: 50, color: "bg-chart-3" },
    { label: "4", height: 78, color: "bg-chart-4" },
    { label: "5", height: 68, color: "bg-chart-5" },
  ];
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-card">
      <p className="text-sm font-semibold text-foreground">הכנסות שבועיות</p>
      <p dir="ltr" className="mt-1 text-2xl font-bold text-foreground">
        ₪30,200 <span className="text-sm font-medium text-success">+2.1%</span>
      </p>
      <div className="mt-5 flex h-28 items-end gap-3">
        {bars.map((bar) => (
          <span
            key={bar.label}
            className={`flex-1 rounded-t-md ${bar.color}`}
            style={{ height: `${bar.height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function MiniNotifications() {
  const items = [
    { icon: UserPlus, title: "תור חדש נקבע", time: "לפני 12 דקות" },
    { icon: Calendar, title: "תזכורת פגישה", time: "לפני 40 דקות" },
    { icon: XCircle, title: "תור בוטל", time: "אתמול" },
  ];
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <Bell className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold text-foreground">התראות</p>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-center gap-3 rounded-lg bg-background px-3 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const STORY_SCENES: StoryScene[] = [
  {
    id: "calendar",
    title: "רואים את כל השבוע במבט אחד",
    description: "מעבר חלק בין יום, שבוע וחודש — התורים תמיד מסודרים ותמיד ברורים.",
    visual: <MiniCalendar />,
  },
  {
    id: "clients",
    title: "כל לקוח, כל הסיפור",
    description: "תגיות, פרטי קשר והיסטוריית ביקורים — במקום אחד, בלי לחפש בוואטסאפ.",
    visual: <MiniClients />,
  },
  {
    id: "reports",
    title: "המספרים האמיתיים של העסק",
    description: "הכנסות, תפוסת צוות ושיעורי ביטולים שמתעדכנים לפי מה שקורה ביומן בפועל.",
    visual: <MiniReports />,
  },
  {
    id: "notifications",
    title: "תמיד יודעים מה קורה",
    description: "תור חדש, תזכורת או ביטול — מגיע אליכם ברגע שזה קורה.",
    visual: <MiniNotifications />,
  },
];
