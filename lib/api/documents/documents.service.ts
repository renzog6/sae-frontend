// filepath: sae-frontend/lib/api/documents/documents.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { unwrap } from "@/lib/api/utils";
import {
  Document,
  UploadDocumentData,
  CreateDocumentDto,
} from "@/lib/types/document";

export class DocumentsService {
  private static basePath = "/documents";

  static async getAll(filter?: {
    employeeId?: number;
    companyId?: number;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Document>> {
    const query = new URLSearchParams();
    if (filter?.employeeId) query.set("employeeId", String(filter.employeeId));
    if (filter?.companyId) query.set("companyId", String(filter.companyId));
    if (filter?.page) query.set("page", String(filter.page));
    if (filter?.limit) query.set("limit", String(filter.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<Document>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getById(id: number): Promise<Document> {
    const response = await ApiClient.get<Document | { data: Document }>(
      `${this.basePath}/${id}`
    );
    return unwrap<Document>(response);
  }

  static async upload(data: UploadDocumentData): Promise<Document> {
    const formData = new FormData();
    formData.append("file", data.file);
    if (data.description) formData.append("description", data.description);
    // Only append one of employeeId or companyId, not both
    // FormData converts undefined to "undefined" string, so we must check !== undefined
    if (data.employeeId !== undefined) {
      formData.append("employeeId", String(data.employeeId));
    }
    if (data.companyId !== undefined) {
      formData.append("companyId", String(data.companyId));
    }

    const response = await ApiClient.post<Document | { data: Document }>(
      "/documents/upload",
      formData
    );
    return unwrap<Document>(response);
  }

  static async update(
    id: number,
    data: Partial<CreateDocumentDto>
  ): Promise<Document> {
    const response = await ApiClient.put<Document | { data: Document }>(
      `${this.basePath}/${id}`,
      data
    );
    return unwrap<Document>(response);
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Document deleted";
  }

  static async download(id: number) {
    return ApiClient.getBlob(`${this.basePath}/${id}/download`);
  }
}
