// filepath: sae-frontend/lib/validations/employee.ts
import { z } from "zod";
import { EmployeeStatus } from "@/types/employee";
import type { Employee } from "@/types/employee";

// Match backend CreateEmployeeDto constraints
export const createEmployeeSchema = z.object({
  employeeCode: z
    .string()
    .max(50, "Máximo 50 caracteres")
    .optional()
    .nullable()
    .transform((v) => v ?? undefined),
  information: z
    .string()
    .max(500, "Máximo 500 caracteres")
    .optional()
    .nullable()
    .transform((v) => v ?? undefined),
  status: z.nativeEnum(EmployeeStatus).optional(),
  hireDate: z.string().min(1, "Fecha de ingreso requerida"), // ISO string
  endDate: z
    .string()
    .optional()
    .nullable()
    .transform((v) => v ?? undefined),
  companyId: z
    .number()
    .int()
    .positive()
    .optional()
    .nullable()
    .transform((v) => v ?? undefined),
  categoryId: z.number().int().positive(),
  positionId: z.number().int().positive(),
  personId: z.number().int().positive(),
});

export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;

// UpdateEmployeeDto is PartialType(CreateEmployeeDto)
export const updateEmployeeSchema = createEmployeeSchema.partial();
export type UpdateEmployeeFormData = z.infer<typeof updateEmployeeSchema>;
// Input type for update form (what resolver receives before transforms)
export type UpdateEmployeeFormInput = z.input<typeof updateEmployeeSchema>;

// ----- Helper defaults for forms -----
export const createEmployeeDefaultValues: Partial<CreateEmployeeFormData> = {
  employeeCode: "00000",
  information: "",
  status: EmployeeStatus.ACTIVE,
  hireDate: new Date().toISOString(),
  endDate: undefined,
  companyId: undefined,
  categoryId: undefined,
  positionId: undefined,
  personId: undefined,
};

export function employeeToUpdateForm(emp: Employee): UpdateEmployeeFormData {
  return {
    employeeCode: emp.employeeCode ?? undefined,
    information: emp.information ?? undefined,
    status: emp.status,
    hireDate: emp.hireDate,
    endDate: emp.endDate ?? undefined,
    companyId: emp.companyId ?? undefined,
    categoryId: emp.categoryId,
    positionId: emp.positionId,
    personId: emp.personId,
  };
}

// ----- Validation schemas for employee categories -----
/**
 * Zod schema for validating an employee category object.
 *
 * - `name`: Required string. Must not be empty. Error message: "El nombre es requerido".
 * - `code`: Optional string. Defaults to an empty string if not provided.
 * - `information`: Optional string. Defaults to an empty string if not provided.
 */
export const EmployeeCategorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  code: z.string().optional().default(""),
  information: z.string().optional().default(""),
});

export const UpdateEmployeeCategorySchema = EmployeeCategorySchema.partial();

export type EmployeeCategoryFormData = z.infer<typeof EmployeeCategorySchema>;
// Input type (what the schema accepts before applying defaults/transforms)
export type EmployeeCategoryFormInput = z.input<typeof EmployeeCategorySchema>;
export type UpdateEmployeeCategoryFormData = Partial<EmployeeCategoryFormData>;

// ----- Validation schemas for employee positions -----
export const EmployeePositionSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  code: z.string().optional().default(""),
  information: z.string().optional().default(""),
});

export const UpdateEmployeePositionSchema = EmployeePositionSchema.partial();

export type EmployeePositionFormData = z.infer<typeof EmployeePositionSchema>;
// Input type (what the schema accepts before applying defaults/transforms)
export type EmployeePositionFormInput = z.input<typeof EmployeePositionSchema>;
export type UpdateEmployeePositionFormData = Partial<EmployeePositionFormData>;
