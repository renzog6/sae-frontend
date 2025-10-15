// file: sae-frontend/lib/validations/company.ts
import { z } from "zod";

// ===== Business Categories =====
export const BusinessCategorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100),
  code: z.string().max(50).optional(),
  information: z.string().max(255).optional(),
});
export type BusinessCategoryFormData = z.infer<typeof BusinessCategorySchema>;
export const UpdateBusinessCategorySchema = BusinessCategorySchema.partial();
export type UpdateBusinessCategoryFormData = z.infer<
  typeof UpdateBusinessCategorySchema
>;

// ===== Business Subcategories =====
export const BusinessSubcategorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100),
  description: z.string().max(255).optional(),
  businessCategoryId: z
    .number()
    .min(1, { message: "La categoría es requerida" }),
});
export type BusinessSubcategoryFormData = z.infer<
  typeof BusinessSubcategorySchema
>;
export const UpdateBusinessSubcategorySchema =
  BusinessSubcategorySchema.partial();
export type UpdateBusinessSubcategoryFormData = z.infer<
  typeof UpdateBusinessSubcategorySchema
>;

// ===== Company =====
export const CompanyAddressSchema = z.object({
  id: z.number().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  postalCode: z.string().optional(),
  neighborhood: z.string().optional(),
  reference: z.string().optional(),
  cityId: z.number(),
});

export const CompanySchema = z.object({
  cuit: z.string().min(1, "CUIT requerido"),
  name: z.string().min(1, "Nombre requerido").max(150),
  businessName: z.string().optional(),
  information: z.string().optional(),
  businessCategoryId: z.number().optional(),
  address: CompanyAddressSchema.optional(),
});
export type CompanyFormData = z.infer<typeof CompanySchema>;
export const UpdateCompanySchema = CompanySchema.partial();
export type UpdateCompanyFormData = z.infer<typeof UpdateCompanySchema>;
