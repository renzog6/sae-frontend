// filepath: sae-frontend/lib/api/base-api.service.ts

import { ApiClient } from "./apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  BaseQueryParams,
  ApiResponse,
  PaginatedResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";

export abstract class BaseApiService<
  TEntity,
  TCreateDto = any,
  TUpdateDto = any
> {
  protected abstract basePath: string;

  // GET ALL (paginado)
  async getAll(query?: BaseQueryParams): Promise<PaginatedResponse<TEntity>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        return ApiClient.get<PaginatedResponse<TEntity>>(url);
      },
      this.constructor.name,
      "getAll",
      { query }
    );
  }

  // GET BY ID
  async getById(id: number): Promise<TEntity> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<ApiResponse<TEntity>>(
          `${this.basePath}/${id}`
        );
        return res.data;
      },
      this.constructor.name,
      "getById",
      { id }
    );
  }

  // CREATE
  async create(dto: TCreateDto): Promise<TEntity> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.post<ApiResponse<TEntity>>(
          this.basePath,
          dto
        );
        return res.data;
      },
      this.constructor.name,
      "create",
      { dto }
    );
  }

  // UPDATE
  async update(id: number, dto: TUpdateDto): Promise<TEntity> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.put<ApiResponse<TEntity>>(
          `${this.basePath}/${id}`,
          dto
        );
        return res.data;
      },
      this.constructor.name,
      "update",
      { id, dto }
    );
  }

  // DELETE
  async delete(id: number): Promise<void> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
      },
      this.constructor.name,
      "delete",
      { id }
    );
  }

  /**
   * Método genérico para manejo de descargas
   */
  async download(relativePath: string, filename: string): Promise<void> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = `${this.basePath}/${relativePath}`;
        const blob = await ApiClient.getBlob(url);

        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(blobUrl);
      },
      this.constructor.name,
      "download",
      { relativePath, filename }
    );
  }

  /**
   * Abre un archivo en una nueva pestaña sin forzar descarga.
   */
  async openInNewTab(relativePath: string): Promise<void> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = `${this.basePath}/${relativePath}`;
        const blob = await ApiClient.getBlob(url);

        const blobUrl = URL.createObjectURL(blob);

        // Abrir en nueva pestaña
        window.open(blobUrl, "_blank");

        // IMPORTANTE: dejar un delay pequeño antes de revocar
        // para que el navegador no invalide el blobUrl antes de tiempo
        setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
      },
      this.constructor.name,
      "openInNewTab",
      { relativePath }
    );
  }
}
