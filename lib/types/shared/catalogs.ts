// filepath: sae-frontend/lib/types/shared/brand.ts

// ===== Brand types =====
export interface Brand {
  id: number;
  name: string;
  code: string;
  information?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

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

// ===== Unit types =====
export interface Unit {
  id: number;
  name: string;
  abbreviation: string;
  isActive: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUnitDto {
  name: string;
  abbreviation: string;
  isActive?: boolean;
}

export interface UpdateUnitDto extends Partial<CreateUnitDto> {}
