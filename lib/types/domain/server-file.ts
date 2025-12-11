
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
