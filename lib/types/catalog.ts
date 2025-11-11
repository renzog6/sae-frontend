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
export interface BrandQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ===== Unit query parameters =====
export interface UnitQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
