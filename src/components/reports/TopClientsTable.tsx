import { topClients } from "@/lib/mock-reports";

export function TopClientsTable() {
  return (
    <>
      <table className="hidden w-full text-sm lg:table">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pb-3 text-start text-xs font-medium">לקוח</th>
            <th className="pb-3 text-start text-xs font-medium">ביקורים</th>
            <th className="pb-3 text-start text-xs font-medium">סה״כ הוצאה</th>
          </tr>
        </thead>
        <tbody>
          {topClients.map((client, index) => (
            <tr
              key={client.name}
              className={index !== topClients.length - 1 ? "border-b border-border/60" : undefined}
            >
              <td className="py-3 font-medium text-foreground">{client.name}</td>
              <td className="py-3 text-muted-foreground">
                <span dir="ltr">{client.visits}</span>
              </td>
              <td className="py-3">
                <span dir="ltr" className="font-medium text-foreground">
                  ₪{client.totalSpent.toLocaleString("en-US")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col divide-y divide-border/60 lg:hidden">
        {topClients.map((client) => (
          <div key={client.name} className="flex items-center justify-between gap-2 py-3">
            <span className="font-medium text-foreground">{client.name}</span>
            <div className="flex items-center gap-3 text-sm">
              <span dir="ltr" className="text-muted-foreground">
                {client.visits} ביקורים
              </span>
              <span dir="ltr" className="font-medium text-foreground">
                ₪{client.totalSpent.toLocaleString("en-US")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
