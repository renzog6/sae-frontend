// filepath: sae-frontend/lib/api/users.ts
import { ApiClient } from "./apiClient";
import { User } from "@/lib/types/user";
import { PaginatedResponse, ApiResponse } from "@/lib/types/api";
import { UserFormData } from "@/lib/validations/auth";

export class UsersService {
  private static basePath = "/users";

  static async getUsers(): Promise<PaginatedResponse<User>> {
    try {
      const response = await ApiClient.get<PaginatedResponse<User>>(
        this.basePath
      );
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getUserById(id: number): Promise<User> {
    try {
      const response = await ApiClient.get<User>(`${this.basePath}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  }

  static async createUser(userData: UserFormData): Promise<User> {
    try {
      const response = await ApiClient.post<User>(this.basePath, userData);
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await ApiClient.put<User>(
        `${this.basePath}/${id}`,
        userData
      );
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async deleteUser(id: number): Promise<void> {
    try {
      await ApiClient.delete(`${this.basePath}/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
