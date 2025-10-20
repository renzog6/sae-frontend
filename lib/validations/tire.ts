// filepath: sae-frontend/lib/validations/tire.ts

import { z } from "zod";

// ===== TIRE VALIDATIONS =====

export const createTireSchema = z.object({
  serialNumber: z.string().min(1, "Serial number is required"),
  brandId: z.number().optional(),
  sizeId: z.number().optional(),
  model: z.string().optional(),
  position: z.string().optional(),
  status: z
    .enum(["IN_STOCK", "IN_USE", "UNDER_REPAIR", "RECAP", "DISCARDED"])
    .optional(),
  totalKm: z.number().min(0).optional(),
});

export const updateTireSchema = createTireSchema.partial();

export type CreateTireFormData = z.infer<typeof createTireSchema>;
export type UpdateTireFormData = z.infer<typeof updateTireSchema>;

// ===== TIRE SIZE VALIDATIONS =====

export const createTireSizeSchema = z.object({
  mainCode: z.string().min(1, "Main code is required"),
  width: z.number().min(1).optional(),
  aspectRatio: z.number().min(1).optional(),
  rimDiameter: z.number().min(1).optional(),
  construction: z.string().optional(),
  information: z.string().optional(),
});

export const updateTireSizeSchema = createTireSizeSchema.partial();

export type CreateTireSizeFormData = z.infer<typeof createTireSizeSchema>;
export type UpdateTireSizeFormData = z.infer<typeof updateTireSizeSchema>;

// ===== TIRE MODEL VALIDATIONS =====

export const createTireModelSchema = z.object({
  brandId: z.number().min(1, "Brand ID is required"),
  sizeId: z.number().min(1, "Size ID is required"),
  name: z.string().min(1, "Name is required"),
  loadIndex: z.number().min(1).optional(),
  speedSymbol: z.string().optional(),
  plyRating: z.string().optional(),
  treadPattern: z.string().optional(),
  information: z.string().optional(),
});

export const updateTireModelSchema = createTireModelSchema.partial();

export type CreateTireModelFormData = z.infer<typeof createTireModelSchema>;
export type UpdateTireModelFormData = z.infer<typeof updateTireModelSchema>;

// ===== TIRE SIZE ALIAS VALIDATIONS =====

export const createTireSizeAliasSchema = z.object({
  aliasCode: z.string().min(1, "Alias code is required"),
  tireSizeId: z.number().min(1, "Tire size ID is required"),
});

export const updateTireSizeAliasSchema = createTireSizeAliasSchema.partial();

export type CreateTireSizeAliasFormData = z.infer<
  typeof createTireSizeAliasSchema
>;
export type UpdateTireSizeAliasFormData = z.infer<
  typeof updateTireSizeAliasSchema
>;

// ===== TIRE ASSIGNMENT VALIDATIONS =====

export const mountTireSchema = z.object({
  tireId: z.number().min(1, "Tire ID is required"),
  equipmentId: z.number().min(1, "Equipment ID is required"),
  position: z.string().min(1, "Position is required"),
  kmAtStart: z.number().min(0).optional(),
  note: z.string().optional(),
});

export const unmountTireSchema = z.object({
  assignmentId: z.number().min(1, "Assignment ID is required"),
  kmAtEnd: z.number().min(0).optional(),
  note: z.string().optional(),
});

export type MountTireFormData = z.infer<typeof mountTireSchema>;
export type UnmountTireFormData = z.infer<typeof unmountTireSchema>;

// ===== TIRE ROTATION VALIDATIONS =====

export const createTireRotationSchema = z.object({
  tireId: z.number().min(1, "Tire ID is required"),
  fromEquipmentId: z.number().min(1).optional(),
  toEquipmentId: z.number().min(1).optional(),
  fromPosition: z.string().optional(),
  toPosition: z.string().optional(),
  rotationDate: z.string().optional(),
  kmAtRotation: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export const updateTireRotationSchema = createTireRotationSchema.partial();

export type CreateTireRotationFormData = z.infer<
  typeof createTireRotationSchema
>;
export type UpdateTireRotationFormData = z.infer<
  typeof updateTireRotationSchema
>;

// ===== TIRE RECAP VALIDATIONS =====

export const createTireRecapSchema = z.object({
  tireId: z.number().min(1, "Tire ID is required"),
  provider: z.string().optional(),
  cost: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export const updateTireRecapSchema = createTireRecapSchema.partial();

export type CreateTireRecapFormData = z.infer<typeof createTireRecapSchema>;
export type UpdateTireRecapFormData = z.infer<typeof updateTireRecapSchema>;

// ===== TIRE INSPECTION VALIDATIONS =====

export const createTireInspectionSchema = z.object({
  tireId: z.number().min(1, "Tire ID is required"),
  inspectionDate: z.string().optional(),
  pressure: z.number().min(0).optional(),
  treadDepth: z.number().min(0).optional(),
  observation: z.string().optional(),
});

export const updateTireInspectionSchema = createTireInspectionSchema.partial();

export type CreateTireInspectionFormData = z.infer<
  typeof createTireInspectionSchema
>;
export type UpdateTireInspectionFormData = z.infer<
  typeof updateTireInspectionSchema
>;

// ===== TIRE REPORT FILTER VALIDATIONS =====

export const tireReportFilterSchema = z.object({
  brand: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  minKm: z.number().min(0).optional(),
});

export type TireReportFilterFormData = z.infer<typeof tireReportFilterSchema>;
