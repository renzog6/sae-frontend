# 📋 Referencia Completa de Tipos - sae-frontend/lib/types

Este documento contiene todas las definiciones de tipos TypeScript organizadas por archivo.

---

## 📁 api.ts

```typescript
// filepath: sae-frontend/types/api.ts

// Representa cualquier respuesta paginada del backend
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

// Representa una respuesta con un solo recurso
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
```

---

## 📁 auth.ts

```typescript
// filepath: sae-frontend/types/auth.ts
import { User } from "./user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  username: string;
  role: string;
}
```

---

## 📁 catalog.ts

```typescript
// filepath: sae-frontend/types/catalog.ts

// Re-export shared types for backward compatibility
export type { Brand, Unit } from "./shared";

// ===== DTOs for catalog types =====
export interface CreateBrandDto {
  name: string;
  code: string;
  information?: string;
  isActive?: boolean;
  deletedAt?: string | null;
}

export interface UpdateBrandDto extends Partial<CreateBrandDto> {
  deletedAt?: string | null;
}

export interface CreateUnitDto {
  name: string;
  abbreviation: string;
  isActive?: boolean;
}

export interface UpdateUnitDto extends Partial<CreateUnitDto> {}

// ===== Brand query parameters =====
export interface BaseQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ===== Unit query parameters =====
export interface BaseQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

---

## 📁 company.ts

```typescript
//filepath: sae-frontend/lib/types/company.ts
export interface BusinessCategory {
  id: number;
  name: string;
  code?: string | null;
  information?: string | null;
  isActive: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  subCategories?: BusinessSubCategory[];
}

export interface BusinessSubCategory {
  id: number;
  name: string;
  description?: string | null;
  businessCategoryId: number;
  businessCategory: {
    id: number;
    name: string;
    code?: string;
  };
  isActive: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Alias for backward compatibility
export type BusinessSubcategory = BusinessSubCategory;

export interface Company {
  id: number;
  cuit: string;
  name: string;
  businessName?: string | null;
  information?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  businessCategoryId?: number | null;
  businessCategory?: BusinessCategory | null;
}

export interface CreateCompanyDto {
  cuit: string;
  name: string;
  businessName?: string;
  information?: string;
  businessCategoryId?: number;
}

export interface UpdateCompanyDto extends Partial<CreateCompanyDto> {}

// BusinessSubCategory response types
export interface BusinessSubCategoryResponse {
  data: BusinessSubCategory[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BusinessSubCategoryQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: boolean;
}

// BusinessCategory response types
export interface BusinessCategoryResponse {
  data: BusinessCategory[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BaseQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: boolean;
}
```

---

## 📁 contact.ts

```typescript
// file: sae-frontend/types/contact.ts
import { PaginatedResponse } from "./api";

export enum ContactType {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  WHATSAPP = "WHATSAPP",
  TELEGRAM = "TELEGRAM",
  INSTAGRAM = "INSTAGRAM",
  LINKEDIN = "LINKEDIN",
  OTHER = "OTHER",
}

export interface ContactLink {
  id: number;
  contactId: number;
  companyId?: number | null;
  personId?: number | null;
  // Optionally hydrate
  company?: { id: number; name: string } | null;
  person?: { id: number; firstName: string; lastName: string } | null;
}

export interface Contact {
  id: number;
  type: ContactType;
  value: string;
  label?: string | null;
  information?: string | null;
  contactLinks?: ContactLink[];
}

export interface CreateContactDto {
  type: ContactType;
  value: string;
  label?: string;
  information?: string;
}

export interface UpdateContactDto extends Partial<CreateContactDto> {}

// Helpers
export type ContactsPage = PaginatedResponse<Contact>;
```

---

## 📁 document.ts

```typescript
// filepath: sae-frontend/types/document.ts

export interface Document {
  id: number;
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  description?: string;
  uploadedAt: string;
  employeeId?: number;
  companyId?: number;
}

export interface UploadDocumentData {
  file: File;
  description: string;
  employeeId?: number;
  companyId?: number;
}

export interface CreateDocumentDto {
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  description?: string;
  employeeId?: number;
  companyId?: number;
}

export interface UpdateDocumentDto extends Partial<CreateDocumentDto> {}
```

---

## 📁 employee.ts

```typescript
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
import {
  EmployeeStatus,
  Gender,
  MaritalStatus,
  PersonStatus,
  VacationType,
} from "./enums";

// Re-export enums for backward compatibility
export { EmployeeStatus, Gender, MaritalStatus, PersonStatus, VacationType };

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
```

---

## 📁 enums.ts

```typescript
// filepath: sae-frontend/types/enums.ts

// ===== Enums from schema.prisma =====

// User roles
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Contact types
export enum ContactType {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  WHATSAPP = "WHATSAPP",
  TELEGRAM = "TELEGRAM",
  INSTAGRAM = "INSTAGRAM",
  LINKEDIN = "LINKEDIN",
  OTHER = "OTHER",
}

// Employee statuses
export enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED",
}

// Gender
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

// Marital status
export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

// Person status
export enum PersonStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

// Vacation types
export enum VacationType {
  ASSIGNED = "ASSIGNED",
  TAKEN = "TAKEN",
}

// Equipment status
export enum EquipmentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  MAINTENANCE = "MAINTENANCE",
  RETIRED = "RETIRED",
}

// History types
export enum HistoryType {
  EMPLOYEE_ILLNESS = "EMPLOYEE_ILLNESS",
  EMPLOYEE_WARNING = "EMPLOYEE_WARNING",
  EMPLOYEE_ACHIEVEMENT = "EMPLOYEE_ACHIEVEMENT",
  EMPLOYEE_HIRE = "EMPLOYEE_HIRE",
  VACATION_ASSIGNED = "VACATION_ASSIGNED",
  VACATION_TAKEN = "VACATION_TAKEN",
  COMPANY_REMINDER = "COMPANY_REMINDER",
  COMPANY_EVENT = "COMPANY_EVENT",
  EQUIPMENT_MAINTENANCE = "EQUIPMENT_MAINTENANCE",
  EQUIPMENT_ACCIDENT = "EQUIPMENT_ACCIDENT",
  EQUIPMENT_REPAIR = "EQUIPMENT_REPAIR",
  PERSONAL_EVENT = "PERSONAL_EVENT",
  GENERAL_NOTE = "GENERAL_NOTE",
}

// Severity levels
export enum SeverityLevel {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  SUCCESS = "SUCCESS",
}

// Employee incident types
export enum EmployeeIncidentType {
  SICK_LEAVE = "SICK_LEAVE",
  DISCIPLINARY = "DISCIPLINARY",
  WARNING = "WARNING",
  ACCIDENT = "ACCIDENT",
  FAMILY_EMERGENCY = "FAMILY_EMERGENCY",
  UNJUSTIFIED_ABSENCE = "UNJUSTIFIED_ABSENCE",
  VACATION_LEAVE = "VACATION_LEAVE",
}

// Maintenance types
export enum MaintenanceType {
  PREVENTIVE = "PREVENTIVE",
  CORRECTIVE = "CORRECTIVE",
  ACCIDENT_REPAIR = "ACCIDENT_REPAIR",
  ROUTINE_CHECK = "ROUTINE_CHECK",
}

// Inspection types (placeholder - not defined in schema yet)
export enum InspectionType {
  GENERAL = "GENERAL",
  SAFETY = "SAFETY",
  MAINTENANCE = "MAINTENANCE",
  COMPLIANCE = "COMPLIANCE",
}

// Tire statuses
export enum TireStatus {
  IN_STOCK = "IN_STOCK",
  IN_USE = "IN_USE",
  UNDER_REPAIR = "UNDER_REPAIR",
  RECAP = "RECAP",
  DISCARDED = "DISCARDED",
}

// Tire positions
export enum TirePosition {
  DI = "DI", // Delantero Izquierdo
  DD = "DD", // Delantero Derecho
  E1I = "E1I", // Eje 1 Izquierdo
  E1D = "E1D", // Eje 1 Derecho
  E2I = "E2I", // Eje 2 Izquierdo
  E2D = "E2D", // Eje 2 Derecho
  E3I = "E3I", // Eje 3 Izquierdo
  E3D = "E3D", // Eje 3 Derecho
  E4I = "E4I", // Eje 4 Izquierdo
  E4D = "E4D", // Eje 4 Derecho
  E1II = "E1II", // Eje 1 Izquierdo Interno
  E1ID = "E1ID", // Eje 1 Izquierdo Externo
  E1DI = "E1DI", // Eje 1 Derecho Interno
  E1DD = "E1DD", // Eje 1 Derecho Externo
  E2II = "E2II", // Eje 2 Izquierdo Interno
  E2ID = "E2ID", // Eje 2 Izquierdo Externo
  E2DI = "E2DI", // Eje 2 Derecho Interno
  E2DD = "E2DD", // Eje 2 Derecho Externo
  E3II = "E3II", // Eje 3 Izquierdo Interno
  E3ID = "E3ID", // Eje 3 Izquierdo Externo
  E3DI = "E3DI", // Eje 3 Derecho Interno
  E3DD = "E3DD", // Eje 3 Derecho Externo
  E4II = "E4II", // Eje 4 Izquierdo Interno
  E4ID = "E4ID", // Eje 4 Izquierdo Externo
  E4DI = "E4DI", // Eje 4 Derecho Interno
  E4DD = "E4DD", // Eje 4 Derecho Externo
  SPARE = "SPARE", // Rueda de auxilio
  UNKNOWN = "UNKNOWN", // Sin posición definida
}

// Tire event types
export enum TireEventType {
  ASSIGNMENT = "ASSIGNMENT",
  UNASSIGNMENT = "UNASSIGNMENT",
  ROTATION = "ROTATION",
  INSPECTION = "INSPECTION",
  RECAP = "RECAP",
  DISCARD = "DISCARD",
  OTHER = "OTHER",
}

// Axle types
export enum AxleType {
  FRONT = "FRONT",
  DRIVE = "DRIVE",
  TRAILER = "TRAILER",
  TAG = "TAG",
}

// Tire side
export enum TireSide {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  INNER = "INNER",
  OUTER = "OUTER",
}
```

---

## 📁 equipment.ts

```typescript
// filepath: sae-frontend/types/equipment.ts

// Import shared types and enums
import {
  Brand,
  Inspection,
  EquipmentMaintenance,
  EquipmentPart,
} from "./shared";
import { AxleType, EquipmentStatus } from "./enums";
import { Company } from "./company";
import { TirePositionConfig } from "./tire";

// ===== Equipment Axle =====
export interface EquipmentAxle {
  id: number;
  equipmentId: number;
  order: number; // Eje 1, Eje 2, etc.
  axleType: AxleType;
  wheelCount: number;
  description?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  equipment: {
    id: number;
    name?: string | null;
    internalCode?: string | null;
  };
  tirePositions?: TirePositionConfig[];
}

// ===== Equipment domain types =====
export type EquipmentCategory = {
  id: number;
  name: string;
  code?: string | null;
  description?: string | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO

  // Relations
  types?: EquipmentType[];
};

export type EquipmentType = {
  id: number;
  name: string;
  code?: string | null;
  description?: string | null;
  categoryId?: number | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO

  // Relations
  category?: EquipmentCategory | null;
};

export type EquipmentModel = {
  id: number;
  name: string;
  code?: string | null;
  year?: number | null;
  description?: string | null;
  typeId?: number | null;
  brandId?: number | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO

  // Relations
  type?: EquipmentType | null;
  brand?: Brand | null;
};

// ===== Equipment (references to shared types left as unknown to avoid duplication) =====
export type Equipment = {
  id: number;
  internalCode?: string | null;
  name?: string | null;
  description?: string | null;
  observation?: string | null;
  year?: number | null;
  licensePlate?: string | null;
  chassis?: string | null;
  engine?: string | null;
  color?: string | null;
  diesel?: boolean | null;
  status: EquipmentStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO

  // Relations
  companyId?: number | null;
  company?: Company | null;

  parts?: EquipmentPart[];
  inspections?: Inspection[];
  maintenance?: EquipmentMaintenance[];

  categoryId?: number | null;
  category?: EquipmentCategory | null;

  typeId?: number | null;
  type?: EquipmentType | null;

  modelId?: number | null;
  model?: EquipmentModel | null;
};

// ===== DTOs for API =====
export type CreateEquipmentCategoryDto = {
  name: string;
  code?: string;
  description?: string;
};

export type UpdateEquipmentCategoryDto = Partial<CreateEquipmentCategoryDto>;

export type CreateEquipmentTypeDto = {
  name: string;
  code?: string;
  description?: string;
  categoryId?: number;
};

export type UpdateEquipmentTypeDto = Partial<CreateEquipmentTypeDto>;

export type CreateEquipmentModelDto = {
  name: string;
  code?: string;
  year?: number;
  description?: string;
  typeId?: number;
  brandId?: number;
};

export type UpdateEquipmentModelDto = Partial<CreateEquipmentModelDto>;

export type CreateEquipmentDto = {
  internalCode?: string;
  name?: string;
  description?: string;
  observation?: string;
  year?: number;
  licensePlate?: string;
  chassis?: string;
  engine?: string;
  color?: string;
  diesel?: boolean;
  status?: EquipmentStatus;
  companyId?: number;
  categoryId?: number;
  typeId?: number;
  modelId?: number;
};

export type UpdateEquipmentDto = Partial<CreateEquipmentDto>;
```

---

## 📁 history.ts

```typescript
// filepath: sae-frontend/types/history.ts

// Import enums from shared location
import {
  EmployeeIncidentType,
  HistoryType,
  SeverityLevel,
  MaintenanceType,
  InspectionType,
} from "./enums";
import { Equipment } from "./equipment";
import { Person } from "./employee";
import { Company } from "./company";

// Re-export enums for backward compatibility
export { EmployeeIncidentType, HistoryType, SeverityLevel } from "./enums";

export interface EmployeeIncident {
  id: number;
  type: EmployeeIncidentType;
  description: string;
  startDate?: string;
  endDate?: string;
  doctorNote: boolean;
  paidLeave: boolean;
  createdAt: string;
  updatedAt: string;
  employeeId: number;
  employee?: {
    id: number;
    person?: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface HistoryLog {
  id: number;
  title: string;
  description?: string;
  type: HistoryType;
  severity: SeverityLevel;
  eventDate: string;
  createdAt: string;
  employeeId?: number;
  companyId?: number;
  equipmentId?: number;
  personId?: number;
  metadata?: string;
  employee?: {
    id: number;
    person?: {
      firstName: string;
      lastName: string;
    };
  };
  company?: {
    id: number;
    name: string;
  };
  equipment?: {
    id: number;
    name: string;
  };
  person?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface CreateEmployeeIncidentDto {
  type: EmployeeIncidentType;
  description: string;
  startDate?: string;
  endDate?: string;
  doctorNote?: boolean;
  paidLeave?: boolean;
  employeeId: number;
}

export interface UpdateEmployeeIncidentDto
  extends Partial<CreateEmployeeIncidentDto> {}

export interface EmployeeHistoryResponse {
  incidents: EmployeeIncident[];
  logs: HistoryLog[];
}
```

---

## 📁 index.ts

```typescript
//filepath: sae-frontend/lib/types/index.ts

export * from "./tire";
export * from "./report";
```

---

## 📁 location.ts

```typescript
// filepath: sae-frontend/types/location.ts

export interface Country {
  id: number;
  name: string;
  code: string; // ISO code, e.g. 'AR'
}

export interface Province {
  id: number;
  name: string;
  code?: string;
  countryId: number;
  country?: Country;
}

export interface City {
  id: number;
  name: string;
  postalCode?: string;
  provinceId: number;
  province?: Province;
}

export interface Address {
  id: number;
  street?: string;
  number?: string;
  floor?: string;
  apartment?: string;
  cityId: number;
  city?: City;
  latitude?: number;
  longitude?: number;
  neighborhood?: string;
  reference?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  personId?: number | null;
  companyId?: number | null;
}

export interface CreateCountryDto {
  name: string;
  isoCode: string;
  code?: string;
}

export interface UpdateCountryDto extends Partial<CreateCountryDto> {}

export interface CreateProvinceDto {
  code: string;
  name: string;
  countryId: number;
}

export interface UpdateProvinceDto extends Partial<CreateProvinceDto> {}

export interface CreateCityDto {
  name: string;
  postalCode: string;
  provinceId: number;
}

export interface UpdateCityDto extends Partial<CreateCityDto> {}

export interface CreateAddressDto {
  street?: string;
  number?: string;
  floor?: string;
  apartment?: string;
  cityId: number;
  latitude?: number;
  longitude?: number;
  neighborhood?: string;
  reference?: string;
  isActive?: boolean;
  personId?: number;
  companyId?: number;
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> {}
```

---

## 📁 next-auth.d.ts

```typescript
// filepath: sae-frontend/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
      role: string;
      companyId: number;
      isActive?: boolean;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User extends DefaultUser {
    role: string;
    companyId: number;
    isActive?: boolean;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    companyId: number;
    isActive?: boolean;
    accessToken: string;
    refreshToken: string;
  }
}
```

---

## 📁 report.ts

```typescript
// filepath: sae-frontend/lib/types/report.ts

export enum ReportType {
  EMPLOYEE_LIST = "employee_list",
  EMPLOYEE_VACATION_BALANCE = "employee_vacation_balance",
  EMPLOYEE_VACATION_HISTORY = "employee_vacation_history",
  EQUIPMENT_LIST = "equipment_list",
  TIRE_LIST = "tire_list",
}

export enum ReportFormat {
  XLSX = "xlsx",
  PDF = "pdf",
  CSV = "csv",
  DOCX = "docx",
}

/*
*Exmple:{
  "reportType": "employee_list",
  "format": "xlsx",
  "filter": {
    "status": "active"
  },
  "title": "Empleados"
}
*/
export interface GenerateReportDto {
  reportType: ReportType;
  format: ReportFormat;
  filter?: Record<string, any> | string;
  title?: string;
}
```

---

## 📁 shared.ts

```typescript
// filepath: sae-frontend/types/shared.ts

// ===== Shared types used across multiple domains =====

export interface Brand {
  id: number;
  name: string;
  code: string;
  information?: string | null;
  isActive: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: number;
  name: string;
  abbreviation: string;
  isActive: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Presentation {
  id: number;
  name: string;
  code?: string | null;
  information?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tire {
  id: number;
  size?: string | null;
  information?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PartCategory {
  id: number;
  code?: string | null;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Part {
  id: number;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  information?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  brandId?: number | null;
  brand?: Brand | null;
  categoryId?: number | null;
  category?: PartCategory | null;
}

export interface Product {
  id: number;
  name: string;
  code?: string | null;
  information?: string | null;
  stockQuantity?: number | null;
  unitPrice?: number | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  brandId?: number | null;
  brand?: Brand | null;
  presentationId?: number | null;
  presentation?: Presentation | null;
}

export interface InspectionType {
  id: number;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Inspection {
  id: number;
  date: string;
  description?: string | null;
  observation?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  equipmentId: number;
  equipment?: {
    id: number;
    name?: string | null;
    internalCode?: string | null;
  } | null;

  employeeId: number;
  employee?: {
    id: number;
    person?: {
      firstName: string;
      lastName: string;
    } | null;
  } | null;

  inspectionTypeId?: number | null;
  inspectionType?: InspectionType | null;
}

export interface EquipmentMaintenance {
  id: number;
  type: import("./enums").MaintenanceType;
  description: string;
  cost?: number | null;
  startDate: string;
  endDate?: string | null;
  technician?: string | null;
  warranty: boolean;
  createdAt: string;
  updatedAt: string;

  // Relations
  equipmentId: number;
  equipment?: {
    id: number;
    name?: string | null;
    internalCode?: string | null;
  } | null;
}

// ===== DTOs for shared types =====

export interface CreateBrandDto {
  name: string;
  code: string;
  information?: string;
  isActive?: boolean;
  deletedAt?: string | null;
}

export interface UpdateBrandDto extends Partial<CreateBrandDto> {
  deletedAt?: string | null;
}

export interface CreateUnitDto {
  name: string;
  abbreviation: string;
  isActive?: boolean;
  deletedAt?: string | null;
}

export interface UpdateUnitDto extends Partial<CreateUnitDto> {
  deletedAt?: string | null;
}

export interface CreatePresentationDto {
  name: string;
  code?: string;
  information?: string;
}

export interface UpdatePresentationDto extends Partial<CreatePresentationDto> {}

export interface CreateTireDto {
  size?: string;
  information?: string;
}

export interface UpdateTireDto extends Partial<CreateTireDto> {}

export interface CreatePartCategoryDto {
  name: string;
  code?: string;
  description?: string;
}

export interface UpdatePartCategoryDto extends Partial<CreatePartCategoryDto> {}

export interface CreatePartDto {
  code?: string;
  name?: string;
  description?: string;
  information?: string;
  brandId?: number;
  categoryId?: number;
}

export interface UpdatePartDto extends Partial<CreatePartDto> {}

export interface CreateProductDto {
  name: string;
  code?: string;
  information?: string;
  stockQuantity?: number;
  unitPrice?: number;
  brandId?: number;
  presentationId?: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface CreateInspectionTypeDto {
  name: string;
  description?: string;
}

export interface UpdateInspectionTypeDto
  extends Partial<CreateInspectionTypeDto> {}

export interface CreateInspectionDto {
  date?: string;
  description?: string;
  observation?: string;
  equipmentId: number;
  employeeId: number;
  inspectionTypeId?: number;
}

export interface UpdateInspectionDto extends Partial<CreateInspectionDto> {}

export interface CreateEquipmentMaintenanceDto {
  type: import("./enums").MaintenanceType;
  description: string;
  cost?: number;
  startDate: string;
  endDate?: string;
  technician?: string;
  warranty?: boolean;
  equipmentId: number;
}

export interface UpdateEquipmentMaintenanceDto
  extends Partial<CreateEquipmentMaintenanceDto> {}

// ===== Junction table types =====

export interface PartOrderCompany {
  companyId: number;
  partId: number;
  price?: number | null;
  stock?: number | null;
  createdAt: string;
  company: Company;
  part: Part;
}

export interface ProductCompany {
  productId: number;
  companyId: number;
  price?: number | null;
  stock?: number | null;
  createdAt: string;
  product: Product;
  company: Company;
}

export interface EquipmentModelPart {
  modelId: number;
  partId: number;
  createdAt: string;
  model: EquipmentModel;
  part: Part;
}

export interface EquipmentPart {
  equipmentId: number;
  partId: number;
  quantity?: number | null;
  createdAt: string;
  part: Part;
  equipment: Equipment;
}

// ===== DTOs for junction tables =====

export interface CreatePartOrderCompanyDto {
  companyId: number;
  partId: number;
  price?: number;
  stock?: number;
}

export interface UpdatePartOrderCompanyDto
  extends Partial<CreatePartOrderCompanyDto> {}

export interface CreateProductCompanyDto {
  productId: number;
  companyId: number;
  price?: number;
  stock?: number;
}

export interface UpdateProductCompanyDto
  extends Partial<CreateProductCompanyDto> {}

export interface CreateEquipmentModelPartDto {
  modelId: number;
  partId: number;
}

export interface UpdateEquipmentModelPartDto
  extends Partial<CreateEquipmentModelPartDto> {}

export interface CreateEquipmentPartDto {
  equipmentId: number;
  partId: number;
  quantity?: number;
}

export interface UpdateEquipmentPartDto
  extends Partial<CreateEquipmentPartDto> {}

// Forward declarations for circular references
import { EquipmentStatus } from "./enums";

export interface Equipment {
  id: number;
  internalCode?: string | null;
  name?: string | null;
  description?: string | null;
  observation?: string | null;
  year?: number | null;
  licensePlate?: string | null;
  chassis?: string | null;
  engine?: string | null;
  color?: string | null;
  diesel?: boolean | null;
  status: EquipmentStatus;
  createdAt: string;
  updatedAt: string;
  companyId?: number | null;
  categoryId?: number | null;
  typeId?: number | null;
  modelId?: number | null;
}

export interface EquipmentModel {
  id: number;
  name: string;
  code?: string | null;
  year?: number | null;
  description?: string | null;
  typeId?: number | null;
  brandId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  cuit: string;
  name: string;
  businessName?: string | null;
  information?: string | null;
  createdAt: string;
  updatedAt: string;
  businessCategoryId?: number | null;
}
```

---

## 📁 tire.ts

```typescript
// filepath: sae-frontend/types/tire.ts

// Import enums from shared location
import { TireStatus, TirePosition, TireEventType, TireSide } from "./enums";
import { EquipmentAxle } from "./equipment";

// ===== Tire Position Config =====
export interface TirePositionConfig {
  id: number;
  axleId: number;
  positionKey: string; // Ej: "E1I", "E1D", "E2II", etc.
  side: TireSide;
  isDual: boolean;
  createdAt?: string;
  updatedAt?: string;

  // Relations
  axle: EquipmentAxle;
  assignments?: TireAssignment[];
}

// ===== Tire domain types =====

// Tire size with aliases
export interface TireSize {
  id: number;
  mainCode: string; // Ej: "380/90R46"
  width?: number | null; // 380
  aspectRatio?: number | null; // 90
  rimDiameter?: number | null; // 46
  construction?: string | null; // "R" (Radial), "D" (Diagonal)
  loadIndex?: number | null;
  speedSymbol?: string | null; // Ej: "A8", "B", "L"
  information?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  aliases?: TireSizeAlias[];
  models?: TireModel[];
}

export interface TireSizeAlias {
  id: number;
  aliasCode: string; // Ej: "14.9R46"
  tireSizeId: number;
  tireSize: TireSize;
  createdAt?: string;
  updatedAt?: string;
}

// Tire Model (commercial model with brand and size)
export interface TireModel {
  id: number;
  brandId: number;
  sizeId: number;
  name: string; // Ej: "Agribib"
  loadIndex?: number | null;
  speedSymbol?: string | null; // Ej: "A8", "B", "L"
  plyRating?: string | null; // Ej: "8PR"
  treadPattern?: string | null; // Ej: "R-1W", "LSW", etc.
  information?: string | null; // Notas técnicas, presión recomendada, etc.
  createdAt: string;
  updatedAt: string;

  // Relations
  brand: {
    id: number;
    name: string;
    code: string;
  };
  size: TireSize;
  tires?: Tire[];
}

// Main Tire entity
export interface Tire {
  id: number;
  serialNumber: string; // Unique identifier
  modelId: number;
  position?: TirePosition | null;
  status: TireStatus;
  totalKm?: number | null;
  recapCount: number; // DENORMALIZACIÓN: nº total recapados
  lastRecapAt?: string | null; // denormalización para consultas rápidas
  lastRecapId?: number | null; // FK opcional al último TireRecap
  createdAt: string;
  updatedAt: string;

  // Relations
  model: TireModel;

  // Related entities (optional hydration)
  assignments?: TireAssignment[];
  rotations?: TireRotation[];
  recaps?: TireRecap[];
  inspections?: TireInspection[];
  events?: TireEvent[];
}

// Tire Assignment (mount/unmount tracking)
export interface TireAssignment {
  id: number;
  tireId: number;
  positionConfigId: number; // Changed from equipmentId + position
  startDate: string;
  endDate?: string | null;
  kmAtStart?: number | null;
  kmAtEnd?: number | null;

  // Relations
  tire: Tire;
  positionConfig: TirePositionConfig; // Changed from direct equipment
}

// Tire Rotation (position/equipment changes)
export interface TireRotation {
  id: number;
  tireId: number;
  fromEquipmentId?: number | null;
  toEquipmentId?: number | null;
  fromPosition?: TirePosition | null;
  toPosition?: TirePosition | null;
  rotationDate: string;
  kmAtRotation?: number | null;

  // Relations
  tire: Tire;
}

// Tire Recap (retreading)
export interface TireRecap {
  id: number;
  tireId: number;
  provider?: string | null;
  recapDate: string;
  cost?: number | null;
  notes?: string | null;
  recapNumber: number; // Incremental per tire
  kmAtRecap?: number | null; // Muy importante: kms acumulados al momento del recap
  recapType?: string | null; // Ej: "full", "partial", "delamination_repair"
  createdBy?: number | null; // userId que realizó el registro
  createdAt: string;
  updatedAt: string;

  // Relations
  tire: Tire;
}

// Tire Inspection (technical checks)
export interface TireInspection {
  id: number;
  tireId: number;
  inspectionDate: string;
  pressure?: number | null; // PSI
  treadDepth?: number | null; // mm
  observation?: string | null;
  createdAt?: string;
  updatedAt?: string;

  // Relations
  tire: Tire;
}

// Tire Event (audit trail)
export interface TireEvent {
  id: number;
  tireId: number;
  eventType: TireEventType;
  eventDate: string;
  userId?: number | null;
  description?: string | null;
  metadata?: string | null; // JSON string
  createdAt: string;

  // Relations
  tire: Tire;
}

// ===== DTOs for API =====

// Tire CRUD
export interface CreateTireDto {
  serialNumber: string;
  modelId: number;
  position?: TirePosition;
  status?: TireStatus;
  totalKm?: number;
}

export interface UpdateTireDto extends Partial<CreateTireDto> {
  createdAt?: string;
}

// Tire Sizes
export interface CreateTireSizeDto {
  mainCode: string;
  width?: number;
  aspectRatio?: number;
  rimDiameter?: number;
  construction?: string;
  loadIndex?: number;
  speedSymbol?: string;
  information?: string;
}

export interface UpdateTireSizeDto extends Partial<CreateTireSizeDto> {}

// Tire Models
export interface CreateTireModelDto {
  brandId: number;
  sizeId: number;
  name: string;
  loadIndex?: number;
  speedSymbol?: string;
  plyRating?: string;
  treadPattern?: string;
  information?: string;
}

export interface UpdateTireModelDto extends Partial<CreateTireModelDto> {}

// Assignments
export interface MountTireDto {
  tireId: number;
  positionConfigId: number; // Changed from equipmentId + position
  kmAtStart?: number;
  mountDate?: string;
  note?: string;

  // Deprecated fields for backward compatibility
  equipmentId?: number;
  position?: string;
}

export interface UnmountTireDto {
  assignmentId: number;
  kmAtEnd?: number;
  unmountDate?: string;
  newStatus?: "IN_STOCK" | "UNDER_REPAIR" | "RECAP" | "DISCARDED";
  note?: string;
}

// Rotations
export interface CreateTireRotationDto {
  tireId: number;
  fromEquipmentId?: number;
  toEquipmentId?: number;
  fromPosition?: TirePosition;
  toPosition?: TirePosition;
  rotationDate?: string;
  kmAtRotation?: number;
  notes?: string;
}

export interface UpdateTireRotationDto extends Partial<CreateTireRotationDto> {}

// Recaps
export interface CreateTireRecapDto {
  tireId: number;
  provider?: string;
  cost?: number;
  notes?: string;
  kmAtRecap?: number;
  recapType?: string;
}

export interface UpdateTireRecapDto extends Partial<CreateTireRecapDto> {}

// Inspections
export interface CreateTireInspectionDto {
  tireId: number;
  inspectionDate?: string;
  pressure?: number;
  treadDepth?: number;
  observation?: string;
}

export interface UpdateTireInspectionDto
  extends Partial<CreateTireInspectionDto> {}

// ===== Report Types =====

// Report filters
export interface TireReportFilterDto {
  brand?: string;
  fromDate?: string;
  toDate?: string;
  minKm?: number;
}

// Average life report
export interface TireAverageLifeReport {
  count: number;
  averageKm: number;
  report?: Array<{
    tireId: number;
    km: number;
  }>;
}

// Cost per km report
export interface TireCostPerKmReport {
  tireId: number;
  brand?: number | null;
  totalCost: number;
  km: number;
  costPerKm: number | null;
}
[];
```
