// filepath: sae-frontend/lib/api/documents/documents.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";

import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";

import {
  Document,
  UploadDocumentData,
  CreateDocumentDto,
} from "@/lib/types/domain/document";

import { QueryBuilder } from "@/lib/api/queryBuilder";

export interface DocumentQueryParams extends BaseQueryParams {
  employeeId?: number;
  companyId?: number;
  equipmentId?: number; // Preparado para futuro
}

class DocumentsServiceClass extends BaseApiService<
  Document,
  CreateDocumentDto,
  Partial<CreateDocumentDto>
> {
  protected basePath = "/documents";

  /**
   * Override: GET ALL con filtros especiales
   * Mantiene paginado y filtros dinámicos employeeId/companyId/equipmentId
   */
  async getAll(
    filter?: DocumentQueryParams
  ): Promise<PaginatedResponse<Document>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        // 1. Query estándar (page, limit, search)
        const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

        // 2. Filtros específicos (documentos por entidad)
        const specificParams = {
          employeeId: filter?.employeeId,
          companyId: filter?.companyId,
          equipmentId: filter?.equipmentId,
        };

        const specificQuery = QueryBuilder.buildSpecific(specificParams);

        // 3. URL final combinada
        const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

        return ApiClient.get<PaginatedResponse<Document>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }

  /**
   * UPLOAD con FormData
   * Endpoint custom: /documents/upload
   */
  async upload(data: UploadDocumentData): Promise<Document> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const formData = new FormData();

        formData.append("file", data.file);
        if (data.description) formData.append("description", data.description);
        if (data.employeeId !== undefined)
          formData.append("employeeId", String(data.employeeId));
        if (data.companyId !== undefined)
          formData.append("companyId", String(data.companyId));

        const res = await ApiClient.post<ApiResponse<Document>>(
          `${this.basePath}/upload`,
          formData
        );
        return res.data;
      },
      this.constructor.name,
      "upload",
      { data }
    );
  }

  /**
   * DOWNLOAD usando método centralizado del BaseApiService
   */
  async downloadById(id: number): Promise<void> {
    return this.downloadFile(`${id}/download`, `file_${id}`);
  }

  /**
   * Preview en nueva pestaña (PDF viewer)
   * Opcional pero muy útil
   */
  async preview(id: number): Promise<void> {
    return this.openInNewTab(`${id}/download`);
  }

  /**
   * Helper: método que llama al BaseApiService.download()
   * con nombre generado dinámicamente
   */
  private async downloadFile(relativePath: string, filename: string) {
    return super.download(relativePath, filename);
  }
}

export const DocumentsService = new DocumentsServiceClass();
