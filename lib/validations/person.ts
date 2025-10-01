// filepath: sae-frontend/lib/validations/person.ts
import { z } from "zod";
import { Gender, MaritalStatus, PersonStatus } from "@/types/employee";
import type { Person } from "@/types/employee";

export const createPersonSchema = z.object({
  firstName: z.string().min(1, "Nombre requerido").max(100),
  lastName: z.string().min(1, "Apellido requerido").max(100),
  birthDate: z.string().optional().nullable().transform((v) => (v ?? undefined)), // ISO
  dni: z.string().max(50).optional().nullable().transform((v) => (v ?? undefined)),
  cuil: z.string().max(50).optional().nullable().transform((v) => (v ?? undefined)),
  gender: z.nativeEnum(Gender).optional(),
  maritalStatus: z.nativeEnum(MaritalStatus).optional(),
  information: z.string().max(500).optional().nullable().transform((v) => (v ?? undefined)),
  status: z.nativeEnum(PersonStatus).optional(),
});

export type CreatePersonFormData = z.infer<typeof createPersonSchema>;

export const updatePersonSchema = createPersonSchema.partial();
export type UpdatePersonFormData = z.infer<typeof updatePersonSchema>;
// Input type for resolver
export type UpdatePersonFormInput = z.input<typeof updatePersonSchema>;

// ----- Helper defaults for forms -----
export const createPersonDefaultValues: Partial<CreatePersonFormData> = {
  firstName: "",
  lastName: "",
  birthDate: undefined,
  dni: undefined,
  cuil: undefined,
  gender: undefined,
  maritalStatus: undefined,
  information: "",
  status: PersonStatus.ACTIVE,
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
