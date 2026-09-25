import { format, parseISO } from "date-fns";

export function minutesFromHm(hm: string): number {
  const [h, m] = hm.split(":").map((n) => Number(n));
  return (h ?? 0) * 60 + (m ?? 0);
}

export function hmFromMinutes(total: number): string {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function slotCount(startTime: string, endTime: string, slotMinutes: number): number {
  const span = minutesFromHm(endTime) - minutesFromHm(startTime);
  if (slotMinutes <= 0 || span <= 0) return 0;
  return Math.floor(span / slotMinutes);
}

export function slotStartMinutes(
  startTime: string,
  slotMinutes: number,
  slotIndex: number,
): number {
  return minutesFromHm(startTime) + slotIndex * slotMinutes;
}

export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  const d = new Date(2000, 0, 1, h, m);
  return format(d, "h:mm a");
}

export function slotLabel(startTime: string, slotMinutes: number, slotIndex: number): string {
  return formatMinutes(slotStartMinutes(startTime, slotMinutes, slotIndex));
}

export function slotRangeLabel(
  startTime: string,
  slotMinutes: number,
  slotIndex: number,
): string {
  const start = slotStartMinutes(startTime, slotMinutes, slotIndex);
  return `${formatMinutes(start)}–${formatMinutes(start + slotMinutes)}`;
}

export function formatNightDate(isoDate: string): string {
  try {
    return format(parseISO(isoDate), "EEEE, MMMM d, yyyy");
  } catch {
    return isoDate;
  }
}

export function formatNightDateShort(isoDate: string): string {
  try {
    return format(parseISO(isoDate), "MMM d");
  } catch {
    return isoDate;
  }
}

export function idleBetweenSlots(
  a: number,
  b: number,
  slotMinutes: number,
): number {
  const [lo, hi] = a < b ? [a, b] : [b, a];
  return Math.max(0, hi - lo - 1) * slotMinutes;
}

export function familyChipIndex(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 33 + id.charCodeAt(i)) | 0;
  return Math.abs(h) % 8;
}
