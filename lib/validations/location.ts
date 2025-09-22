// filepath: sae-frontend/lib/validations/location.ts
import { z } from "zod";

export const CitySchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "Máximo 100 caracteres"),
  postalCode: z
    .string()
    .min(1, "El código postal es requerido")
    .max(20, "Máximo 20 caracteres"),
  provinceId: z.number().int("Debe ser un número entero").positive("Debe ser un número positivo"),
});

export type CityFormData = z.infer<typeof CitySchema>;

export const AddressSchema = z.object({
  street: z.string().max(150, "Máximo 150 caracteres").optional(),
  number: z.string().max(10, "Máximo 10 caracteres").optional(),
  floor: z.string().max(10, "Máximo 10 caracteres").optional(),
  apartment: z.string().max(10, "Máximo 10 caracteres").optional(),
  postalCode: z.string().max(20, "Máximo 20 caracteres").optional(),
  neighborhood: z.string().max(100, "Máximo 100 caracteres").optional(),
  reference: z.string().max(255, "Máximo 255 caracteres").optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isActive: z.boolean().optional(),
  cityId: z.number().int("Debe ser un número entero").positive("Debe ser un número positivo"),
  personId: z.number().int().positive().optional(),
  companyId: z.number().int().positive().optional(),
});

export type AddressFormData = z.infer<typeof AddressSchema>;
