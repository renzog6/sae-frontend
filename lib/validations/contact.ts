// file: sae-frontend/lib/validations/contact.ts
import { z } from "zod";
import { ContactType } from "@/lib/types/shared/enums";

export const ContactSchema = z
  .object({
    type: z.nativeEnum(ContactType),
    value: z.string().min(1, "Valor requerido"),
    label: z.string().optional(),
    information: z.string().optional(),
    companyId: z.number().int().optional(),
    personId: z.number().int().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === ContactType.EMAIL) {
      const emailSchema = z.string().email();
      const res = emailSchema.safeParse(data.value);
      if (!res.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email inválido",
          path: ["value"],
        });
      }
    }
    if (data.type === ContactType.PHONE || data.type === ContactType.WHATSAPP) {
      const phoneSchema = z.string().regex(/^\+\d{7,15}$/);
      const res = phoneSchema.safeParse(data.value);
      if (!res.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Teléfono en formato E.164 (ej. +5491112345678)",
          path: ["value"],
        });
      }
    }
  });

export type ContactFormData = z.infer<typeof ContactSchema>;

export const UpdateContactSchema = ContactSchema.partial().extend({
  companyId: z.number().int().nullable().optional(),
  personId: z.number().int().nullable().optional(),
});
export type UpdateContactFormData = z.infer<typeof UpdateContactSchema>;
