// filepath: sae-frontend/types/employee.ts

// Only Employee + Person domain and their direct employee relations.
// Avoid duplicating shared types like Company, Address, Contacts.
// If you already have those, import them where you need them.

// If you have shared types, uncomment and point to your actual files:
// import { Company } from './company'
// import { Address } from './address'
// import { ContactLink } from './contact'

// ===== Enums (aligned with backend prisma/schema.prisma) =====
export enum EmployeeStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    TERMINATED = 'TERMINATED',
  }
  
  export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
  }
  
  export enum MaritalStatus {
    SINGLE = 'SINGLE',
    MARRIED = 'MARRIED',
    DIVORCED = 'DIVORCED',
    WIDOWED = 'WIDOWED',
  }
  
  export enum PersonStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }

  // Vacations
  export enum VacationType {
    ASSIGNED = 'ASSIGNED',
    TAKEN = 'TAKEN',
  }
  
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
  
    // Avoid type duplication: leave as unknown or import from your shared types
    address?: unknown | null;     // Prefer: Address | null
    contacts?: unknown[];         // Prefer: ContactLink[]
  
    createdAt: string; // ISO
    updatedAt: string; // ISO
  };
  
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
    days: number;            // required in backend
    year: number;            // required (default 0)
    startDate: string;       // ISO
    endDate: string;         // ISO (start + days - 1)
    settlementDate: string;  // ISO (default now in backend)
    type: VacationType;      // ASSIGNED or TAKEN
    employeeId: number;
    createdAt: string; // ISO
    updatedAt: string; // ISO
  };

  // ===== Employee (references to shared types left as unknown to avoid duplication) =====
  export type Employee = {
    id: number;
    employeeCode?: string | null; // Número de legajo interno de la empresa
    information?: string | null;
    status: EmployeeStatus;
    hireDate: string;       // ISO
    endDate?: string | null; // ISO

    createdAt: string; // ISO
    updatedAt: string; // ISO

    // Relations
    companyId?: number | null;
    company?: unknown | null; // Prefer: Company | null (import from your shared type)

    categoryId: number;
    category: EmployeeCategory;

    positionId: number;
    position: EmployeePosition;

    personId: number; // unique
    person: Person;

    vacations?: EmployeeVacation[];
  };