// filepath: sae-frontend/lib/types/domain/contact.ts
import { ContactType } from "../shared/enums";

export interface CreateContactDto {
  type: ContactType;
  value: string;
  label?: string;
  information?: string;
  companyId?: number;
  personId?: number;
}

export interface UpdateContactDto {
  type?: ContactType;
  value?: string;
  label?: string;
  information?: string;
  companyId?: number | null;
  personId?: number | null;
}
