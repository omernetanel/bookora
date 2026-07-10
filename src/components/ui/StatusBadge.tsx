export type AppointmentStatus = "confirmed" | "pending" | "cancelled" | "completed";

const STATUS_LABEL: Record<AppointmentStatus, string> = {
  confirmed: "מאושר",
  pending: "ממתין",
  cancelled: "בוטל",
  completed: "הושלם",
};

const STATUS_CLASSES: Record<AppointmentStatus, string> = {
  confirmed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  cancelled: "bg-destructive/10 text-destructive",
  completed: "bg-border text-muted-foreground",
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CLASSES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
