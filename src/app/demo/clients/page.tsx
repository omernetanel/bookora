import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";

type ClientRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  tags: string[];
  lastVisit: string;
};

const clients: ClientRow[] = [
  { id: "1", name: "שרה לוי", phone: "050-1234567", email: "sarah.levi@example.com", tags: ["VIP"], lastVisit: "14 במאי, 2026" },
  { id: "2", name: "מיכל כהן", phone: "052-2345678", email: "michal.cohen@example.com", tags: ["חדש"], lastVisit: "14 במאי, 2026" },
  { id: "3", name: "דוד לוי", phone: "054-3456789", email: "david.levi@example.com", tags: [], lastVisit: "14 במאי, 2026" },
  { id: "4", name: "אמה ישראלי", phone: "053-4567890", email: "emma.israeli@example.com", tags: ["VIP"], lastVisit: "14 במאי, 2026" },
  { id: "5", name: "אולגה פרץ", phone: "050-5678901", email: "olga.peretz@example.com", tags: [], lastVisit: "10 במאי, 2026" },
  { id: "6", name: "יוסי מזרחי", phone: "052-6789012", email: "yossi.mizrahi@example.com", tags: [], lastVisit: "14 במאי, 2026" },
];

export default function ClientsPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <TopBar title="לקוחות" subtitle={`${clients.length} לקוחות רשומים`} />

      <div className="flex flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
        <Card className="p-0">
          <table className="hidden w-full text-sm lg:table">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-6 py-4 font-medium">שם</th>
                <th className="px-6 py-4 font-medium">טלפון</th>
                <th className="px-6 py-4 font-medium">אימייל</th>
                <th className="px-6 py-4 font-medium">תגיות</th>
                <th className="px-6 py-4 font-medium">ביקור אחרון</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((client) => (
                <tr key={client.id} className="text-foreground">
                  <td className="px-6 py-4 font-medium">{client.name}</td>
                  <td dir="ltr" className="px-6 py-4 text-end text-muted-foreground">
                    {client.phone}
                  </td>
                  <td dir="ltr" className="px-6 py-4 text-end text-muted-foreground">
                    {client.email}
                  </td>
                  <td className="px-6 py-4">
                    {client.tags.length > 0 ? (
                      <div className="flex gap-1.5">
                        {client.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-border px-2.5 py-1 text-xs font-medium text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{client.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col divide-y divide-border lg:hidden">
            {clients.map((client) => (
              <div key={client.id} className="flex flex-col gap-1.5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-foreground">{client.name}</span>
                  {client.tags.length > 0 ? (
                    <div className="flex gap-1.5">
                      {client.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-border px-2.5 py-1 text-xs font-medium text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <span dir="ltr" className="text-end text-sm text-muted-foreground">
                  {client.phone}
                </span>
                <span dir="ltr" className="text-end text-sm text-muted-foreground">
                  {client.email}
                </span>
                <span className="text-xs text-muted-foreground">
                  ביקור אחרון: {client.lastVisit}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
