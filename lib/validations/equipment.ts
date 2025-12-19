// filepath: sae-frontend/lib/validations/equipment.ts
import { z } from "zod";

// Equipment Category validations
export const createEquipmentCategoryFormInputSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(25, "Máximo 25 caracteres"),
  code: z.string().max(25, "Máximo 25 caracteres").optional(),
  description: z.string().max(255, "Máximo 255 caracteres").optional(),
});

export const equipmentCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(25, "Máximo 25 caracteres"),
  code: z.string().max(25, "Máximo 25 caracteres").optional(),
  description: z.string().max(255, "Máximo 255 caracteres").optional(),
});

export const updateEquipmentCategoryFormData =
  equipmentCategoryFormSchema.partial();

// Equipment Type validations
export const createEquipmentTypeFormInputSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(25, "Máximo 25 caracteres"),
  code: z.string().max(25, "Máximo 25 caracteres").optional(),
  description: z.string().max(255, "Máximo 255 caracteres").optional(),
  categoryId: z.number().int().positive("Categoría requerida").optional(),
});

export const equipmentTypeFormSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(25, "Máximo 25 caracteres"),
  code: z.string().max(25, "Máximo 25 caracteres").optional(),
  description: z.string().max(255, "Máximo 255 caracteres").optional(),
  categoryId: z.number().int().positive("Categoría requerida").optional(),
});

export const updateEquipmentTypeFormData = equipmentTypeFormSchema.partial();

// Equipment Model validations
export const createEquipmentModelFormInputSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(25, "Máximo 25 caracteres"),
  code: z.string().max(25, "Máximo 25 caracteres").optional(),
  year: z
    .number()
    .int()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear() + 1, "Año inválido")
    .optional(),
  description: z.string().max(255, "Máximo 255 caracteres").optional(),
  typeId: z.number().int().positive("Tipo requerido").optional(),
  brandId: z.number().int().positive("Marca requerida").optional(),
});

export const equipmentModelFormSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(25, "Máximo 25 caracteres"),
  code: z.string().max(25, "Máximo 25 caracteres").optional(),
  year: z
    .number()
    .int()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear() + 1, "Año inválido")
    .optional(),
  description: z.string().max(255, "Máximo 255 caracteres").optional(),
  typeId: z.number().int().positive("Tipo requerido").optional(),
  brandId: z.number().int().positive("Marca requerida").optional(),
});

export const updateEquipmentModelFormData = equipmentModelFormSchema.partial();

// Equipment validations
export const createEquipmentFormInputSchema = z.object({
  internalCode: z.string().max(50, "Máximo 50 caracteres").optional(),
  name: z.string().max(50, "Máximo 50 caracteres").optional(),
  description: z.string().optional(),
  observation: z.string().optional(),
  year: z
    .number()
    .int()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear() + 1, "Año inválido")
    .optional(),
  licensePlate: z.string().max(20, "Máximo 20 caracteres").optional(),
  chassis: z.string().max(50, "Máximo 50 caracteres").optional(),
  engine: z.string().max(50, "Máximo 50 caracteres").optional(),
  color: z.string().max(25, "Máximo 25 caracteres").optional(),
  // information: z.string().optional(),
  fuelType: z
    .enum(["DIESEL", "GASOLINE", "ELECTRIC", "HYBRID", "LPG", "CNG", "NONE"])
    .optional(),
  status: z
    .enum(["ACTIVE", "INACTIVE", "MAINTENANCE", "RETIRED", "SOLD"])
    .optional(),
  companyId: z.number().int().positive("Empresa requerida").optional(),
  categoryId: z.number().int().positive("Categoría requerida").optional(),
  typeId: z.number().int().positive("Tipo requerido").optional(),
  modelId: z.number().int().positive("Modelo requerido").optional(),
});

export const equipmentFormSchema = z.object({
  internalCode: z.string().max(50, "Máximo 50 caracteres").optional(),
  name: z.string().max(50, "Máximo 50 caracteres").optional(),
  description: z.string().optional(),
  observation: z.string().optional(),
  year: z
    .number()
    .int()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear() + 1, "Año inválido")
    .optional(),
  licensePlate: z.string().max(20, "Máximo 20 caracteres").optional(),
  chassis: z.string().max(50, "Máximo 50 caracteres").optional(),
  engine: z.string().max(50, "Máximo 50 caracteres").optional(),
  color: z.string().max(25, "Máximo 25 caracteres").optional(),
  information: z.string().optional(),
  fuelType: z
    .enum(["DIESEL", "GASOLINE", "ELECTRIC", "HYBRID", "LPG", "CNG", "NONE"])
    .optional(),
  status: z
    .enum(["ACTIVE", "INACTIVE", "MAINTENANCE", "RETIRED", "SOLD"])
    .optional(),
  companyId: z.number().int().positive("Empresa requerida").optional(),
  categoryId: z.number().int().positive("Categoría requerida").optional(),
  typeId: z.number().int().positive("Tipo requerido").optional(),
  modelId: z.number().int().positive("Modelo requerido").optional(),
});

export const updateEquipmentFormData = equipmentFormSchema.partial();

// Type exports
export type EquipmentCategoryFormInput = z.input<
  typeof createEquipmentCategoryFormInputSchema
>;
export type EquipmentCategoryFormData = z.infer<
  typeof equipmentCategoryFormSchema
>;
export type UpdateEquipmentCategoryFormData = z.infer<
  typeof updateEquipmentCategoryFormData
>;

export type EquipmentTypeFormInput = z.input<
  typeof createEquipmentTypeFormInputSchema
>;
export type EquipmentTypeFormData = z.infer<typeof equipmentTypeFormSchema>;
export type UpdateEquipmentTypeFormData = z.infer<
  typeof updateEquipmentTypeFormData
>;

export type EquipmentModelFormInput = z.input<
  typeof createEquipmentModelFormInputSchema
>;
export type EquipmentModelFormData = z.infer<typeof equipmentModelFormSchema>;
export type UpdateEquipmentModelFormData = z.infer<
  typeof updateEquipmentModelFormData
>;

export type EquipmentFormInput = z.input<typeof createEquipmentFormInputSchema>;
export type EquipmentFormData = z.infer<typeof equipmentFormSchema>;
export type UpdateEquipmentFormData = z.infer<typeof updateEquipmentFormData>;
