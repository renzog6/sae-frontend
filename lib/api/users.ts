// filepath: sae-frontend/lib/api/users.ts
import { ApiClient } from "./apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { User } from "@/lib/types/domain/user";
import { UserFormData } from "@/lib/validations/auth";

export class UsersService {
  private static basePath = "/users";

  static async getAll(query?: BaseQueryParams) {
    try {
      const url = QueryBuilder.buildUrl(this.basePath, query);
      const response = await ApiClient.get<PaginatedResponse<User>>(url);

      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getById(id: number): Promise<User> {
    try {
      const response = await ApiClient.get<ApiResponse<User>>(
        `${this.basePath}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  }

  static async create(userData: UserFormData): Promise<User> {
    try {
      const response = await ApiClient.post<ApiResponse<User>>(
        this.basePath,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async update(id: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await ApiClient.put<ApiResponse<User>>(
        `${this.basePath}/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await ApiClient.delete<void>(`${this.basePath}/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
