// filepath: sae-frontend/lib/types/shared/shared.ts

import type { Brand } from "./catalogs";
import { InspectionType } from "./enums";

// ===== Shared types used across multiple domains =====

export interface Presentation {
  id: number;
  name: string;
  code?: string | null;
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

export interface CreatePresentationDto {
  name: string;
  code?: string;
  information?: string;
}

export interface UpdatePresentationDto extends Partial<CreatePresentationDto> {}

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
