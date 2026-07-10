import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";

type ServiceColor = "service-1" | "service-2" | "service-3" | "service-4" | "service-5";

const SERVICE_BG: Record<ServiceColor, string> = {
  "service-1": "bg-service-1",
  "service-2": "bg-service-2",
  "service-3": "bg-service-3",
  "service-4": "bg-service-4",
  "service-5": "bg-service-5",
};

type ServiceItem = {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  colorToken: ServiceColor;
};

const services: ServiceItem[] = [
  { id: "1", name: "תספורת", durationMinutes: 45, price: 120, colorToken: "service-1" },
  { id: "2", name: "ייעוץ", durationMinutes: 45, price: 80, colorToken: "service-3" },
  { id: "3", name: "קיצוץ זקן", durationMinutes: 30, price: 60, colorToken: "service-2" },
  { id: "4", name: "צביעה", durationMinutes: 60, price: 220, colorToken: "service-4" },
  { id: "5", name: "עיסוי", durationMinutes: 45, price: 180, colorToken: "service-5" },
];

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="שירותים" subtitle={`${services.length} שירותים פעילים`} />

      <div className="grid grid-cols-3 gap-4 px-8 pb-8">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col gap-3">
            <div className="flex">
              <span
                className={`h-1.5 w-10 rounded-full ${SERVICE_BG[service.colorToken]}`}
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
