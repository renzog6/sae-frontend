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

export interface CreateTireSizeAliasDto {
  aliasCode: string;
  tireSizeId: number;
}

export interface UpdateTireSizeAliasDto
  extends Partial<CreateTireSizeAliasDto> {}

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

// Over recapped report
export interface TireOverRecappedReport {
  tireId: number;
  recapCount: number;
}
[];

// Brand ranking report
export interface TireBrandRankingReport {
  brand: string;
  avgKm: number;
}
[];

// Yearly recap report
export interface TireYearlyRecapReport {
  year: number;
  totalRecaps: number;
  totalCost: number;
  costByBrand: Record<string, number>;
}

// ===== Helper Types =====

// Tire with full relations for detailed views
export interface TireWithDetails extends Tire {
  assignments: TireAssignment[];
  rotations: TireRotation[];
  recaps: TireRecap[];
  inspections: TireInspection[];
  events: TireEvent[];
}

// Tire summary for lists
export interface TireSummary {
  id: number;
  serialNumber: string;
  brand?: string;
  model?: string;
  size?: string;
  position?: TirePosition;
  status: TireStatus;
  totalKm?: number;
  lastAssignment?: {
    equipment: string;
    position: string; // positionKey from TirePositionConfig
    startDate: string;
  };
}

// Dashboard stats
export interface TireStats {
  total: number;
  inStock: number;
  inUse: number;
  underRepair: number;
  recap: number;
  discarded: number;
  averageKm: number;
  totalRecaps: number;
}
