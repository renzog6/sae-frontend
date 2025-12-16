// filepath: sae-frontend/lib/api/locations/addresses.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { PaginatedResponse } from "@/lib/types/core/api";
import {
  Address,
  CreateAddressDto,
  UpdateAddressDto,
} from "@/lib/types/shared/location";

class AddressesServiceClass extends BaseApiService<
  Address,
  CreateAddressDto,
  UpdateAddressDto
> {
  protected basePath = "/locations/addresses";

  /**
   * Direcciones filtradas por ciudad
   */
  async getByCity(cityId: number): Promise<Address[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<PaginatedResponse<Address>>(
          `${this.basePath}/city/${cityId}`
        );
        return res.data ?? [];
      },
      this.constructor.name,
      "getByCity",
      { cityId }
    );
  }

  /**
   * Direcciones asociadas a una empresa
   */
  async getByCompany(companyId: number): Promise<Address[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<PaginatedResponse<Address>>(
          `${this.basePath}/company/${companyId}`
        );
        return res.data ?? [];
      },
      this.constructor.name,
      "getByCompany",
      { companyId }
    );
  }

  /**
   * Direcciones asociadas a una persona
   */
  async getByPerson(personId: number): Promise<Address[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<PaginatedResponse<Address>>(
          `${this.basePath}/person/${personId}`
        );
        return res.data ?? [];
      },
      this.constructor.name,
      "getByPerson",
      { personId }
    );
  }
}

export const AddressesService = new AddressesServiceClass();
