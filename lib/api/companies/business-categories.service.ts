// filepath: sae-frontend/lib/api/companies/business-categories.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  BusinessCategory,
  CreateBusinessCategoryDto,
  UpdateBusinessCategoryDto,
} from "@/lib/types/domain/company";

//private static basePath = "/companies/categories";
class BusinessCategoriesServiceClass extends BaseApiService<
  BusinessCategory,
  CreateBusinessCategoryDto,
  UpdateBusinessCategoryDto
> {
  protected basePath = "/business-categories";

  /**
   * Método adicional: RESTORE
   * /categories/:id/restore  (PUT)
   */
  async restore(id: number): Promise<BusinessCategory> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.put<ApiResponse<BusinessCategory>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return res.data;
      },
      "BusinessCategorysService",
      "restore",
      { id }
    );
  }
}

export const BusinessCategoriesService = new BusinessCategoriesServiceClass();
