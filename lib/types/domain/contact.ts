export enum ContactType {
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    MOBILE = "MOBILE",
    WEBSITE = "WEBSITE",
    FACEBOOK = "FACEBOOK",
    INSTAGRAM = "INSTAGRAM",
    LINKEDIN = "LINKEDIN",
    WHATSAPP = "WHATSAPP",
    OTHER = "OTHER",
}

export interface Contact {
    id: number;
    type: ContactType;
    value: string;
    label?: string | null;
    information?: string | null;
    personId?: number | null;
    companyId?: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateContactDto {
    type: ContactType;
    value: string;
    label?: string;
    information?: string;
    personId?: number;
    companyId?: number;
}

export interface UpdateContactDto extends Partial<CreateContactDto> { }
