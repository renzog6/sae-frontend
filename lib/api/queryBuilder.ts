//filepath: sae-frontend/lib/api/queryBuilder.ts
import { BaseQueryParams } from "@/lib/types/core/api";

export class QueryBuilder {
  // Construye solo parámetros COMUNES (BaseQueryParams)
  static build(query?: BaseQueryParams): string {
    if (!query) return "";

    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    return params.toString() ? `?${params.toString()}` : "";
  }

  // Construye URL con parámetros comunes
  static buildUrl(basePath: string, query?: BaseQueryParams): string {
    return basePath + this.build(query);
  }

  // 👇 NUEVO: Para parámetros ESPECÍFICOS de cada servicio
  static buildSpecific(params: Record<string, any>): string {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        urlParams.append(key, value.toString());
      }
    });

    return urlParams.toString();
  }

  // 👇 NUEVO: Combina URLs base y específicas
  static combineUrls(baseUrl: string, specificQuery: string): string {
    if (!specificQuery) return baseUrl;

    const connector = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${connector}${specificQuery}`;
  }
}
