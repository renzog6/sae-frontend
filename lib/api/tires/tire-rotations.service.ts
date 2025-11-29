//filepath: sae-frontend/lib/api/tires/tire-rotations.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireRotation,
  CreateTireRotationDto,
  UpdateTireRotationDto,
} from "@/lib/types/domain/tire";

class TireRotationsServiceClass extends BaseApiService<
  TireRotation,
  CreateTireRotationDto,
  UpdateTireRotationDto
> {
  protected basePath = "/tires/rotations";

  async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireRotation[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireRotationsService",
      "getByTire",
      { tireId }
    );
  }
}

export const TireRotationsService = new TireRotationsServiceClass();
