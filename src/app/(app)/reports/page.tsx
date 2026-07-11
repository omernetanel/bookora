import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatCardGrid } from "@/components/dashboard/StatCardGrid";
import { RevenueTrendChart } from "@/components/reports/RevenueTrendChart";
import { ServiceBreakdownChart } from "@/components/reports/ServiceBreakdownChart";
import { StaffUtilizationChart } from "@/components/reports/StaffUtilizationChart";
import { BusyHeatmap } from "@/components/reports/BusyHeatmap";
import { TopClientsTable } from "@/components/reports/TopClientsTable";
import { reportKpis } from "@/lib/mock-reports";

export default function ReportsPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <TopBar title="דוחות" subtitle="ביצועים, הכנסות ותפוסה לאורך זמן" />

      <div className="flex flex-col gap-6 px-8 pb-8">
        <StatCardGrid>
          <StatCard label="הכנסות החודש" value={reportKpis.monthlyRevenue} prefix="₪" />
          <StatCard label="תורים החודש" value={reportKpis.monthlyAppointments} />
          <StatCard label="לקוחות חדשים" value={reportKpis.newClients} />
          <StatCard label="תפוסה ממוצעת" value={reportKpis.avgUtilization} suffix="%" />
        </StatCardGrid>

        <div className="grid grid-cols-2 gap-6">
          <Card className="flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                הכנסות שבועיות
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">8 השבועות האחרונים</p>
            </div>
            <RevenueTrendChart />
          </Card>

          <Card className="flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                הכנסות לפי שירות
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">החודש הנוכחי</p>
            </div>
            <ServiceBreakdownChart />
          </Card>

          <Card className="flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">תפוסת צוות</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                אחוז זמן תפוס מתוך שעות עבודה
              </p>
            </div>
            <StaffUtilizationChart />
          </Card>

          <Card className="flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">שעות עומס</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                התפלגות תורים לפי יום ושעה
              </p>
            </div>
            <BusyHeatmap />
          </Card>
        </div>

        <Card className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              לקוחות מובילים
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">לפי סך הוצאה מצטברת</p>
          </div>
          <TopClientsTable />
        </Card>
      </div>
    </main>
  );
}
