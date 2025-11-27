// filepath: sae-frontend/lib/api/auth-service.ts

import { signIn } from "next-auth/react";
import { ApiClient } from "./apiClient";
import { LoginCredentials, AuthResponse } from "@/lib/types/core/auth";

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await ApiClient.login(credentials);
      const signInResult = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });
      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }
      return response;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error en el proceso de login"
      );
    }
  }

  static async getProfile(): Promise<AuthResponse["user"]> {
    try {
      const response = await ApiClient.get<AuthResponse>("/api/auth/profile");
      return response.user;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error al obtener el perfil"
      );
    }
  }

  static async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await ApiClient.post<AuthResponse>("/api/auth/refresh", {
        refreshToken,
      });
      return response;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error al refrescar el token"
      );
    }
  }
}
