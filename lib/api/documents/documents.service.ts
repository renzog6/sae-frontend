// filepath: sae-frontend/lib/api/documents/documents.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  Document,
  UploadDocumentData,
  CreateDocumentDto,
} from "@/lib/types/domain/document";

// Interface específica para documentos
interface DocumentQueryParams extends BaseQueryParams {
  employeeId?: number;
  companyId?: number;
  equipmentId?: number; // 👈 PARA EL FUTURO
}

export class DocumentsService {
  private static basePath = "/documents";

  static async getAll(
    filter?: DocumentQueryParams
  ): Promise<PaginatedResponse<Document>> {
    // 1. URL base con filtros comunes (paginación, búsqueda, etc.)
    const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

    // 2. Filtros específicos de documentos
    const specificParams = {
      employeeId: filter?.employeeId,
      companyId: filter?.companyId,
      equipmentId: filter?.equipmentId, // 👈 LISTO PARA EL FUTURO
    };
    const specificQuery = QueryBuilder.buildSpecific(specificParams);

    // 3. Combinar URLs
    const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

    const response = await ApiClient.get<PaginatedResponse<Document>>(finalUrl);
    return response;
  }

  static async getById(id: number): Promise<Document> {
    const response = await ApiClient.get<{ data: Document }>(
      `${this.basePath}/${id}`
    );
    return response.data;
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

    const response = await ApiClient.post<{ data: Document }>(
      "/documents/upload",
      formData
    );
    return response.data;
  }

  static async update(
    id: number,
    data: Partial<CreateDocumentDto>
  ): Promise<Document> {
    const response = await ApiClient.put<{ data: Document }>(
      `${this.basePath}/${id}`,
      data
    );
    return response.data;
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Document deleted";
  }

  static async download(id: number) {
    return ApiClient.getBlob(`${this.basePath}/${id}/download`);
  }
}
