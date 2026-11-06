
export interface ServerFile {
    id: number;
    filename: string;
    mimetype: string;
    size: number;
    path: string;
    description?: string;
    uploadedAt: string;
    isActive: boolean;
    deletedAt?: string | null;
    // Relations (optional in frontend response usually)
    employeeId?: number;
    companyId?: number;
}

export interface DocumentAuditLog {
    id: number;
    action: "LOGICAL_DELETE";
    serverFileId: number;
    filename: string;
    mimetype: string;
    size: number;
    description?: string | null;
    employeeId?: number | null;
    companyId?: number | null;
    eventDate: string;
}

export type EntityType = "EMPLOYEE" | "COMPANY";

export interface UploadServerFileData {
    file: File;
    description?: string;
    entityType: EntityType;
    entityId: number;
}

export interface CreateServerFileDto {
    filename: string;
    mimetype: string;
    size: number;
    path: string;
    description?: string;
    entityType: EntityType;
    entityId: number;
}

export interface UpdateServerFileDto extends Partial<CreateServerFileDto> { }
