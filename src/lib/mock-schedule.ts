import { mulberry32 } from "./seeded-random";

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
  avatarUrl: string;
  workingDays: string;
  workingHours: string;
};

export const staffMembers: StaffMember[] = [
  { id: "s1", name: "אור כהן", role: "עו״ד בכיר", avatarUrl: "/oruser.png", workingDays: "א׳–ה׳", workingHours: "09:00–17:00" },
  { id: "s2", name: "מיכל לוי", role: "יועצת עסקית", avatarUrl: "/michaluser.png", workingDays: "א׳–ד׳", workingHours: "10:00–18:00" },
  { id: "s3", name: "דניאל אברהם", role: "רואה חשבון", avatarUrl: "/danieluser.png", workingDays: "ב׳–ו׳", workingHours: "09:00–15:00" },
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

// The calendar's single hand-authored day — every other date is generated
// on the fly (see getAppointmentsForDate) so day navigation has something
// to show without needing a real backend.
export const REFERENCE_DATE = new Date(2026, 4, 14);

export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function isSameDate(a: Date, b: Date): boolean {
  return dateKey(a) === dateKey(b);
}

const HEBREW_MONTHS_WITH_PREFIX = [
  "בינואר", "בפברואר", "במרץ", "באפריל", "במאי", "ביוני",
  "ביולי", "באוגוסט", "בספטמבר", "באוקטובר", "בנובמבר", "בדצמבר",
];

const HEBREW_MONTHS = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
  "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
];

export const HEBREW_WEEKDAY_SHORT = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

export function formatHebrewDate(date: Date): string {
  return `${date.getDate()} ${HEBREW_MONTHS_WITH_PREFIX[date.getMonth()]}, ${date.getFullYear()}`;
}

/** Sunday-based start of the week containing `date`. */
export function startOfWeek(date: Date): Date {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return start;
}

export function formatHebrewWeekRange(weekStart: Date): string {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const startLabel = `${weekStart.getDate()} ${HEBREW_MONTHS[weekStart.getMonth()]}`;
  const endLabel = `${weekEnd.getDate()} ${HEBREW_MONTHS[weekEnd.getMonth()]}`;
  return `${startLabel} – ${endLabel}, ${weekEnd.getFullYear()}`;
}

const DEMO_CLIENT_POOL = [
  "שרה לוי", "מיכל כהן", "דוד לוי", "אמה ישראלי", "אולגה פרץ", "יוסי מזרחי",
  "רונית אבני", "עומר שגיא", "נועה פישר", "אליהו בר", "תמר גולן", "איתי שני",
];

// Weighted so most generated appointments read as routine, not exceptional.
const DEMO_STATUS_POOL: AppointmentStatus[] = [
  "confirmed", "confirmed", "confirmed", "pending", "completed", "cancelled",
];

/** Deterministic per-date appointment list — same date always yields the
 * same result (no Math.random()/Date.now(), see CLAUDE.md "Lessons
 * learned"), so the demo calendar has plausible data on any day a visitor
 * navigates to without a real backend. Closed Saturdays and short Fridays
 * mirror a typical Israeli business week. */
export function getAppointmentsForDate(date: Date): DayAppointment[] {
  // Chronological order matters beyond the grid-positioned day view (e.g.
  // WeekView stacks a day's appointments top-to-bottom), so every branch
  // returns sorted — not just the generated ones.
  if (isSameDate(date, REFERENCE_DATE)) {
    return [...initialAppointments].sort(
      (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start),
    );
  }

  const weekday = date.getDay(); // 0 = Sunday … 6 = Saturday
  if (weekday === 6) return [];

  const isFriday = weekday === 5;
  const dayEndHour = isFriday ? 13 : 17;
  const dayStartMinutes = 9 * 60;
  const dayEndMinutes = dayEndHour * 60;

  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const random = mulberry32(seed);
  const appointmentCount = isFriday
    ? Math.round(1 + random() * 2)
    : Math.round(2 + random() * 5);

  const appointments: DayAppointment[] = [];

  for (let i = 0; i < appointmentCount; i++) {
    const staff = staffMembers[Math.floor(random() * staffMembers.length)];
    const service = services[Math.floor(random() * services.length)];

    const latestStart = dayEndMinutes - service.durationMinutes;
    if (latestStart <= dayStartMinutes) continue;

    const quarterSteps = Math.floor((latestStart - dayStartMinutes) / 15) + 1;
    const startMinutes = dayStartMinutes + Math.floor(random() * quarterSteps) * 15;
    const start = `${String(Math.floor(startMinutes / 60)).padStart(2, "0")}:${String(startMinutes % 60).padStart(2, "0")}`;
    const end = addMinutesToTime(start, service.durationMinutes);
    const endMinutes = timeToMinutes(end);

    // Unlike findConflict (used for real bookings, where a cancelled slot is
    // meant to free up), the generator must never place two cards in the
    // same visual cell — a cancelled appointment still occupies grid space.
    const overlapsExisting = appointments.some(
      (existing) =>
        existing.staffId === staff.id &&
        startMinutes < timeToMinutes(existing.end) &&
        timeToMinutes(existing.start) < endMinutes,
    );
    if (overlapsExisting) continue;

    appointments.push({
      id: `${dateKey(date)}-${i}`,
      clientName: DEMO_CLIENT_POOL[Math.floor(random() * DEMO_CLIENT_POOL.length)],
      serviceName: service.name,
      start,
      end,
      color: service.color,
      staffId: staff.id,
      status: DEMO_STATUS_POOL[Math.floor(random() * DEMO_STATUS_POOL.length)],
    });
  }

  return appointments.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
}
