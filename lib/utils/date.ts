// filepath: sae-frontend/lib/utils/date.ts

// Utility function for date formatting and tenure calculation
export function formatTenure(hireDateISO?: string): string {
  if (!hireDateISO) return "-";

  const start = new Date(hireDateISO);
  if (isNaN(start.getTime())) return "-";

  const now = new Date();

  let totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  // Ajuste si el día actual es menor que el día de ingreso
  if (now.getDate() < start.getDate()) totalMonths--;

  // Nunca devolver valores negativos
  totalMonths = Math.max(totalMonths, 0);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Returns "Y,M" e.g., "4,5" for 4 years and 5 months
  return `${years},${months}`;
}

// Format an date string to a localized date string, or return "-" if invalid
export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "-";

  // Si viene en formato "YYYY-MM-DD", devolver directo
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr.split("-").reverse().join("/"); // "DD/MM/YYYY"
  }

  // For ISO strings like "2025-10-09T00:00:00.000Z", parse as local date to avoid timezone shift
  let d: Date;
  if (dateStr.includes("T")) {
    // Extract date part and create local date
    const datePart = dateStr.split("T")[0];
    const [year, month, day] = datePart.split("-").map(Number);
    d = new Date(year, month - 1, day); // month is 0-based
  } else {
    d = new Date(dateStr);
  }

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
// Calculate age from birth date ISO string, or return "-" if invalid
export function calcAge(birthDateISO?: string | null): number | string {
  if (!birthDateISO) return "-";

  const birth = new Date(birthDateISO);
  if (isNaN(birth.getTime())) return "-";

  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();

  // Si el mes aún no llegó o es el mismo pero el día aún no llegó → restar un año
  const hasBirthdayPassed =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());

  if (!hasBirthdayPassed) age--;

  return Math.max(age, 0); // nunca negativo
}
