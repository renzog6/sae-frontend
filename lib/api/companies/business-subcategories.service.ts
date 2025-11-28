// filepath: sae-frontend/lib/api/companies/business-subcategories.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  BusinessSubCategory,
  CreateBusinessSubcategoryDto,
  UpdateBusinessSubcategoryDto,
} from "@/lib/types/domain/company";

//private static basePath = "/companies/subcategories";
class BusinessSubCategoriesServiceClass extends BaseApiService<
  BusinessSubCategory,
  CreateBusinessSubcategoryDto,
  UpdateBusinessSubcategoryDto
> {
  protected basePath = "/companies/subcategories";

  /**
   * Método adicional: RESTORE
   * /subcategories/:id/restore  (PUT)
   */
  async restore(id: number): Promise<BusinessSubCategory> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.put<ApiResponse<BusinessSubCategory>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return res.data;
      },
      "BusinessSubCategorysService",
      "restore",
      { id }
    );
  }
}

export const BusinessSubCategoriesService =
  new BusinessSubCategoriesServiceClass();
