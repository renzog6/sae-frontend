// filepath: sae-frontend/lib/api/validators/validators.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  UniqueCheckResponse,
  UniqueCheckParams,
} from "@/lib/types/shared/validators";

class ValidatorsServiceClass {
  async checkUnique(params: UniqueCheckParams): Promise<UniqueCheckResponse> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const queryString = QueryBuilder.buildSpecific(params);
        const url = QueryBuilder.combineUrls("/validators/unique", queryString);
        return ApiClient.get<UniqueCheckResponse>(url);
      },
      this.constructor.name,
      "checkUnique",
      { params }
    );
  }
}

export const ValidatorsService = new ValidatorsServiceClass();
