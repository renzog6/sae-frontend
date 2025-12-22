//filepath: sae-frontend/lib/api/apiClient.ts

import { getSession, signOut } from "next-auth/react";
import { AuthResponse, LoginCredentials } from "@/lib/types/core/auth";

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
  /**
   * Obtiene la URL base dinámicamente para soportar Docker/Runtime env vars
   */
  /**
   * Obtiene la URL base dinámicamente para soportar Docker/Runtime env vars
   * @returns URL base del API según el entorno de ejecución
   * @description Esta función determina la URL base del API dependiendo de si
   * se está ejecutando en el servidor o en el cliente, permitiendo diferentes
   * configuraciones para desarrollo, producción y entornos Dockerizados.
   * @example
   * // Server-side (Node.js)
   * const baseUrl = this.getBaseUrl(); // http://localhost:3000/api ó API_URL
   *
   * // Client-side (Browser)
   * const baseUrl = this.getBaseUrl(); // /api ó NEXT_PUBLIC_API_URL
   */
  private static getBaseUrl(): string {
    if (typeof window === "undefined") {
      // Server-side: Usar API_URL (interno Docker) o fallback a localhost
      return process.env.API_URL || "http://localhost:3000/api";
    }
    // Client-side: Usar NEXT_PUBLIC_API_URL
    return process.env.NEXT_PUBLIC_API_URL || "/api";
  }

  /**
   * Construye la URL completa con el prefijo de la API
   * @param path - Ruta relativa del endpoint
   * @returns URL completa
   */
  /**
   * Construye la URL completa con el prefijo de la API
   * @param path - Ruta relativa del endpoint (puede o no comenzar con /)
   * @returns URL completa combinando la base y la ruta
   * @description Esta función asegura que todas las URLs tengan el formato correcto
   * independientemente de si la ruta comienza con barra o no. También registra
   * la URL generada en consola para debugging en entornos de desarrollo.
   * @example
   * // Ruta sin barra inicial
   * const url = this.buildUrl('auth/login'); // http://localhost:3000/api/auth/login
   *
   * // Ruta con barra inicial
   * const url = this.buildUrl('/users/list'); // http://localhost:3000/api/users/list
   */
  private static buildUrl(path: string): string {
    const baseUrl = this.getBaseUrl();
    const fullUrl = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    console.log(">>> ", fullUrl);
    return fullUrl;
  }

  /**
   * Obtiene la sesión actual con accessToken y refreshToken
   * @returns Sesión con tokens o null
   */
  /**
   * Obtiene la sesión actual con accessToken y refreshToken
   * @returns Objeto con accessToken y refreshToken o null si no hay sesión
   * @description Esta función recupera los tokens de autenticación desde la sesión
   * de NextAuth. Maneja errores de forma segura y registra errores en desarrollo.
   * Es utilizada internamente por todas las funciones de solicitud para obtener
   * el token de autorización necesario.
   * @example
   * const { accessToken, refreshToken } = await this.getSessionData();
   * if (accessToken) {
   *   // Realizar solicitud autenticada
   * }
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
  /**
   * Refresca el accessToken usando el refreshToken
   * @returns Nuevo accessToken válido
   * @throws Error si el refresh falla o no hay refreshToken disponible
   * @description Esta función implementa un mecanismo de refresco de tokens con
   * soporte para múltiples solicitudes concurrentes. Si ya hay un refresh en curso,
   * las solicitudes adicionales esperan a que termine. Si el refresh falla, realiza
   * logout automático y lanza una excepción.
   * @example
   * try {
   *   const newToken = await this.refreshAccessToken();
   *   console.log("Token renovado:", newToken);
   * } catch (error) {
   *   console.error("No se pudo renovar el token:", error.message);
   * }
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
  /**
   * Realiza una solicitud HTTP con manejo de errores, timeout y refresh de token
   * @param url - URL completa del endpoint
   * @param options - Opciones de fetch (método, headers, body, etc.)
   * @param retry - Indica si es un reintento tras refresh de token (interno)
   * @returns Respuesta parseada del tipo T especificado
   * @throws Error si la solicitud falla, excede el timeout o la sesión expira
   * @description Función interna que implementa el núcleo de todas las solicitudes HTTP.
   * Maneja automáticamente el timeout, la autorización con tokens, el refresco de tokens
   * en caso de expiración y el logout forzado en caso de fallos de autenticación.
   * @template T Tipo de dato esperado en la respuesta
   * @example
   * // Uso interno - no se llama directamente
   * const data = await this.request<User[]>('/api/users', {
   *   method: 'GET',
   *   headers: { 'Accept': 'application/json' }
   * });
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
        // 1️⃣ Primer 401 → intentar refresh
        if (response.status === 401 && !retry) {
          try {
            const newAccessToken = await this.refreshAccessToken();
            headers["Authorization"] = `Bearer ${newAccessToken}`;
            return this.request<T>(url, { ...options, headers }, true);
          } catch {
            // refresh ya hace logout
            throw new Error("Sesión expirada");
          }
        }

        // 2️⃣ 401 después de retry → logout inmediato
        if (response.status === 401 && retry) {
          await this.forceLogout("401 after refresh");
          throw new Error("Sesión expirada");
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
  /**
   * Ejecuta una solicitud para descargar un blob con manejo de errores, timeout y refresh de token
   * @param url - URL completa del endpoint
   * @param options - Opciones de fetch (método, headers, body, etc.)
   * @param retry - Indica si es un reintento tras refresh de token (interno)
   * @returns Blob con el archivo descargado
   * @throws Error si la solicitud falla, excede el timeout o la sesión expira
   * @description Función interna que maneja la descarga de archivos blob con todas
   * las características de seguridad del cliente API: timeout, manejo de errores,
   * refresh automático de tokens y logout forzado en caso de fallos de autenticación.
   * @example
   * // Uso interno - no se llama directamente
   * const blob = await this.requestBlob('/api/files/download', {
   *   method: 'GET',
   *   headers: { 'Accept': 'application/pdf' }
   * });
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

      // Set Content-Type for non-FormData requests
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
        // 1️⃣ Primer 401 → intentar refresh
        if (response.status === 401 && !retry) {
          try {
            const newAccessToken = await this.refreshAccessToken();
            headers["Authorization"] = `Bearer ${newAccessToken}`;
            return this.requestBlob(url, { ...options, headers }, true);
          } catch {
            // refresh ya hace logout
            throw new Error("Sesión expirada");
          }
        }

        // 2️⃣ 401 después de retry → logout inmediato
        if (response.status === 401 && retry) {
          await this.forceLogout("401 after refresh");
          throw new Error("Sesión expirada");
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
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
   * Realiza un logout forzado del usuario actual
   * @param reason - Razón del logout forzado (opcional)
   * @description Esta función se utiliza cuando se detecta una sesión inválida o expirada
   * después de intentos de refresh de token. Registra la razón en consola y redirige al usuario
   * a la página de login para que pueda iniciar sesión nuevamente.
   * @example
   * // Logout por sesión expirada
   * await this.forceLogout("401 after refresh");
   *
   * // Logout sin razón específica
   * await this.forceLogout();
   */
  private static async forceLogout(reason?: string) {
    console.warn("[API] Logout forzado:", reason ?? "Unauthorized");
    await signOut({ callbackUrl: "/login" });
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

  /**
   * Descarga un archivo como blob via POST
   * @param path - Ruta relativa del endpoint
   * @param body - Cuerpo de la solicitud
   * @param options - Opciones adicionales
   * @returns Blob con el archivo
   */
  /**
   * Descarga un archivo como blob via POST
   * @param path - Ruta relativa del endpoint
   * @param body - Cuerpo de la solicitud (puede ser FormData o JSON)
   * @param options - Opciones adicionales para la solicitud
   * @returns Blob con el archivo descargado
   * @throws Error si la solicitud falla o el servidor responde con error
   * @description Esta función permite descargar archivos enviando datos en el cuerpo
   * de la solicitud POST. Maneja automáticamente FormData para subida de archivos
   * y JSON para consultas estructuradas. Es útil para reportes o exportaciones que
   * requieren parámetros complejos.
   * @example
   * // Descargar reporte con parámetros JSON
   * const blob = await ApiClient.postBlob('/reports/export', {
   *   startDate: '2023-01-01',
   *   endDate: '2023-12-31',
   *   format: 'pdf'
   * });
   *
   * // Descargar con FormData (archivos adjuntos)
   * const formData = new FormData();
   * formData.append('file', fileInput.files[0]);
   * const blob = await ApiClient.postBlob('/upload/preview', formData);
   */
  static async postBlob(
    path: string,
    body: any,
    options: ApiClientOptions = {}
  ): Promise<Blob> {
    // Handle FormData differently - don't set Content-Type header
    const isFormData = body instanceof FormData;
    const headers = { ...options.headers };

    if (isFormData) {
      // Remove Content-Type for FormData - let browser set it with boundary
      delete headers["Content-Type"];
    }

    console.log("XXX >>> ", JSON.stringify(body));

    return this.requestBlob(this.buildUrl(path), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: options.signal,
    });
  }
}
