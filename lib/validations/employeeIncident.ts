// filepath: sae-frontend/lib/validations/employeeIncident.ts
import { z } from "zod";
import { EmployeeIncidentType } from "@/types/history";

export const createEmployeeIncidentFormInputSchema = z.object({
  type: z.nativeEnum(EmployeeIncidentType),
  description: z
    .string()
    .min(1, "Descripción requerida")
    .max(500, "Máximo 500 caracteres"),
  startDate: z.string().min(1, "Fecha de inicio requerida"),
  endDate: z.string().min(1, "Fecha de fin requerida"),
  createdAt: z.string().optional(),
  doctorNote: z.boolean().default(false),
  paidLeave: z.boolean().default(false),
});

export const EmployeeIncidentFormSchema = z.object({
  type: z.nativeEnum(EmployeeIncidentType),
  description: z.string().min(1).max(500),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  createdAt: z.string().optional(),
  doctorNote: z.boolean().default(false),
  paidLeave: z.boolean().default(false),
  employeeId: z.number().int().positive(),
});

export type EmployeeIncidentFormInput = z.input<
  typeof createEmployeeIncidentFormInputSchema
>;
export type EmployeeIncidentFormData = z.infer<
  typeof EmployeeIncidentFormSchema
>;
export type UpdateEmployeeIncidentFormData = Partial<EmployeeIncidentFormData>;
