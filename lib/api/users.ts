// filepath: sae-frontend/lib/api/users.ts
import { ApiClient } from "./apiClient";
import { User } from "@/lib/types/user";
import { PaginatedResponse, ApiResponse } from "@/lib/types/api";
import { UserFormData } from "@/lib/validations/auth";

export class UsersService {
  static async getUsers(accessToken: string): Promise<User[]> {
    try {
      const response = await ApiClient.request<PaginatedResponse<User>>(
        "/users",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getUserById(id: number, accessToken: string): Promise<User> {
    try {
      // Cambia ApiResponse<User> por User directamente
      const response = await ApiClient.request<User>(`/users/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response; // Devuelve response directamente, no response.data
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  }

  static async createUser(
    userData: UserFormData,
    accessToken: string
  ): Promise<User> {
    try {
      const response = await ApiClient.request<ApiResponse<User>>("/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async updateUser(
    id: number,
    userData: Partial<User>,
    accessToken: string
  ): Promise<User> {
    try {
      const response = await ApiClient.request<ApiResponse<User>>(
        `/users/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async deleteUser(id: number, accessToken: string): Promise<string> {
    try {
      const response = await ApiClient.request<{ message: string }>(
        `/users/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.message;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
