// file: sae-frontend/types/contact.ts
import { PaginatedResponse } from "./api";

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

// Helpers
export type ContactsPage = PaginatedResponse<Contact>;
