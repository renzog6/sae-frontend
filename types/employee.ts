// filepath: sae-frontend/types/employee.ts

// Only Employee + Person domain and their direct employee relations.
// Avoid duplicating shared types like Company, Address, Contacts.
// If you already have those, import them where you need them.

// Import shared types
import { Company } from "./company";
import { Address } from "./location";
import { ContactLink } from "./contact";
import { Document } from "./document";
import { Inspection } from "./shared";
import { EmployeeIncident } from "./history";

// Re-export enums for backward compatibility
export {
  EmployeeStatus,
  Gender,
  MaritalStatus,
  PersonStatus,
  VacationType,
} from "./enums";

// Import enums from shared location
import {
  EmployeeStatus,
  Gender,
  MaritalStatus,
  PersonStatus,
  VacationType,
} from "./enums";

// ===== Person (only core + links as optional/unknown to avoid duplication) =====
export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate?: string | null; // ISO
  dni?: string | null;
  cuil?: string | null;
  gender?: Gender | null;
  maritalStatus?: MaritalStatus | null;
  information?: string | null;
  status?: PersonStatus | null;

  // Relations
  address?: Address | null;
  contacts?: ContactLink[];

  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type Family = {
  id: number;
  relationship: string;
  personId: number;
  person: Person;
  relativeId: number;
  relative: Person;
  createdAt?: string;
  updatedAt?: string;
};

export interface CreateFamilyDto {
  relationship: string;
  personId: number;
  relativeId: number;
}

export interface UpdateFamilyDto extends Partial<CreateFamilyDto> {}

// ===== Employee domain types (kept local to employees) =====
export type EmployeeCategory = {
  id: number;
  name: string;
  code?: string | null;
  information?: string | null;
  isActive: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type EmployeePosition = {
  id: number;
  name: string;
  code?: string | null;
  information?: string | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type EmployeeVacation = {
  id: number;
  detail?: string | null;
  days: number; // required in backend
  year: number; // required (default 0)
  startDate: string; // ISO
  endDate: string; // ISO (start + days - 1)
  settlementDate: string; // ISO (default now in backend)
  type: VacationType; // ASSIGNED or TAKEN
  employeeId: number;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

// Employee dyas available for summaries and reports
export type AvailableYear = {
  year: number;
  available: number;
  assigned: number;
  taken: number;
};

// ===== Employee (references to shared types left as unknown to avoid duplication) =====
export type Employee = {
  id: number;
  employeeCode?: string | null; // Número de legajo interno de la empresa
  information?: string | null;
  status: EmployeeStatus;
  hireDate: string; // ISO
  endDate?: string | null; // ISO

  createdAt: string; // ISO
  updatedAt: string; // ISO

  // Relations
  companyId?: number | null;
  company?: Company | null;

  categoryId: number;
  category: EmployeeCategory;

  positionId: number;
  position: EmployeePosition;

  personId: number; // unique
  person: Person;

  vacations?: EmployeeVacation[];
  documents?: Document[];
  inspections?: Inspection[];
  employeeIncidents?: EmployeeIncident[];
};

// ===== DTOs for Employee domain =====
export interface CreateEmployeeDto {
  employeeCode?: string;
  information?: string;
  status?: EmployeeStatus;
  hireDate: string;
  endDate?: string;
  companyId?: number;
  categoryId: number;
  positionId: number;
  personId: number;
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {}

export interface CreatePersonDto {
  firstName: string;
  lastName: string;
  birthDate?: string;
  dni?: string;
  cuil?: string;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  information?: string;
  status?: PersonStatus;
}

export interface UpdatePersonDto extends Partial<CreatePersonDto> {}

export interface CreateEmployeeCategoryDto {
  name: string;
  code?: string;
  information?: string;
  isActive?: boolean;
}

export interface UpdateEmployeeCategoryDto
  extends Partial<CreateEmployeeCategoryDto> {}

export interface CreateEmployeePositionDto {
  name: string;
  code?: string;
  information?: string;
  isActive?: boolean;
}

export interface UpdateEmployeePositionDto
  extends Partial<CreateEmployeePositionDto> {}

export interface CreateEmployeeVacationDto {
  detail?: string;
  days: number;
  year: number;
  startDate: string;
  endDate: string;
  settlementDate?: string;
  type?: VacationType;
  employeeId: number;
}

export interface UpdateEmployeeVacationDto
  extends Partial<CreateEmployeeVacationDto> {}
