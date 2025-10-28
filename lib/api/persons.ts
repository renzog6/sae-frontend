// filepath: sae-frontend/lib/api/persons.ts
import { ApiClient } from "./apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { Person } from "@/lib/types/employee";
import {
  CreatePersonFormData,
  UpdatePersonFormData,
} from "@/lib/validations/person";

export class PersonsService {
  private static basePath = "/persons";

  static async getPersons(params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<Person>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getPersonById(id: number) {
    const response = await ApiClient.get<Person>(`${this.basePath}/${id}`);
    return response;
  }

  static async createPerson(data: CreatePersonFormData) {
    const response = await ApiClient.post<Person>(this.basePath, data);
    return response;
  }

  static async updatePerson(id: number, data: UpdatePersonFormData) {
    const response = await ApiClient.put<Person>(
      `${this.basePath}/${id}`,
      data
    );
    return response;
  }

  static async deletePerson(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Person deleted";
  }
}
