import { Gender, MaritalStatus, PersonStatus } from "@/lib/types/shared/enums";

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

export const personStatusLabels: Record<PersonStatus, string> = {
  [PersonStatus.ACTIVE]: "Activo",
  [PersonStatus.INACTIVE]: "Inactivo",
} as const;
