// filepath: sae-frontend/lib/validations/employeeVacation.ts
import { z } from "zod";

export const VacationFormSchema = z.object({
  detail: z.string().max(50).optional().default(""), // max 50 chars, optional
  days: z.number().int().min(1, "Debe ser >= 1"),
  year: z.number().int().min(2000, "Año inválido"),
  startDate: z.string().min(1, "Fecha inicio requerida"), // expect YYYY-MM-DD or ISO
  settlementDate: z.string().min(1, "Fecha de liquidación requerida"), // UI only for ahora
  employeeId: z.number().int().positive(),
  type: z.enum(["ASSIGNED", "TAKEN"]),
});

export type EmployeeVacationFormInput = z.input<typeof VacationFormSchema>;
export type EmployeeVacationFormData = z.infer<typeof VacationFormSchema>;
export type UpdateEmployeeVacationFormData = Partial<EmployeeVacationFormData>;
