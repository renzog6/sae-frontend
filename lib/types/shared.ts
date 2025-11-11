// filepath: sae-frontend/types/shared.ts

// ===== Shared types used across multiple domains =====

export interface Brand {
  id: number;
  name: string;
  code: string;
  information?: string | null;
  isActive: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: number;
  name: string;
  abbreviation: string;
  isActive: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Presentation {
  id: number;
  name: string;
  code?: string | null;
  information?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tire {
  id: number;
  size?: string | null;
  information?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PartCategory {
  id: number;
  code?: string | null;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Part {
  id: number;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  information?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  brandId?: number | null;
  brand?: Brand | null;
  categoryId?: number | null;
  category?: PartCategory | null;
}

export interface Product {
  id: number;
  name: string;
  code?: string | null;
  information?: string | null;
  stockQuantity?: number | null;
  unitPrice?: number | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  brandId?: number | null;
  brand?: Brand | null;
  presentationId?: number | null;
  presentation?: Presentation | null;
}

export interface InspectionType {
  id: number;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Inspection {
  id: number;
  date: string;
  description?: string | null;
  observation?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  equipmentId: number;
  equipment?: {
    id: number;
    name?: string | null;
    internalCode?: string | null;
  } | null;

  employeeId: number;
  employee?: {
    id: number;
    person?: {
      firstName: string;
      lastName: string;
    } | null;
  } | null;

  inspectionTypeId?: number | null;
  inspectionType?: InspectionType | null;
}

export interface EquipmentMaintenance {
  id: number;
  type: import("./enums").MaintenanceType;
  description: string;
  cost?: number | null;
  startDate: string;
  endDate?: string | null;
  technician?: string | null;
  warranty: boolean;
  createdAt: string;
  updatedAt: string;

  // Relations
  equipmentId: number;
  equipment?: {
    id: number;
    name?: string | null;
    internalCode?: string | null;
  } | null;
}

// ===== DTOs for shared types =====

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
  deletedAt?: string | null;
}

export interface UpdateUnitDto extends Partial<CreateUnitDto> {
  deletedAt?: string | null;
}

export interface CreatePresentationDto {
  name: string;
  code?: string;
  information?: string;
}

export interface UpdatePresentationDto extends Partial<CreatePresentationDto> {}

export interface CreateTireDto {
  size?: string;
  information?: string;
}

export interface UpdateTireDto extends Partial<CreateTireDto> {}

export interface CreatePartCategoryDto {
  name: string;
  code?: string;
  description?: string;
}

export interface UpdatePartCategoryDto extends Partial<CreatePartCategoryDto> {}

export interface CreatePartDto {
  code?: string;
  name?: string;
  description?: string;
  information?: string;
  brandId?: number;
  categoryId?: number;
}

export interface UpdatePartDto extends Partial<CreatePartDto> {}

export interface CreateProductDto {
  name: string;
  code?: string;
  information?: string;
  stockQuantity?: number;
  unitPrice?: number;
  brandId?: number;
  presentationId?: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface CreateInspectionTypeDto {
  name: string;
  description?: string;
}

export interface UpdateInspectionTypeDto
  extends Partial<CreateInspectionTypeDto> {}

export interface CreateInspectionDto {
  date?: string;
  description?: string;
  observation?: string;
  equipmentId: number;
  employeeId: number;
  inspectionTypeId?: number;
}

export interface UpdateInspectionDto extends Partial<CreateInspectionDto> {}

export interface CreateEquipmentMaintenanceDto {
  type: import("./enums").MaintenanceType;
  description: string;
  cost?: number;
  startDate: string;
  endDate?: string;
  technician?: string;
  warranty?: boolean;
  equipmentId: number;
}

export interface UpdateEquipmentMaintenanceDto
  extends Partial<CreateEquipmentMaintenanceDto> {}

// ===== Junction table types =====

export interface PartOrderCompany {
  companyId: number;
  partId: number;
  price?: number | null;
  stock?: number | null;
  createdAt: string;
  company: Company;
  part: Part;
}

export interface ProductCompany {
  productId: number;
  companyId: number;
  price?: number | null;
  stock?: number | null;
  createdAt: string;
  product: Product;
  company: Company;
}

export interface EquipmentModelPart {
  modelId: number;
  partId: number;
  createdAt: string;
  model: EquipmentModel;
  part: Part;
}

export interface EquipmentPart {
  equipmentId: number;
  partId: number;
  quantity?: number | null;
  createdAt: string;
  part: Part;
  equipment: Equipment;
}

// ===== DTOs for junction tables =====

export interface CreatePartOrderCompanyDto {
  companyId: number;
  partId: number;
  price?: number;
  stock?: number;
}

export interface UpdatePartOrderCompanyDto
  extends Partial<CreatePartOrderCompanyDto> {}

export interface CreateProductCompanyDto {
  productId: number;
  companyId: number;
  price?: number;
  stock?: number;
}

export interface UpdateProductCompanyDto
  extends Partial<CreateProductCompanyDto> {}

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

// Forward declarations for circular references
import { EquipmentStatus } from "./enums";

export interface Equipment {
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
  createdAt: string;
  updatedAt: string;
  companyId?: number | null;
  categoryId?: number | null;
  typeId?: number | null;
  modelId?: number | null;
}

export interface EquipmentModel {
  id: number;
  name: string;
  code?: string | null;
  year?: number | null;
  description?: string | null;
  typeId?: number | null;
  brandId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  cuit: string;
  name: string;
  businessName?: string | null;
  information?: string | null;
  createdAt: string;
  updatedAt: string;
  businessCategoryId?: number | null;
}
