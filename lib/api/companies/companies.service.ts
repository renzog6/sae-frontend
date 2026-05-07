// filepath: sae-frontend/lib/api/companies/companies.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
} from "@/lib/types/domain/company";
import { createApiHooks } from "@/lib/hooks/createApiHooks";
//private static basePath = "/companies";

class CompaniesServiceClass extends BaseApiService<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  protected basePath = "/companies";

  /**
   * Método adicional: RESTORE
   * /companies/:id/restore  (PUT)
   */
  async restore(id: number): Promise<Company> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.put<ApiResponse<Company>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return res.data;
      },
      "CompanysService",
      "restore",
      { id }
    );
  }
}

export const CompaniesService = new CompaniesServiceClass();

// Export hooks for consistent usage
export const {
  useGetAll: useCompanies,
  useGetById: useCompanyById,
  useCreate: useCreateCompany,
  useUpdate: useUpdateCompany,
  useDelete: useDeleteCompany,
} = createApiHooks(CompaniesService, "companies");
