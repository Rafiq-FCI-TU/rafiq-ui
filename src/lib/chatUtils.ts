import { format, isToday, isYesterday, isSameWeek, isSameYear } from "date-fns";
export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const timeStr = format(date, "h:mm a");
  const now = new Date();
  now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
  if (isToday(date)) {
    return timeStr;
  }

  if (isYesterday(date)) {
    return `Yesterday ${timeStr}`;
  }

  if (isSameWeek(date, now)) {
    return format(date, "EEEE h:mm a");
  }

  if (isSameYear(date, now)) {
    return format(date, "MMM d h:mm a");
  }

  return format(date, "MMM d, yyyy h:mm a");
}
