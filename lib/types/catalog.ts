// filepath: sae-frontend/types/catalog.ts

// Re-export shared types for backward compatibility
export type { Brand, Unit } from "./shared";

// ===== DTOs for catalog types =====
export interface CreateBrandDto {
  name: string;
  code: string;
  information?: string;
  isActive?: boolean;
}

export interface UpdateBrandDto extends Partial<CreateBrandDto> {}

export interface CreateUnitDto {
  name: string;
  abbreviation: string;
  isActive?: boolean;
}

export interface UpdateUnitDto extends Partial<CreateUnitDto> {}
