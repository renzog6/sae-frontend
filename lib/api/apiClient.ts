//filepath: /sae-frontend/lib/api/apiClient.ts

import { getSession, signOut } from "next-auth/react";
import { AuthResponse, LoginCredentials } from "@/lib/types/auth";

// Detecta entorno automáticamente
const API_BASE_URL =
  typeof window === "undefined"
    ? process.env.API_URL // En SSR o servidor (Docker interno o localhost)
    : process.env.NEXT_PUBLIC_API_URL; // En navegador (externa, visible al cliente)

// Timeout predeterminado para solicitudes (10 segundos)
const REQUEST_TIMEOUT = 10000;

interface ApiClientOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

/**
 * Cliente HTTP base para interactuar con el backend SAE
 */
export class ApiClient {
  private static isRefreshing = false;
  private static refreshSubscribers: Array<(token: string) => void> = [];

  /**
   * Construye la URL completa con el prefijo de la API
   * @param path - Ruta relativa del endpoint
   * @returns URL completa
   */
  private static buildUrl(path: string): string {
    const fullUrl = `${API_BASE_URL}${
      path.startsWith("/") ? path : `/${path}`
    }`;
    console.log(">>> ", fullUrl);
    return fullUrl;
  }

  /**
   * Obtiene la sesión actual con accessToken y refreshToken
   * @returns Sesión con tokens o null
   */
  private static async getSessionData(): Promise<{
    accessToken: string | null;
    refreshToken: string | null;
  }> {
    try {
      const session = await getSession();
      return {
        accessToken: session?.accessToken || null,
        refreshToken: session?.refreshToken || null,
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al obtener sesión:", error);
      }
      return { accessToken: null, refreshToken: null };
    }
  }

  /**
   * Refresca el accessToken usando el refreshToken
   * @returns Nuevo accessToken
   * @throws Error si el refresh falla
   */
  private static async refreshAccessToken(): Promise<string> {
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshSubscribers.push(resolve);
      });
    }

    this.isRefreshing = true;

    try {
      const { refreshToken } = await this.getSessionData();
      if (!refreshToken) {
        throw new Error("No se encontró refreshToken");
      }

      const response = await fetch(this.buildUrl("/auth/refresh"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: No se pudo refrescar el token`
        );
      }

      const data = (await response.json()) as RefreshTokenResponse;
      const newAccessToken = data.accessToken;

      this.refreshSubscribers.forEach((callback) => callback(newAccessToken));
      this.refreshSubscribers = [];

      if (process.env.NODE_ENV === "development") {
        console.debug("Token refrescado exitosamente");
      }

      return newAccessToken;
    } catch (error) {
      this.refreshSubscribers = [];
      if (process.env.NODE_ENV === "development") {
        console.error("Error al refrescar token:", error);
      }
      await signOut({ callbackUrl: "/login" });
      throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Realiza una solicitud HTTP con manejo de errores, timeout y refresh de token
   * @param url - URL completa
   * @param options - Opciones de fetch
   * @param retry - Indica si es un reintento tras refresh
   * @returns Respuesta parseada
   * @throws Error si la solicitud falla
   */
  private static async request<T>(
    url: string,
    options: RequestInit,
    retry = false
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const { accessToken } = await this.getSessionData();
      const headers: Record<string, string> = {};

      // Only set Content-Type for non-FormData requests
      const isFormData = options.body instanceof FormData;
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      if (options.headers) {
        Object.assign(headers, options.headers);
      }

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401 && !retry) {
          const newAccessToken = await this.refreshAccessToken();
          headers["Authorization"] = `Bearer ${newAccessToken}`;
          return this.request<T>(url, { ...options, headers }, true);
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        throw new Error("La solicitud excedió el tiempo límite");
      }
      throw error instanceof Error
        ? error
        : new Error("Error desconocido en la solicitud");
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Ejecuta una solicitud para descargar un blob
   * @param url - URL completa
   * @param options - Opciones de fetch
   * @param retry - Indica si es un reintento tras refresh
   * @returns Blob con el archivo
   * @throws Error si la solicitud falla
   */
  private static async requestBlob(
    url: string,
    options: RequestInit,
    retry = false
  ): Promise<Blob> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const { accessToken } = await this.getSessionData();
      const headers: Record<string, string> = {};

      if (options.headers) {
        Object.assign(headers, options.headers);
      }

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401 && !retry) {
          const newAccessToken = await this.refreshAccessToken();
          headers["Authorization"] = `Bearer ${newAccessToken}`;
          return this.requestBlob(url, { ...options, headers }, true);
        }
        const errorData = await response
          .text()
          .catch(() => response.statusText);
        throw new Error(
          `Error ${response.status}: ${errorData || response.statusText}`
        );
      }

      return await response.blob();
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        throw new Error("La solicitud de blob excedió el tiempo límite");
      }
      throw error instanceof Error
        ? error
        : new Error("Error desconocido en la solicitud de blob");
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Realiza una solicitud de login al backend
   * @param credentials - Credenciales de usuario (email, password)
   * @returns Respuesta de autenticación con tokens y datos de usuario
   * @throws Error si las credenciales son inválidas
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(this.buildUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: Credenciales inválidas`
        );
      }

      return (await response.json()) as AuthResponse;
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        throw new Error("La solicitud de login excedió el tiempo límite");
      }
      throw error instanceof Error
        ? error
        : new Error("Error desconocido en la solicitud de login");
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Realiza una solicitud GET
   * @param path - Ruta relativa del endpoint
   * @param options - Opciones adicionales
   * @returns Respuesta parseada
   */
  static async get<T>(
    path: string,
    options: ApiClientOptions = {}
  ): Promise<T> {
    return this.request<T>(this.buildUrl(path), {
      method: "GET",
      headers: options.headers,
      signal: options.signal,
    });
  }

  /**
   * Realiza una solicitud POST
   * @param path - Ruta relativa del endpoint
   * @param body - Cuerpo de la solicitud
   * @param options - Opciones adicionales
   * @returns Respuesta parseada
   */
  static async post<T>(
    path: string,
    body: any,
    options: ApiClientOptions = {}
  ): Promise<T> {
    // Handle FormData differently - don't set Content-Type header
    const isFormData = body instanceof FormData;
    const headers = { ...options.headers };

    if (isFormData) {
      // Remove Content-Type for FormData - let browser set it with boundary
      delete headers["Content-Type"];
    }

    return this.request<T>(this.buildUrl(path), {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
      signal: options.signal,
    });
  }

  /**
   * Realiza una solicitud PUT
   * @param path - Ruta relativa del endpoint
   * @param body - Cuerpo de la solicitud
   * @param options - Opciones adicionales
   * @returns Respuesta parseada
   */
  static async put<T>(
    path: string,
    body: any,
    options: ApiClientOptions = {}
  ): Promise<T> {
    return this.request<T>(this.buildUrl(path), {
      method: "PUT",
      headers: options.headers,
      body: JSON.stringify(body),
      signal: options.signal,
    });
  }

  /**
   * Realiza una solicitud PATCH
   * @param path - Ruta relativa del endpoint
   * @param body - Cuerpo de la solicitud
   * @param options - Opciones adicionales
   * @returns Respuesta parseada
   */
  static async patch<T>(
    path: string,
    body: any,
    options: ApiClientOptions = {}
  ): Promise<T> {
    return this.request<T>(this.buildUrl(path), {
      method: "PATCH",
      headers: options.headers,
      body: JSON.stringify(body),
      signal: options.signal,
    });
  }

  /**
   * Realiza una solicitud DELETE
   * @param path - Ruta relativa del endpoint
   * @param options - Opciones adicionales
   * @returns Respuesta parseada
   */
  static async delete<T = void>(
    path: string,
    options: ApiClientOptions = {}
  ): Promise<T> {
    return this.request<T>(this.buildUrl(path), {
      method: "DELETE",
      headers: options.headers,
      signal: options.signal,
    });
  }

  /**
   * Descarga un archivo como blob
   * @param path - Ruta relativa del endpoint
   * @param options - Opciones adicionales
   * @returns Blob con el archivo
   */
  static async getBlob(
    path: string,
    options: ApiClientOptions = {}
  ): Promise<Blob> {
    return this.requestBlob(this.buildUrl(path), {
      method: "GET",
      headers: options.headers,
      signal: options.signal,
    });
  }
}
