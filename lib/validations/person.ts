// filepath: sae-frontend/lib/validations/person.ts
import { z } from "zod";
import {
  Gender,
  MaritalStatus,
  PersonStatus,
} from "@/lib/types/domain/employee";
import type { Person } from "@/lib/types/domain/employee";

export const createPersonSchema = z.object({
  firstName: z.string().min(1, "Nombre requerido").max(100),
  lastName: z.string().min(1, "Apellido requerido").max(100),
  birthDate: z.string().min(1, "Fecha de nacimiento requerida"),
  dni: z.string().min(1, "DNI requerido").max(50),
  cuil: z.string().min(1, "CUIL requerido").max(50),
  gender: z.nativeEnum(Gender, { message: "Género requerido" }),
  maritalStatus: z.nativeEnum(MaritalStatus, { message: "Estado civil requerido" }),
  information: z
    .string()
    .max(500)
    .optional()
    .nullable()
    .transform((v) => v ?? undefined),
  status: z.nativeEnum(PersonStatus).optional(),
  hireDate: z.string().min(1, "Fecha de ingreso requerida"),
  categoryId: z.number().int().positive("Categoría requerida"),
  positionId: z.number().int().positive("Puesto requerido"),
});

export type CreatePersonFormData = z.infer<typeof createPersonSchema>;
export type CreatePersonFormInput = z.input<typeof createPersonSchema>;

export const updatePersonSchema = createPersonSchema.partial();
export type UpdatePersonFormData = z.infer<typeof updatePersonSchema>;
// Input type for resolver
export type UpdatePersonFormInput = z.input<typeof updatePersonSchema>;

// ----- Helper defaults for forms -----
export const createPersonDefaultValues: Partial<CreatePersonFormData> = {
  firstName: "",
  lastName: "",
  birthDate: "",
  dni: "",
  cuil: "",
  gender: undefined,
  maritalStatus: undefined,
  information: "",
  status: PersonStatus.ACTIVE,
  hireDate: "",
  categoryId: undefined,
  positionId: undefined,
};

export function personToUpdateForm(p: Person): UpdatePersonFormData {
  return {
    firstName: p.firstName,
    lastName: p.lastName,
    birthDate: p.birthDate ?? undefined,
    dni: p.dni ?? undefined,
    cuil: p.cuil ?? undefined,
    gender: p.gender ?? undefined,
    maritalStatus: p.maritalStatus ?? undefined,
    information: p.information ?? undefined,
    status: p.status ?? undefined,
  };
}
