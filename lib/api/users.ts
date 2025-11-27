// filepath: sae-frontend/lib/api/users.ts
import { ApiClient } from "./apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { User } from "@/lib/types/domain/user";
import { UserFormData } from "@/lib/validations/auth";

export class UsersService {
  private static basePath = "/users";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<PaginatedResponse<User>>(url);
        return response;
      },
      "UsersService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number): Promise<User> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<User>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "UsersService",
      "getById",
      { id }
    );
  }

  static async create(userData: UserFormData): Promise<User> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<User>>(
          this.basePath,
          userData
        );
        return response.data;
      },
      "UsersService",
      "create",
      { userData }
    );
  }

  static async update(id: number, userData: Partial<User>): Promise<User> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<User>>(
          `${this.basePath}/${id}`,
          userData
        );
        return response.data;
      },
      "UsersService",
      "update",
      { id, userData }
    );
  }

  static async delete(id: number): Promise<void> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete<void>(`${this.basePath}/${id}`);
      },
      "UsersService",
      "delete",
      { id }
    );
  }
}
