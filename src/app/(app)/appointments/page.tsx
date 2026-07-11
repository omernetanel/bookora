import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { StatusBadge, type AppointmentStatus } from "@/components/ui/StatusBadge";

type AppointmentRow = {
  id: string;
  clientName: string;
  serviceName: string;
  staffName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
};

const appointments: AppointmentRow[] = [
  { id: "1", clientName: "שרה לוי", serviceName: "ייעוץ ראשוני", staffName: "אור כהן", date: "14 במאי", time: "09:00", status: "confirmed" },
  { id: "2", clientName: "מיכל כהן", serviceName: "עריכת חוזה", staffName: "מיכל לוי", date: "14 במאי", time: "10:00", status: "confirmed" },
  { id: "3", clientName: "דוד לוי", serviceName: "ייעוץ מס", staffName: "אור כהן", date: "14 במאי", time: "11:00", status: "pending" },
  { id: "4", clientName: "אמה ישראלי", serviceName: "בדיקת נאותות", staffName: "דניאל אברהם", date: "14 במאי", time: "12:00", status: "confirmed" },
  { id: "5", clientName: "אולגה פרץ", serviceName: "ייעוץ ראשוני", staffName: "מיכל לוי", date: "14 במאי", time: "14:00", status: "cancelled" },
  { id: "6", clientName: "יוסי מזרחי", serviceName: "ליווי משפטי", staffName: "דניאל אברהם", date: "14 במאי", time: "10:30", status: "completed" },
  { id: "7", clientName: "רותם שגיא", serviceName: "ייעוץ ראשוני", staffName: "אור כהן", date: "15 במאי", time: "09:30", status: "confirmed" },
  { id: "8", clientName: "נועה בר", serviceName: "עריכת חוזה", staffName: "מיכל לוי", date: "15 במאי", time: "11:00", status: "pending" },
];

export default function AppointmentsPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <TopBar title="תורים" subtitle="כל התורים הקרובים במקום אחד" />

      <div className="flex flex-col gap-6 px-8 pb-8">
        <Card className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-6 py-4 font-medium">לקוח</th>
                <th className="px-6 py-4 font-medium">שירות</th>
                <th className="px-6 py-4 font-medium">איש צוות</th>
                <th className="px-6 py-4 font-medium">תאריך</th>
                <th className="px-6 py-4 font-medium">שעה</th>
                <th className="px-6 py-4 font-medium">סטטוס</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="text-foreground">
                  <td className="px-6 py-4 font-medium">{appointment.clientName}</td>
                  <td className="px-6 py-4 text-muted-foreground">{appointment.serviceName}</td>
                  <td className="px-6 py-4 text-muted-foreground">{appointment.staffName}</td>
                  <td className="px-6 py-4 text-muted-foreground">{appointment.date}</td>
                  <td dir="ltr" className="px-6 py-4 text-end text-muted-foreground">
                    {appointment.time}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={appointment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </main>
  );
}
