// filepath: sae-frontend/lib/api/catalogs/units.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  Unit,
  CreateUnitDto,
  UpdateUnitDto,
} from "@/lib/types/shared/catalogs";

class UnitsServiceClass extends BaseApiService<
  Unit,
  CreateUnitDto,
  UpdateUnitDto
> {
  protected basePath = "/units";

  /**
   * Método adicional: RESTORE
   * /units/:id/restore  (PUT)
   */
  async restore(id: number): Promise<Unit> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.put<ApiResponse<Unit>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return res.data;
      },
      "UnitsService",
      "restore",
      { id }
    );
  }
}

export const UnitsService = new UnitsServiceClass();
