// file: sae-frontend/types/company.ts

export interface BusinessCategory {
  id: number;
  name: string;
  code?: string | null;
  information?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface BusinessSubCategory {
  id: number;
  name: string;
  description?: string | null;
  businessCategoryId: number;
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

export interface CreateBusinessCategoryDto {
  name: string;
  code?: string;
  information?: string;
}

export interface UpdateBusinessCategoryDto
  extends Partial<CreateBusinessCategoryDto> {}

export interface CreateBusinessSubCategoryDto {
  name: string;
  description?: string;
  businessCategoryId: number;
}

export interface UpdateBusinessSubCategoryDto
  extends Partial<CreateBusinessSubCategoryDto> {}
