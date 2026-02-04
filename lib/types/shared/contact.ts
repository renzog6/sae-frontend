// filepath: sae-frontend/lib/types/shared/contact.ts
import { ContactType } from "./enums";

export interface ContactLink {
  id: number;
  contactId: number;
  companyId?: number | null;
  personId?: number | null;
  // Optionally hydrate
  company?: { id: number; name: string } | null;
  person?: { id: number; firstName: string; lastName: string } | null;
  contact?: Contact | null;
}

export interface Contact {
  id: number;
  type: ContactType;
  value: string;
  label?: string | null;
  information?: string | null;
  contactLinks?: ContactLink[];
}

export interface CreateContactLinkDto {
  contactId: number;
  companyId?: number;
  personId?: number;
}

export interface UpdateContactLinkDto extends Partial<CreateContactLinkDto> { }
