//filepath: sae-frontend/lib/api/tires/tires.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { Tire, CreateTireDto, UpdateTireDto } from "@/lib/types/domain/tire";

// Interface específica para neumáticos
interface TiresQueryParams extends BaseQueryParams {
  brandId?: number;
}

export class TiresService {
  private static basePath = "/tires";

  static async getAll(
    filter?: TiresQueryParams
  ): Promise<PaginatedResponse<Tire>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        // 1. URL base con filtros comunes (paginación, búsqueda, etc.)
        const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

        // 2. Filtros específicos de documentos
        const specificParams = {
          brandId: filter?.brandId,
        };
        const specificQuery = QueryBuilder.buildSpecific(specificParams);

        // 3. Combinar URLs
        const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

        const response = await ApiClient.get<PaginatedResponse<Tire>>(finalUrl);

        return response;
      },
      "TiresService",
      "getAll",
      { filter }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Tire>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "TiresService",
      "getById",
      { id }
    );
  }

  static async create(dto: CreateTireDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<Tire>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "TiresService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateTireDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Tire>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "TiresService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Tire deleted";
      },
      "TiresService",
      "delete",
      { id }
    );
  }
}
