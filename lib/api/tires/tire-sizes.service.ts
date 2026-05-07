// filepath: sae-frontend/lib/api/tires/tire-sizes.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { createApiHooks } from "@/lib/hooks/createApiHooks";

import {
  TireSize,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  TireSizeAlias,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
} from "@/lib/types/domain/tire";

import { PaginatedResponse } from "@/lib/types/core/api";

// ======================
// TIRE SIZES
// ======================

class TireSizesServiceClass extends BaseApiService<
  TireSize,
  CreateTireSizeDto,
  UpdateTireSizeDto
> {
  protected basePath = "/tires/sizes";
}

export const TireSizesService = new TireSizesServiceClass();

// Export hooks for consistent usage
export const {
  useGetAll: useTireSizes,
  useGetById: useTireSizeById,
  useCreate: useCreateTireSize,
  useUpdate: useUpdateTireSize,
  useDelete: useDeleteTireSize,
} = createApiHooks(TireSizesService, "tireSizes");

// ======================
// TIRE SIZE ALIASES
// ======================

class TireSizeAliasesServiceClass extends BaseApiService<
  TireSizeAlias,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto
> {
  protected basePath = "/tires/size-aliases";

  async getBySize(sizeId: number): Promise<TireSizeAlias[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<
          TireSizeAlias[] | PaginatedResponse<TireSizeAlias>
        >(`/tires/sizes/${sizeId}/aliases`);

        // Normalizamos porque el backend puede devolver:
        // A) Array plano []
        // B) { data: [] }
        if (Array.isArray(response)) return response;

        return response.data;
      },
      this.constructor.name,
      "getBySize",
      { sizeId }
    );
  }
}

export const TireSizeAliasesService = new TireSizeAliasesServiceClass();

// Export hooks for consistent usage
export const {
  useGetAll: useTireSizeAliases,
  useGetById: useTireSizeAliasById,
  useCreate: useCreateTireSizeAlias,
  useUpdate: useUpdateTireSizeAlias,
  useDelete: useDeleteTireSizeAlias,
} = createApiHooks(TireSizeAliasesService, "tireSizeAliases");
