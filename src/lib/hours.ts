import { clinicConfig } from "../clinic-config";

const { schedule, timeZone } = clinicConfig.hours;

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

const abbr = (day: string) => day.slice(0, 3);

/** Groups consecutive days that share the same hours, e.g. "Mon – Fri". */
export function groupedHours(): { label: string; hours: string }[] {
  const groups: { start: string; end: string; hours: string }[] = [];
  for (const entry of schedule) {
    const hours =
      entry.open && entry.close ? `${formatTime(entry.open)} – ${formatTime(entry.close)}` : "Closed";
    const last = groups[groups.length - 1];
    if (last && last.hours === hours) last.end = entry.day;
    else groups.push({ start: entry.day, end: entry.day, hours });
  }
  return groups.map((g) => ({
    label: g.start === g.end ? g.start : `${abbr(g.start)} – ${abbr(g.end)}`,
    hours: g.hours,
  }));
}

export function hoursSummary(): string {
  const first = groupedHours().find((g) => g.hours !== "Closed");
  return first ? `${first.label}: ${first.hours}` : "See opening hours";
}

function clinicNow(date: Date): { day: string; minutes: number } {
  let tz: string | undefined = timeZone;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
  } catch {
    tz = undefined;
  }
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return { day: get("weekday"), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export interface OpenStatus {
  isOpen: boolean;
  label: string;
}

export function getOpenStatus(date: Date = new Date()): OpenStatus {
  const { day, minutes } = clinicNow(date);
  const todayIndex = schedule.findIndex((s) => s.day === day);
  const today = schedule[todayIndex];

  if (today?.open && today.close) {
    if (minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
      return { isOpen: true, label: `Open now · Closes ${formatTime(today.close)}` };
    }
    if (minutes < toMinutes(today.open)) {
      return { isOpen: false, label: `Closed · Opens today at ${formatTime(today.open)}` };
    }
  }
  for (let i = 1; i <= 7; i++) {
    const next = schedule[(todayIndex + i) % schedule.length];
    if (next?.open) {
      const when = i === 1 ? "tomorrow" : next.day;
      return { isOpen: false, label: `Closed · Opens ${when} at ${formatTime(next.open)}` };
    }
  }
  return { isOpen: false, label: "Closed" };
}

/** Parses "YYYY-MM-DD" as a local date (avoids UTC off-by-one). */
export function parseLocalDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
}

export function todayISO(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
}

/** Returns bookable time slots for a date, or null if the clinic is closed that day. */
export function getSlotsForDate(dateValue: string): string[] | null {
  const date = parseLocalDate(dateValue);
  if (!date) return [];
  const entry = schedule.find((s) => s.day === DAY_NAMES[date.getDay()]);
  if (!entry?.open || !entry.close) return null;
  const step = clinicConfig.booking.slotMinutes;
  const slots: string[] = [];
  for (let t = toMinutes(entry.open); t + step <= toMinutes(entry.close); t += step) {
    slots.push(formatTime(`${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`));
  }
  return slots;
}

export function dayNameForDate(dateValue: string): string {
  const date = parseLocalDate(dateValue);
  return date ? DAY_NAMES[date.getDay()] : "";
}
