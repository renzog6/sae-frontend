// filepath: sae-frontend/lib/types/domain/equipment.ts

// Import shared types and enums
import { Inspection, EquipmentMaintenance } from "../shared/shared";
import { Brand } from "../shared/catalogs";
import { AxleType, EquipmentStatus } from "../shared/enums";
import { Company } from "./company";
import { TirePositionConfig } from "./tire";

// ===== Axles DTOs =====

export interface CreateEquipmentAxleDto {
  equipmentId: number;
  order: number; // Eje 1, 2, 3...
  axleType: AxleType; // Enum
  wheelCount: number;
  description?: string;
}

export interface UpdateEquipmentAxleDto
  extends Partial<CreateEquipmentAxleDto> {}

export interface CreateAxleWithPositionsDto {
  axle: CreateEquipmentAxleDto;

  positions: Array<{
    positionKey: string; // Ej: "1L", "2R"
    side: string; // Ej: "left" | "right"
    isDual: boolean; // Simple o dual
  }>;
}

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

// ===== Junction table types =====

export interface EquipmentModelPart {
  modelId: number;
  partId: number;
  createdAt: string;
  model: EquipmentModel;
  part: import("../shared/shared").Part;
}

export interface EquipmentPart {
  equipmentId: number;
  partId: number;
  quantity?: number | null;
  createdAt: string;
  part: import("../shared/shared").Part;
  equipment: Equipment;
}

// ===== DTOs for junction tables =====

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
