import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";

const businessFields = [
  { label: "שם העסק", value: "LYNKO ייעוץ עסקי" },
  { label: "טלפון", value: "03-1234567" },
  { label: "כתובת", value: "רוטשילד 1, תל אביב" },
];

export default function SettingsPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <TopBar title="הגדרות" subtitle="פרטי העסק ושעות פעילות" />

      <div className="flex flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
        <Card className="flex flex-col gap-5">
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              פרטי עסק
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              המידע הזה יוצג ללקוחות בעמוד ההזמנה העצמאית.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {businessFields.map((field) => (
              <label key={field.label} className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">
                  {field.label}
                </span>
                <input
                  type="text"
                  defaultValue={field.value}
                  disabled
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground disabled:cursor-not-allowed"
                />
              </label>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            עריכת פרטים תתאפשר לאחר חיבור המערכת לבסיס נתונים.
          </p>
        </Card>
      </div>
    </main>
  );
}
