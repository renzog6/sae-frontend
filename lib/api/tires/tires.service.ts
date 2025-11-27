//filepath: sae-frontend/lib/api/tires/tires.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
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
  }

  static async getById(id: number) {
    const response = await ApiClient.get<ApiResponse<Tire>>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(dto: CreateTireDto) {
    const response = await ApiClient.post<ApiResponse<Tire>>(
      this.basePath,
      dto
    );
    return response.data;
  }

  static async update(id: number, dto: UpdateTireDto) {
    const response = await ApiClient.put<ApiResponse<Tire>>(
      `${this.basePath}/${id}`,
      dto
    );
    return response.data;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire deleted";
  }
}
