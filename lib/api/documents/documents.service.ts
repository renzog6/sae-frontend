// filepath: sae-frontend/lib/api/documents/documents.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
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
    return ApiErrorHandler.handleApiCall(
      async () => {
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

        const response = await ApiClient.get<PaginatedResponse<Document>>(
          finalUrl
        );
        return response;
      },
      "DocumentsService",
      "getAll",
      { filter }
    );
  }

  static async getById(id: number): Promise<Document> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Document>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "DocumentsService",
      "getById",
      { id }
    );
  }

  static async upload(data: UploadDocumentData): Promise<Document> {
    return ApiErrorHandler.handleApiCall(
      async () => {
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

        const response = await ApiClient.post<ApiResponse<Document>>(
          "/documents/upload",
          formData
        );
        return response.data;
      },
      "DocumentsService",
      "upload",
      { data }
    );
  }

  static async update(
    id: number,
    data: Partial<CreateDocumentDto>
  ): Promise<Document> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Document>>(
          `${this.basePath}/${id}`,
          data
        );
        return response.data;
      },
      "DocumentsService",
      "update",
      { id, data }
    );
  }

  static async delete(id: number): Promise<string> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Document deleted";
      },
      "DocumentsService",
      "delete",
      { id }
    );
  }

  static async download(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.getBlob(`${this.basePath}/${id}/download`);
      },
      "DocumentsService",
      "download",
      { id }
    );
  }
}
