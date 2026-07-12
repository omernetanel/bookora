import type { AppointmentStatus, ServiceColor } from "./mock-schedule";

export const SERVICE_BG: Record<ServiceColor, string> = {
  "service-1": "bg-service-1",
  "service-2": "bg-service-2",
  "service-3": "bg-service-3",
  "service-4": "bg-service-4",
  "service-5": "bg-service-5",
};

export const STATUS_CLASSES: Record<AppointmentStatus, string> = {
  confirmed: "",
  pending: "border-2 border-dashed border-foreground/40 opacity-80",
  cancelled: "opacity-35 grayscale",
  completed: "",
};
