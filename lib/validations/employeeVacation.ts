// filepath: sae-frontend/lib/validations/employeeVacation.ts
import { z } from "zod";
import type { AvailableYear } from "@/lib/types/employee";

export const createVacationFormInputSchema = (
  availableYears: AvailableYear[]
) =>
  z
    .object({
      detail: z.string().max(50).optional().default(""), // max 50 chars, optional
      days: z.number().int().min(1, "Debe ser >= 1"),
      year: z.number().int().min(2000, "Año inválido"),
      startDate: z.string().min(1, "Fecha inicio requerida"), // expect YYYY-MM-DD or ISO
      settlementDate: z.string().min(1, "Fecha de liquidación requerida"), // UI only for ahora
    })
    .refine(
      (data) => {
        const available =
          availableYears.find((y) => y.year === data.year)?.available || 0;
        return data.days <= available;
      },
      {
        message:
          "Los días no pueden ser mayores a los disponibles para el año seleccionado",
        path: ["days"],
      }
    );

export const VacationFormSchema = z.object({
  detail: z.string().max(50).optional().default(""),
  days: z.number().int().min(1),
  year: z.number().int().min(2000),
  startDate: z.string().min(1),
  settlementDate: z.string().min(1),
  employeeId: z.number().int().positive(),
  type: z.enum(["ASSIGNED", "TAKEN"]),
});

export type EmployeeVacationFormInput = z.input<
  ReturnType<typeof createVacationFormInputSchema>
>;
export type EmployeeVacationFormData = z.infer<typeof VacationFormSchema>;
export type UpdateEmployeeVacationFormData = Partial<EmployeeVacationFormData>;

export const createVacationFormInputAssignedSchema = (
  availableYears: AvailableYear[],
  isEdit: boolean
) =>
  z
    .object({
      detail: z.string().max(50).optional().default(""), // max 50 chars, optional
      days: z.number().int().min(1, "Debe ser >= 1"),
      year: z.number().int().min(2000, "Año inválido"),
      startDate: z.string().optional(),
      settlementDate: z.string().optional(),
    })
    .refine(
      (data) => {
        if (isEdit) return true; // allow editing
        const assigned =
          availableYears.find((y) => y.year === data.year)?.assigned || 0;
        return assigned === 0;
      },
      {
        message:
          "No se pueden asignar nuevas vacaciones para un año que ya tiene asignadas",
        path: ["year"],
      }
    );

export type EmployeeVacationFormAssignedInput = z.input<
  ReturnType<typeof createVacationFormInputAssignedSchema>
>;
