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

export interface CreateBusinessCategoryDto {
  name: string;
  code?: string;
  information?: string;
  isActive?: boolean;
}

export interface UpdateBusinessCategoryDto
  extends Partial<CreateBusinessCategoryDto> {}

export interface CreateBusinessSubCategoryDto {
  name: string;
  description?: string;
  businessCategoryId: number;
  isActive?: boolean;
  deletedAt?: string | null;
}

export interface UpdateBusinessSubCategoryDto
  extends Partial<CreateBusinessSubCategoryDto> {}

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

export interface BusinessCategoryQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: boolean;
}
