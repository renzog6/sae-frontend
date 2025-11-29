// filepath: sae-frontend/lib/api/locations/provinces.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { Province } from "@/lib/types/shared/location";

class ProvincesServiceClass {
  private basePath = "/locations/provinces";

  /**
   * Obtiene todas las provincias (read-only)
   */
  async getAll(): Promise<Province[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<PaginatedResponse<Province>>(
          this.basePath
        );
        return res.data ?? [];
      },
      this.constructor.name,
      "getAll"
    );
  }

  /**
   * Obtiene una provincia por ID
   */
  async getById(id: number): Promise<Province> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<ApiResponse<Province>>(
          `${this.basePath}/${id}`
        );
        return res.data;
      },
      this.constructor.name,
      "getById",
      { id }
    );
  }

  /**
   * Obtiene una provincia por código (ej: AR-C)
   */
  async getByCode(code: string): Promise<Province> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<ApiResponse<Province>>(
          `${this.basePath}/code/${code}`
        );
        return res.data;
      },
      this.constructor.name,
      "getByCode",
      { code }
    );
  }

  /**
   * Obtiene todas las provincias de un país
   */
  async getByCountryId(countryId: number): Promise<Province[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<PaginatedResponse<Province>>(
          `/locations/countries/${countryId}/provinces`
        );
        return res.data ?? [];
      },
      this.constructor.name,
      "getByCountryId",
      { countryId }
    );
  }
}

export const ProvincesService = new ProvincesServiceClass();
