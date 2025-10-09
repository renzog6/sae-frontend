// filepath: sae-frontend/lib/constants.ts

import {
  Gender,
  MaritalStatus,
  EmployeeStatus,
  PersonStatus,
  VacationType,
} from "@/types/employee";

export const genderLabels: Record<Gender, string> = {
  [Gender.MALE]: "Masculino",
  [Gender.FEMALE]: "Femenino",
  [Gender.OTHER]: "Otro",
} as const;

export const maritalLabels: Record<MaritalStatus, string> = {
  [MaritalStatus.SINGLE]: "Soltero/a",
  [MaritalStatus.MARRIED]: "Casado/a",
  [MaritalStatus.DIVORCED]: "Divorciado/a",
  [MaritalStatus.WIDOWED]: "Viudo/a",
} as const;

export const employeeStatusLabels: Record<EmployeeStatus, string> = {
  [EmployeeStatus.ACTIVE]: "Activo",
  [EmployeeStatus.SUSPENDED]: "Suspendido",
  [EmployeeStatus.TERMINATED]: "Terminado",
} as const;

export const personStatusLabels: Record<PersonStatus, string> = {
  [PersonStatus.ACTIVE]: "Activo",
  [PersonStatus.INACTIVE]: "Inactivo",
} as const;

export const vacationTypeLabels: Record<VacationType, string> = {
  [VacationType.ASSIGNED]: "Asignadas",
  [VacationType.TAKEN]: "Tomadas",
} as const;
