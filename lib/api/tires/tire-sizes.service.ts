//filepath: sae-frontend/lib/api/tires/tire-sizes.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireSize,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  TireSizeAlias,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
} from "@/lib/types/domain/tire";

// ===== TIRE SIZE =====
export class TireSizesService {
  private static basePath = "/tires/sizes";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<PaginatedResponse<TireSize>>(url);
        return response;
      },
      "TireSizesService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<TireSize>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "TireSizesService",
      "getById",
      { id }
    );
  }

  static async create(dto: CreateTireSizeDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TireSize>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "TireSizesService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateTireSizeDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<TireSize>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "TireSizesService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Tire size deleted";
      },
      "TireSizesService",
      "delete",
      { id }
    );
  }
}

// ===== TIRE SIZE ALIASES =====
export class TireSizeAliasesService {
  private static basePath = "/tires/size-aliases";

  static async getBySize(sizeId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<
          TireSizeAlias[] | PaginatedResponse<TireSizeAlias>
        >(`/tires/sizes/${sizeId}/aliases`);
        if (response && typeof response === "object" && "data" in response) {
          return response.data;
        }
        return response;
      },
      "TireSizeAliasesService",
      "getBySize",
      { sizeId }
    );
  }

  static async create(dto: CreateTireSizeAliasDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TireSizeAlias>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "TireSizeAliasesService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateTireSizeAliasDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<TireSizeAlias>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "TireSizeAliasesService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Tire size alias deleted";
      },
      "TireSizeAliasesService",
      "delete",
      { id }
    );
  }
}
