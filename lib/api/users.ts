// filepath: sae-frontend/lib/api/users.ts
import { ApiClient } from "./apiClient";
import { User } from "../../types/user";
import { PaginatedResponse, ApiResponse } from "../../types/api";

export class UsersService {
  static getUsers(accessToken: string) {
    return ApiClient.request<PaginatedResponse<User>>("/users", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => res.data);
  }

  static createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt"> & {
      password: string;
    },
    accessToken: string
  ) {
    return ApiClient.request<ApiResponse<User>>("/users", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(userData),
    }).then((res) => res.data);
  }

  static updateUser(id: number, userData: Partial<User>, accessToken: string) {
    return ApiClient.request<ApiResponse<User>>(`/users/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(userData),
    }).then((res) => res.data);
  }

  static deleteUser(id: number, accessToken: string) {
    return ApiClient.request<{ message: string }>(`/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => res.message);
  }
}
