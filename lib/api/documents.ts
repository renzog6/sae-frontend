// filepath: sae-frontend/lib/api/documents.ts

import { ApiClient } from "./apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { normalizeListResponse } from "@/lib/api/utils";
import {
  Document,
  UploadDocumentData,
  CreateDocumentDto,
} from "@/types/document";

function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

export class DocumentsService {
  static async getDocuments(
    accessToken: string,
    filter?: { employeeId?: number; companyId?: number }
  ) {
    const query = new URLSearchParams();
    if (filter?.employeeId) query.set("employeeId", String(filter.employeeId));
    if (filter?.companyId) query.set("companyId", String(filter.companyId));
    const qs = query.toString();
    const response = await ApiClient.request<
      Document[] | PaginatedResponse<Document>
    >(`/documents${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return normalizeListResponse<Document>(response as any);
  }

  static async getDocumentById(id: number, accessToken: string) {
    const response = await ApiClient.request<Document | ApiResponse<Document>>(
      `/documents/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Document>(response);
  }

  static async uploadDocument(data: UploadDocumentData, accessToken: string) {
    const formData = new FormData();
    formData.append("file", data.file);
    if (data.description) formData.append("description", data.description);
    if (data.employeeId) formData.append("employeeId", String(data.employeeId));
    if (data.companyId) formData.append("companyId", String(data.companyId));

    const response = await ApiClient.request<Document | ApiResponse<Document>>(
      "/documents/upload",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      }
    );
    return unwrap<Document>(response);
  }

  static async updateDocument(
    id: number,
    data: Partial<CreateDocumentDto>,
    accessToken: string
  ) {
    const response = await ApiClient.request<Document | ApiResponse<Document>>(
      `/documents/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Document>(response);
  }

  static async deleteDocument(id: number, accessToken: string) {
    await ApiClient.request(`/documents/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Document deleted";
  }

  static async downloadDocument(id: number, accessToken: string) {
    return ApiClient.requestBlob(`/documents/${id}/download`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}
