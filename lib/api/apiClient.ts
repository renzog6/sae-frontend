// filepath: sae-frontend/lib/api/apiClient.ts
import { LoginDto } from "@/types/auth";
import { User } from "@/types/user";

const API_BASE_URL = process.env.API_URL || "http://localhost:3305/api";

export class ApiClient {
  public static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json() as Promise<T>;
  }

  // Auth
  static async login(credentials: LoginDto) {    

    return this.request<{
      accessToken: string;
      refreshToken: string;
      user: User;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  static refreshToken(refreshToken: string) {
    return this.request<{ accessToken: string; refreshToken: string }>(
      "/auth/refresh",
      { method: "POST", body: JSON.stringify({ refreshToken }) }
    );
  }

  static getProfile(accessToken: string) {
    return this.request<User>("/auth/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}
