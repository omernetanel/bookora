// Static Tailwind class lookups for placing time-based items on a CSS grid.
// These must exist as literal strings (not template-built) so Tailwind's
// build-time scanner can find and generate them.

export const GRID_ROW_START = [
  "row-start-1", "row-start-2", "row-start-3", "row-start-4", "row-start-5",
  "row-start-6", "row-start-7", "row-start-8", "row-start-9", "row-start-10",
  "row-start-11", "row-start-12", "row-start-13", "row-start-14", "row-start-15",
  "row-start-16", "row-start-17", "row-start-18", "row-start-19", "row-start-20",
  "row-start-21", "row-start-22", "row-start-23", "row-start-24", "row-start-25",
  "row-start-26", "row-start-27", "row-start-28", "row-start-29", "row-start-30",
  "row-start-31", "row-start-32",
] as const;

export const GRID_ROW_SPAN = [
  "row-span-1", "row-span-2", "row-span-3", "row-span-4", "row-span-5",
  "row-span-6", "row-span-7", "row-span-8", "row-span-9", "row-span-10",
  "row-span-11", "row-span-12", "row-span-13", "row-span-14", "row-span-15",
  "row-span-16", "row-span-17", "row-span-18", "row-span-19", "row-span-20",
  "row-span-21", "row-span-22", "row-span-23", "row-span-24", "row-span-25",
  "row-span-26", "row-span-27", "row-span-28", "row-span-29", "row-span-30",
  "row-span-31", "row-span-32",
] as const;

export const QUARTERS_PER_HOUR = 4;

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** 1-indexed grid row where a time slot starts, relative to `rangeStartHour`. */
export function timeToRowStart(time: string, rangeStartHour: number): number {
  const minutesFromRangeStart = timeToMinutes(time) - rangeStartHour * 60;
  return Math.floor(minutesFromRangeStart / 15) + 1;
}

/** Number of 15-minute grid rows an appointment spans. */
export function durationToRowSpan(start: string, end: string): number {
  return Math.max(1, Math.round((timeToMinutes(end) - timeToMinutes(start)) / 15));
}
