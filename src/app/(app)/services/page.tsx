import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { services } from "@/lib/mock-schedule";
import { SERVICE_BG } from "@/lib/appointment-styles";

export default function ServicesPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <TopBar title="שירותים" subtitle={`${services.length} שירותים פעילים`} />

      <div className="grid grid-cols-1 gap-4 px-4 pb-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {services.map((service) => (
          <Card key={service.name} className="flex flex-col gap-3">
            <div className="flex">
              <span
                className={`h-1.5 w-10 rounded-full ${SERVICE_BG[service.color]}`}
              />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {service.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {service.durationMinutes} דקות
              </span>
              <span dir="ltr" className="text-lg font-bold text-foreground">
                ₪{service.price}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
