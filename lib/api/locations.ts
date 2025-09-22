// filepath: sae-frontend/lib/api/locations.ts
import { ApiClient } from "./apiClient";
import { PaginatedResponse, ApiResponse } from "@/types/api";
import { City, Province, Address } from "@/types/location";
import { CityFormData, AddressFormData } from "@/lib/validations/location";

// Helper to unwrap responses that may come wrapped in { data }
function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

export class LocationsService {
  // Cities
  static async getCities(accessToken: string): Promise<City[]> {
    try {
      // Backend likely returns City[] directly. If wrapped, unwrap will handle it.
      const response = await ApiClient.request<City[] | PaginatedResponse<City>>(
        "/locations/cities",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return unwrap<City[]>(response);
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  }

  static async getCityById(id: number, accessToken: string): Promise<City> {
    try {
      const response = await ApiClient.request<City | ApiResponse<City>>(
        `/locations/cities/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return unwrap<City>(response);
    } catch (error) {
      console.error(`Error fetching city with ID ${id}:`, error);
      throw error;
    }
  }

  static async createCity(
    cityData: CityFormData,
    accessToken: string
  ): Promise<City> {
    try {
      const response = await ApiClient.request<City | ApiResponse<City>>(
        "/locations/cities",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cityData),
        }
      );
      return unwrap<City>(response);
    } catch (error) {
      console.error("Error creating city:", error);
      throw error;
    }
  }

  static async updateCity(
    id: number,
    cityData: Partial<City>,
    accessToken: string
  ): Promise<City> {
    try {
      const response = await ApiClient.request<City | ApiResponse<City>>(
        `/locations/cities/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cityData),
        }
      );
      return unwrap<City>(response);
    } catch (error) {
      console.error("Error updating city:", error);
      throw error;
    }
  }

  static async deleteCity(id: number, accessToken: string): Promise<string> {
    try {
      const response = await ApiClient.request<{ message?: string } | ApiResponse<unknown>>(
        `/locations/cities/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // Try to return a human-readable message if provided
      if (response && typeof response === "object" && "message" in response) {
        return (response as { message?: string }).message || "City deleted";
      }
      return "City deleted";
    } catch (error) {
      console.error("Error deleting city:", error);
      throw error;
    }
  }

  // Provinces (read-only per backend controller)
  static async getProvinces(accessToken: string): Promise<Province[]> {
    try {
      const response = await ApiClient.request<Province[] | PaginatedResponse<Province>>(
        "/locations/provinces",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return unwrap<Province[]>(response);
    } catch (error) {
      console.error("Error fetching provinces:", error);
      throw error;
    }
  }

  static async getProvinceById(id: number, accessToken: string): Promise<Province> {
    try {
      const response = await ApiClient.request<Province | ApiResponse<Province>>(
        `/locations/provinces/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return unwrap<Province>(response);
    } catch (error) {
      console.error(`Error fetching province with ID ${id}:`, error);
      throw error;
    }
  }

  static async getProvinceByCode(code: string, accessToken: string): Promise<Province> {
    try {
      const response = await ApiClient.request<Province | ApiResponse<Province>>(
        `/locations/provinces/code/${code}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return unwrap<Province>(response);
    } catch (error) {
      console.error(`Error fetching province with code ${code}:`, error);
      throw error;
    }
  }

  static async getProvincesByCountryId(countryId: number, accessToken: string): Promise<Province[]> {
    try {
      const response = await ApiClient.request<Province[] | PaginatedResponse<Province>>(
        `/locations/countries/${countryId}/provinces`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return unwrap<Province[]>(response);
    } catch (error) {
      console.error(`Error fetching provinces for country ${countryId}:`, error);
      throw error;
    }
  }

  // Addresses
  static async getAddresses(accessToken: string): Promise<Address[]> {
    try {
      const response = await ApiClient.request<Address[] | PaginatedResponse<Address>>(
        "/locations/addresses",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return unwrap<Address[]>(response);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  }

  static async getAddressById(id: number, accessToken: string): Promise<Address> {
    try {
      const response = await ApiClient.request<Address | ApiResponse<Address>>(
        `/locations/addresses/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return unwrap<Address>(response);
    } catch (error) {
      console.error(`Error fetching address with ID ${id}:`, error);
      throw error;
    }
  }

  static async createAddress(
    body: AddressFormData,
    accessToken: string
  ): Promise<Address> {
    try {
      const response = await ApiClient.request<Address | ApiResponse<Address>>(
        "/locations/addresses",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      return unwrap<Address>(response);
    } catch (error) {
      console.error("Error creating address:", error);
      throw error;
    }
  }

  static async updateAddress(
    id: number,
    body: Partial<Address>,
    accessToken: string
  ): Promise<Address> {
    try {
      const response = await ApiClient.request<Address | ApiResponse<Address>>(
        `/locations/addresses/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      return unwrap<Address>(response);
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  }

  static async deleteAddress(id: number, accessToken: string): Promise<string> {
    try {
      const response = await ApiClient.request<{ message?: string } | ApiResponse<unknown>>(
        `/locations/addresses/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response && typeof response === "object" && "message" in response) {
        return (response as { message?: string }).message || "Address deleted";
      }
      return "Address deleted";
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  }

  static async getAddressesByCity(cityId: number, accessToken: string): Promise<Address[]> {
    try {
      const response = await ApiClient.request<Address[] | PaginatedResponse<Address>>(
        `/locations/addresses/city/${cityId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return unwrap<Address[]>(response);
    } catch (error) {
      console.error(`Error fetching addresses for city ${cityId}:`, error);
      throw error;
    }
  }

  static async getAddressesByCompany(companyId: number, accessToken: string): Promise<Address[]> {
    try {
      const response = await ApiClient.request<Address[] | PaginatedResponse<Address>>(
        `/locations/addresses/company/${companyId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return unwrap<Address[]>(response);
    } catch (error) {
      console.error(`Error fetching addresses for company ${companyId}:`, error);
      throw error;
    }
  }
}
