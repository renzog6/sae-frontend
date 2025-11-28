// filepath: sae-frontend/lib/types/domain/document.ts

export interface Document {
  id: number;
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  description?: string;
  uploadedAt: string;
  employeeId?: number;
  companyId?: number;
}

export interface UploadDocumentData {
  file: File;
  description?: string;
  employeeId?: number;
  companyId?: number;
}

export interface CreateDocumentDto {
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  description?: string;
  employeeId?: number;
  companyId?: number;
}

export interface UpdateDocumentDto extends Partial<CreateDocumentDto> {}
