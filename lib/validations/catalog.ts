// file: sae-frontend/lib/validations/catalog.ts
import { z } from "zod";

// ===== Brands =====
export const BrandSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "Máximo 100 caracteres"),
  code: z
    .string()
    .min(1, "El código es requerido")
    .max(50, "Máximo 50 caracteres")
    .regex(/^[A-Z0-9_\-\.]+$/i, "Solo letras, números, guiones y guiones bajos"),
  information: z.string().max(255, "Máximo 255 caracteres").optional(),
});

export type BrandFormData = z.infer<typeof BrandSchema>;

export const UpdateBrandSchema = BrandSchema.partial();
export type UpdateBrandFormData = z.infer<typeof UpdateBrandSchema>;

// ===== Units =====
export const UnitSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(50, "Máximo 50 caracteres"),
  abbreviation: z
    .string()
    .min(1, "La abreviatura es requerida")
    .max(10, "Máximo 10 caracteres")
    .regex(/^[A-Za-zµμ\.]+$/, "Abreviatura inválida"),
});

export type UnitFormData = z.infer<typeof UnitSchema>;

export const UpdateUnitSchema = UnitSchema.partial();
export type UpdateUnitFormData = z.infer<typeof UpdateUnitSchema>;