// filepath: sae-frontend/types/tire.ts

// Import enums from shared location
import { TireStatus, TirePosition, TireEventType } from "./enums";

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
  tires?: Tire[];
}

export interface TireSizeAlias {
  id: number;
  aliasCode: string; // Ej: "14.9R46"
  tireSizeId: number;
  tireSize: TireSize;
  createdAt?: string;
  updatedAt?: string;
}

// Main Tire entity
export interface Tire {
  id: number;
  serialNumber: string; // Unique identifier
  brandId?: number | null;
  sizeId?: number | null;
  model?: string | null; // Commercial name
  position?: TirePosition | null;
  status: TireStatus;
  totalKm?: number | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  brand?: {
    id: number;
    name: string;
    code: string;
  } | null;
  size?: TireSize | null;

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
  equipmentId: number;
  position: TirePosition;
  startDate: string;
  endDate?: string | null;
  kmAtStart?: number | null;
  kmAtEnd?: number | null;

  // Relations
  tire: Tire;
  equipment: {
    id: number;
    name?: string | null;
    internalCode?: string | null;
  };
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
  brandId?: number;
  sizeId?: number;
  model?: string;
  position?: TirePosition;
  status?: TireStatus;
  totalKm?: number;
}

export interface UpdateTireDto extends Partial<CreateTireDto> {}

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

export interface CreateTireSizeAliasDto {
  aliasCode: string;
  tireSizeId: number;
}

export interface UpdateTireSizeAliasDto
  extends Partial<CreateTireSizeAliasDto> {}

// Assignments
export interface MountTireDto {
  tireId: number;
  equipmentId: number;
  position: string; // TirePosition as string
  kmAtStart?: number;
  note?: string;
}

export interface UnmountTireDto {
  assignmentId: number;
  kmAtEnd?: number;
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
  size?: string;
  position?: TirePosition;
  status: TireStatus;
  totalKm?: number;
  lastAssignment?: {
    equipment: string;
    position: TirePosition;
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
