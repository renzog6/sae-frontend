// filepath: sae-frontend/lib/types/shared/contact.ts
import { PaginatedResponse } from "../core/api";

export enum ContactType {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  WHATSAPP = "WHATSAPP",
  TELEGRAM = "TELEGRAM",
  INSTAGRAM = "INSTAGRAM",
  LINKEDIN = "LINKEDIN",
  OTHER = "OTHER",
}

export interface ContactLink {
  id: number;
  contactId: number;
  companyId?: number | null;
  personId?: number | null;
  // Optionally hydrate
  company?: { id: number; name: string } | null;
  person?: { id: number; firstName: string; lastName: string } | null;
}

export interface Contact {
  id: number;
  type: ContactType;
  value: string;
  label?: string | null;
  information?: string | null;
  contactLinks?: ContactLink[];
}

export interface CreateContactDto {
  type: ContactType;
  value: string;
  label?: string;
  information?: string;
}

export interface UpdateContactDto extends Partial<CreateContactDto> {}

export interface CreateContactLinkDto {
  contactId: number;
  companyId?: number;
  personId?: number;
}

export interface UpdateContactLinkDto extends Partial<CreateContactLinkDto> {}

// Helpers
export type ContactsPage = PaginatedResponse<Contact>;
