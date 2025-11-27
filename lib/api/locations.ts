// filepath: sae-frontend/lib/api/locations.ts
import { ApiClient } from "./apiClient";
import { PaginatedResponse } from "@/lib/types/core/api";
import { City, Province, Address } from "@/lib/types/shared/location";
import { CityFormData, AddressFormData } from "@/lib/validations/location";

export class LocationsService {
  private static citiesPath = "/locations/cities";
  private static provincesPath = "/locations/provinces";
  private static addressesPath = "/locations/addresses";

  // Cities
  static async getCities(): Promise<City[]> {
    try {
      const response = await ApiClient.get<PaginatedResponse<City>>(
        this.citiesPath
      );
      return response.data || [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  }

  static async getCityById(id: number): Promise<City> {
    try {
      const response = await ApiClient.get<City>(`${this.citiesPath}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching city with ID ${id}:`, error);
      throw error;
    }
  }

  static async createCity(cityData: CityFormData): Promise<City> {
    try {
      const response = await ApiClient.post<City>(this.citiesPath, cityData);
      return response;
    } catch (error) {
      console.error("Error creating city:", error);
      throw error;
    }
  }

  static async updateCity(id: number, cityData: Partial<City>): Promise<City> {
    try {
      const response = await ApiClient.put<City>(
        `${this.citiesPath}/${id}`,
        cityData
      );
      return response;
    } catch (error) {
      console.error("Error updating city:", error);
      throw error;
    }
  }

  static async deleteCity(id: number): Promise<string> {
    try {
      await ApiClient.delete(`${this.citiesPath}/${id}`);
      return "City deleted";
    } catch (error) {
      console.error("Error deleting city:", error);
      throw error;
    }
  }

  // Provinces (read-only per backend controller)
  static async getProvinces(): Promise<Province[]> {
    try {
      const response = await ApiClient.get<PaginatedResponse<Province>>(
        this.provincesPath
      );
      return response.data || [];
    } catch (error) {
      console.error("Error fetching provinces:", error);
      throw error;
    }
  }

  static async getProvinceById(id: number): Promise<Province> {
    try {
      const response = await ApiClient.get<Province>(
        `${this.provincesPath}/${id}`
      );
      return response;
    } catch (error) {
      console.error(`Error fetching province with ID ${id}:`, error);
      throw error;
    }
  }

  static async getProvinceByCode(code: string): Promise<Province> {
    try {
      const response = await ApiClient.get<Province>(
        `${this.provincesPath}/code/${code}`
      );
      return response;
    } catch (error) {
      console.error(`Error fetching province with code ${code}:`, error);
      throw error;
    }
  }

  static async getProvincesByCountryId(countryId: number): Promise<Province[]> {
    try {
      const response = await ApiClient.get<PaginatedResponse<Province>>(
        `/locations/countries/${countryId}/provinces`
      );
      return response.data || [];
    } catch (error) {
      console.error(
        `Error fetching provinces for country ${countryId}:`,
        error
      );
      throw error;
    }
  }

  // Addresses
  static async getAddresses(): Promise<Address[]> {
    try {
      const response = await ApiClient.get<PaginatedResponse<Address>>(
        this.addressesPath
      );
      return response.data || [];
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  }

  static async getAddressById(id: number): Promise<Address> {
    try {
      const response = await ApiClient.get<Address>(
        `${this.addressesPath}/${id}`
      );
      return response;
    } catch (error) {
      console.error(`Error fetching address with ID ${id}:`, error);
      throw error;
    }
  }

  static async createAddress(body: AddressFormData): Promise<Address> {
    try {
      const response = await ApiClient.post<Address>(this.addressesPath, body);
      return response;
    } catch (error) {
      console.error("Error creating address:", error);
      throw error;
    }
  }

  static async updateAddress(
    id: number,
    body: Partial<Address>
  ): Promise<Address> {
    try {
      const response = await ApiClient.put<Address>(
        `${this.addressesPath}/${id}`,
        body
      );
      return response;
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  }

  static async deleteAddress(id: number): Promise<string> {
    try {
      await ApiClient.delete(`${this.addressesPath}/${id}`);
      return "Address deleted";
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  }

  static async getAddressesByCity(cityId: number): Promise<Address[]> {
    try {
      const response = await ApiClient.get<PaginatedResponse<Address>>(
        `${this.addressesPath}/city/${cityId}`
      );
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching addresses for city ${cityId}:`, error);
      throw error;
    }
  }

  static async getAddressesByCompany(companyId: number): Promise<Address[]> {
    try {
      const response = await ApiClient.get<PaginatedResponse<Address>>(
        `${this.addressesPath}/company/${companyId}`
      );
      return response.data || [];
    } catch (error) {
      console.error(
        `Error fetching addresses for company ${companyId}:`,
        error
      );
      throw error;
    }
  }

  static async getAddressesByPerson(personId: number): Promise<Address[]> {
    try {
      const response = await ApiClient.get<PaginatedResponse<Address>>(
        `${this.addressesPath}/person/${personId}`
      );
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching addresses for person ${personId}:`, error);
      throw error;
    }
  }
}
