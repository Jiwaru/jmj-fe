const LOCALE = "id-ID";
const TIME_ZONE = "Asia/Jakarta";

export function formatTanggal(date: Date) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function formatJamWIB(date: Date) {
  return (
    new Intl.DateTimeFormat(LOCALE, {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: TIME_ZONE,
    }).format(date) + " WIB"
  );
}

export function formatTanggalJamWIB(date: Date) {
  return (
    new Intl.DateTimeFormat(LOCALE, {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: TIME_ZONE,
    }).format(date) + " WIB"
  );
}
