// file: sae-frontend/types/company.ts

export interface BusinessCategory {
  id: number;
  name: string;
  code?: string | null;
  information?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BusinessSubcategory {
  id: number;
  name: string;
  information?: string | null;
  categoryId: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Company {
  id: number;
  cuit: string;
  name: string;
  businessName?: string | null;
  information?: string | null;
  businessCategoryId?: number | null;
  businessCategory?: BusinessCategory | null; 
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
