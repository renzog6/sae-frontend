//filepath: sae-frontend/lib/api/tires/tire-recaps.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireRecap,
  CreateTireRecapDto,
  UpdateTireRecapDto,
} from "@/lib/types/domain/tire";

class TireRecapsServiceClass extends BaseApiService<
  TireRecap,
  CreateTireRecapDto,
  UpdateTireRecapDto
> {
  protected basePath = "/tires/recaps";

  async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireRecap[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireRecapsService",
      "getByTire",
      { tireId }
    );
  }
}

export const TireRecapsService = new TireRecapsServiceClass();
