//filepath: sae-frontend/lib/types/domain/company.ts

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

// ===== Junction table types =====

export interface PartOrderCompany {
  companyId: number;
  partId: number;
  price?: number | null;
  stock?: number | null;
  createdAt: string;
  company: Company;
  part: import("../shared/shared").Part;
}

export interface ProductCompany {
  productId: number;
  companyId: number;
  price?: number | null;
  stock?: number | null;
  createdAt: string;
  product: import("../shared/shared").Product;
  company: Company;
}

// ===== DTOs =====

export interface CreateCompanyDto {
  cuit: string;
  name: string;
  businessName?: string;
  information?: string;
  businessCategoryId?: number;
  address?: {
    id?: number;
    street?: string;
    number?: string;
    floor?: string;
    apartment?: string;
    neighborhood?: string;
    reference?: string;
    cityId: number;
  };
}

export interface UpdateCompanyDto extends Partial<CreateCompanyDto> {}

export interface CreateBusinessCategoryDto {
  name: string;
  code?: string;
  information?: string;
  isActive?: boolean;
  deletedAt?: string;
}

export interface UpdateBusinessCategoryDto
  extends Partial<CreateBusinessCategoryDto> {}

export interface CreateBusinessSubcategoryDto {
  name: string;
  description?: string;
  businessCategoryId: number;
  isActive?: boolean;
}

export interface UpdateBusinessSubcategoryDto
  extends Partial<CreateBusinessSubcategoryDto> {}
