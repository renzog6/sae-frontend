// filepath: sae-frontend/lib/api/persons.ts
import { ApiClient } from "./apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { Person } from "@/types/employee";
import { CreatePersonFormData, UpdatePersonFormData } from "@/lib/validations/person";
import { normalizeListResponse } from "@/lib/api/utils";

function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

export class PersonsService {
  static async getPersons(accessToken: string, params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.request<Person[] | PaginatedResponse<Person>>(
      `/persons${qs ? `?${qs}` : ""}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const unwrapped = unwrap<Person[] | PaginatedResponse<Person>>(response);
    return normalizeListResponse<Person>(unwrapped);
  }

  static async getPersonById(id: number, accessToken: string) {
    const response = await ApiClient.request<Person | ApiResponse<Person>>(
      `/persons/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Person>(response);
  }

  static async createPerson(data: CreatePersonFormData, accessToken: string) {
    const response = await ApiClient.request<Person | ApiResponse<Person>>(
      "/persons",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Person>(response);
  }

  static async updatePerson(id: number, data: UpdatePersonFormData, accessToken: string) {
    const response = await ApiClient.request<Person | ApiResponse<Person>>(
      `/persons/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Person>(response);
  }

  static async deletePerson(id: number, accessToken: string) {
    await ApiClient.request(`/persons/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Person deleted";
  }
}
