// filepath: sae-frontend/lib/api/persons.ts
import { ApiClient } from "./apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { Person } from "@/lib/types/domain/employee";
import {
  CreatePersonFormData,
  UpdatePersonFormData,
} from "@/lib/validations/person";

export class PersonsService {
  private static basePath = "/persons";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<Person>>(url);
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<ApiResponse<Person>>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: CreatePersonFormData) {
    const response = await ApiClient.post<ApiResponse<Person>>(
      this.basePath,
      data
    );
    return response.data;
  }

  static async update(id: number, data: UpdatePersonFormData) {
    const response = await ApiClient.put<ApiResponse<Person>>(
      `${this.basePath}/${id}`,
      data
    );
    return response.data;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Person deleted";
  }
}
