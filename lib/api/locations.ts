// filepath: sae-frontend/lib/api/locations.ts
import { ApiClient } from "./apiClient";
import { PaginatedResponse, ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { City, Province, Address } from "@/lib/types/shared/location";
import { CityFormData, AddressFormData } from "@/lib/validations/location";

export class LocationsService {
  private static citiesPath = "/locations/cities";
  private static provincesPath = "/locations/provinces";
  private static addressesPath = "/locations/addresses";

  // Cities
  static async getCities(): Promise<City[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<PaginatedResponse<City>>(
          this.citiesPath
        );
        return response.data || [];
      },
      "LocationsService",
      "getCities"
    );
  }

  static async getCityById(id: number): Promise<City> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<City>>(
          `${this.citiesPath}/${id}`
        );
        return response.data;
      },
      "LocationsService",
      "getCityById",
      { id }
    );
  }

  static async createCity(cityData: CityFormData): Promise<City> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<City>>(
          this.citiesPath,
          cityData
        );
        return response.data;
      },
      "LocationsService",
      "createCity",
      { cityData }
    );
  }

  static async updateCity(id: number, cityData: Partial<City>): Promise<City> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<City>>(
          `${this.citiesPath}/${id}`,
          cityData
        );
        return response.data;
      },
      "LocationsService",
      "updateCity",
      { id, cityData }
    );
  }

  static async deleteCity(id: number): Promise<string> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.citiesPath}/${id}`);
        return "City deleted";
      },
      "LocationsService",
      "deleteCity",
      { id }
    );
  }

  // Provinces (read-only per backend controller)
  static async getProvinces(): Promise<Province[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<PaginatedResponse<Province>>(
          this.provincesPath
        );
        return response.data || [];
      },
      "LocationsService",
      "getProvinces"
    );
  }

  static async getProvinceById(id: number): Promise<Province> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Province>>(
          `${this.provincesPath}/${id}`
        );
        return response.data;
      },
      "LocationsService",
      "getProvinceById",
      { id }
    );
  }

  static async getProvinceByCode(code: string): Promise<Province> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Province>>(
          `${this.provincesPath}/code/${code}`
        );
        return response.data;
      },
      "LocationsService",
      "getProvinceByCode",
      { code }
    );
  }

  static async getProvincesByCountryId(countryId: number): Promise<Province[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<PaginatedResponse<Province>>(
          `/locations/countries/${countryId}/provinces`
        );
        return response.data || [];
      },
      "LocationsService",
      "getProvincesByCountryId",
      { countryId }
    );
  }

  // Addresses
  static async getAddresses(): Promise<Address[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<PaginatedResponse<Address>>(
          this.addressesPath
        );
        return response.data || [];
      },
      "LocationsService",
      "getAddresses"
    );
  }

  static async getAddressById(id: number): Promise<Address> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Address>>(
          `${this.addressesPath}/${id}`
        );
        return response.data;
      },
      "LocationsService",
      "getAddressById",
      { id }
    );
  }

  static async createAddress(body: AddressFormData): Promise<Address> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<Address>>(
          this.addressesPath,
          body
        );
        return response.data;
      },
      "LocationsService",
      "createAddress",
      { body }
    );
  }

  static async updateAddress(
    id: number,
    body: Partial<Address>
  ): Promise<Address> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Address>>(
          `${this.addressesPath}/${id}`,
          body
        );
        return response.data;
      },
      "LocationsService",
      "updateAddress",
      { id, body }
    );
  }

  static async deleteAddress(id: number): Promise<string> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.addressesPath}/${id}`);
        return "Address deleted";
      },
      "LocationsService",
      "deleteAddress",
      { id }
    );
  }

  static async getAddressesByCity(cityId: number): Promise<Address[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<PaginatedResponse<Address>>(
          `${this.addressesPath}/city/${cityId}`
        );
        return response.data || [];
      },
      "LocationsService",
      "getAddressesByCity",
      { cityId }
    );
  }

  static async getAddressesByCompany(companyId: number): Promise<Address[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<PaginatedResponse<Address>>(
          `${this.addressesPath}/company/${companyId}`
        );
        return response.data || [];
      },
      "LocationsService",
      "getAddressesByCompany",
      { companyId }
    );
  }

  static async getAddressesByPerson(personId: number): Promise<Address[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<PaginatedResponse<Address>>(
          `${this.addressesPath}/person/${personId}`
        );
        return response.data || [];
      },
      "LocationsService",
      "getAddressesByPerson",
      { personId }
    );
  }
}
