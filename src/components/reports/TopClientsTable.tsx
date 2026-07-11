import { topClients } from "@/lib/mock-reports";

export function TopClientsTable() {
  return (
    <table className="w-full text-sm">
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
  );
}
