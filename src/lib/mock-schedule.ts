export type ServiceColor =
  | "service-1"
  | "service-2"
  | "service-3"
  | "service-4"
  | "service-5";

export type AppointmentStatus = "confirmed" | "pending" | "cancelled" | "completed";

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  workingDays: string;
  workingHours: string;
};

export const staffMembers: StaffMember[] = [
  { id: "s1", name: "אור כהן", role: "עו״ד בכיר", workingDays: "א׳–ה׳", workingHours: "09:00–17:00" },
  { id: "s2", name: "מיכל לוי", role: "יועצת עסקית", workingDays: "א׳–ד׳", workingHours: "10:00–18:00" },
  { id: "s3", name: "דניאל אברהם", role: "רואה חשבון", workingDays: "ב׳–ו׳", workingHours: "09:00–15:00" },
];

export type ServiceDefinition = {
  name: string;
  durationMinutes: number;
  price: number;
  color: ServiceColor;
};

export const services: ServiceDefinition[] = [
  { name: "ייעוץ ראשוני", durationMinutes: 45, price: 350, color: "service-1" },
  { name: "עריכת חוזה", durationMinutes: 45, price: 650, color: "service-3" },
  { name: "ייעוץ מס", durationMinutes: 30, price: 450, color: "service-2" },
  { name: "בדיקת נאותות", durationMinutes: 60, price: 800, color: "service-4" },
  { name: "ליווי משפטי", durationMinutes: 45, price: 500, color: "service-5" },
];

export type DayAppointment = {
  id: string;
  clientName: string;
  serviceName: string;
  start: string;
  end: string;
  color: ServiceColor;
  staffId: string;
  status: AppointmentStatus;
};

export const initialAppointments: DayAppointment[] = [
  { id: "1", clientName: "שרה לוי", serviceName: "ייעוץ ראשוני", start: "09:00", end: "09:45", color: "service-1", staffId: "s1", status: "confirmed" },
  { id: "2", clientName: "מיכל כהן", serviceName: "עריכת חוזה", start: "10:00", end: "10:45", color: "service-3", staffId: "s2", status: "confirmed" },
  { id: "3", clientName: "דוד לוי", serviceName: "ייעוץ מס", start: "11:00", end: "11:30", color: "service-2", staffId: "s1", status: "pending" },
  { id: "4", clientName: "אמה ישראלי", serviceName: "בדיקת נאותות", start: "12:00", end: "13:00", color: "service-4", staffId: "s3", status: "confirmed" },
  { id: "5", clientName: "אולגה פרץ", serviceName: "ייעוץ ראשוני", start: "14:00", end: "14:45", color: "service-1", staffId: "s2", status: "cancelled" },
  { id: "6", clientName: "יוסי מזרחי", serviceName: "ליווי משפטי", start: "10:30", end: "11:15", color: "service-5", staffId: "s3", status: "completed" },
];

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function addMinutesToTime(time: string, minutesToAdd: number): string {
  const totalMinutes = timeToMinutes(time) + minutesToAdd;
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** Finds an existing appointment for the same staff member that overlaps
 * the given time range, ignoring cancelled appointments and the
 * appointment currently being edited (if any). */
export function findConflict(
  appointments: DayAppointment[],
  staffId: string,
  start: string,
  end: string,
  excludeId?: string,
): DayAppointment | null {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  return (
    appointments.find((appointment) => {
      if (appointment.id === excludeId) return false;
      if (appointment.staffId !== staffId) return false;
      if (appointment.status === "cancelled") return false;

      const existingStart = timeToMinutes(appointment.start);
      const existingEnd = timeToMinutes(appointment.end);
      return startMinutes < existingEnd && existingStart < endMinutes;
    }) ?? null
  );
}
