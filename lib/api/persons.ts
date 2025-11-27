// filepath: sae-frontend/lib/api/persons.ts
import { ApiClient } from "./apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { Person } from "@/lib/types/domain/employee";
import {
  CreatePersonFormData,
  UpdatePersonFormData,
} from "@/lib/validations/person";

export class PersonsService {
  private static basePath = "/persons";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<PaginatedResponse<Person>>(url);
        return response;
      },
      "PersonsService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Person>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "PersonsService",
      "getById",
      { id }
    );
  }

  static async create(data: CreatePersonFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<Person>>(
          this.basePath,
          data
        );
        return response.data;
      },
      "PersonsService",
      "create",
      { data }
    );
  }

  static async update(id: number, data: UpdatePersonFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Person>>(
          `${this.basePath}/${id}`,
          data
        );
        return response.data;
      },
      "PersonsService",
      "update",
      { id, data }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Person deleted";
      },
      "PersonsService",
      "delete",
      { id }
    );
  }
}
