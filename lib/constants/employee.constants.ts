import { EmployeeStatus, VacationType } from "@/lib/types/enums";

export const employeeStatusLabels: Record<EmployeeStatus, string> = {
  [EmployeeStatus.ACTIVE]: "Activo",
  [EmployeeStatus.SUSPENDED]: "Suspendido",
  [EmployeeStatus.TERMINATED]: "Terminado",
} as const;

export const vacationTypeLabels: Record<VacationType, string> = {
  [VacationType.ASSIGNED]: "Asignadas",
  [VacationType.TAKEN]: "Tomadas",
} as const;
