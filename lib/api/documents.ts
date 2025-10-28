// filepath: sae-frontend/lib/api/documents.ts

import { ApiClient } from "./apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import {
  Document,
  UploadDocumentData,
  CreateDocumentDto,
} from "@/lib/types/document";

export class DocumentsService {
  private static basePath = "/documents";

  static async getDocuments(filter?: {
    employeeId?: number;
    companyId?: number;
  }) {
    const query = new URLSearchParams();
    if (filter?.employeeId) query.set("employeeId", String(filter.employeeId));
    if (filter?.companyId) query.set("companyId", String(filter.companyId));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<Document>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getDocumentById(id: number) {
    const response = await ApiClient.get<Document>(`${this.basePath}/${id}`);
    return response;
  }

  static async uploadDocument(data: UploadDocumentData) {
    const formData = new FormData();
    formData.append("file", data.file);
    if (data.description) formData.append("description", data.description);
    if (data.employeeId) formData.append("employeeId", String(data.employeeId));
    if (data.companyId) formData.append("companyId", String(data.companyId));

    const response = await ApiClient.post<Document>(
      "/documents/upload",
      formData
    );
    return response;
  }

  static async updateDocument(id: number, data: Partial<CreateDocumentDto>) {
    const response = await ApiClient.put<Document>(
      `${this.basePath}/${id}`,
      data
    );
    return response;
  }

  static async deleteDocument(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Document deleted";
  }

  static async downloadDocument(id: number) {
    return ApiClient.getBlob(`${this.basePath}/${id}/download`);
  }
}
