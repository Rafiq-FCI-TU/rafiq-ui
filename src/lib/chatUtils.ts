import { format, isToday, isYesterday, parseISO } from "date-fns";
export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function formatMessageTime(dateStr: string): string {
  const date = parseISO(dateStr);
  const now = new Date();
  if (isToday(date)) {
    return format(date, "h:mm a");
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  if (date.getFullYear() !== now.getFullYear()) {
    return format(date, "MMM d, yyyy");
  }
  return format(date, "MMM d");
}
