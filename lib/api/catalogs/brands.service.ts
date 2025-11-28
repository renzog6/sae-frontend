// filepath: sae-frontend/lib/api/catalogs/brands.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  Brand,
  CreateBrandDto,
  UpdateBrandDto,
} from "@/lib/types/shared/catalogs";

class BrandsServiceClass extends BaseApiService<
  Brand,
  CreateBrandDto,
  UpdateBrandDto
> {
  protected basePath = "/brands";

  /**
   * Método adicional: RESTORE
   * /brands/:id/restore  (PUT)
   */
  async restore(id: number): Promise<Brand> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.put<ApiResponse<Brand>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return res.data;
      },
      "BrandsService",
      "restore",
      { id }
    );
  }
}

export const BrandsService = new BrandsServiceClass();
