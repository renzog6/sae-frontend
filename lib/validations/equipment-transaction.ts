// filepath: sae-frontend/lib/validations/equipment-transaction.ts

import { z } from "zod";

export const createEquipmentTransactionSchema = z.object({
  equipmentId: z
    .number()
    .int()
    .positive("El ID del equipo debe ser un número positivo"),
  companyId: z
    .number()
    .int()
    .positive("El ID de la empresa debe ser un número positivo"),
  type: z.enum(["PURCHASE", "SALE"]),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha debe ser válida",
  }),
  amount: z.number().min(0, "El monto debe ser mayor o igual a 0"),
  currency: z.string().min(1, "La moneda es requerida"),
  exchangeRate: z
    .number()
    .min(0, "El tipo de cambio debe ser mayor o igual a 0")
    .optional(),
  observation: z.string().optional(),
});

export const updateEquipmentTransactionSchema =
  createEquipmentTransactionSchema.partial();

export type CreateEquipmentTransactionFormData = z.infer<
  typeof createEquipmentTransactionSchema
>;
export type UpdateEquipmentTransactionFormData = z.infer<
  typeof updateEquipmentTransactionSchema
>;
