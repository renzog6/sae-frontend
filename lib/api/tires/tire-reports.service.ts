//filepath: sae-frontend/lib/api/tires/tire-reports.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { unwrap } from "../utils";
import {
  TireAverageLifeReport,
  TireCostPerKmReport,
  TireBrandRankingReport,
} from "@/lib/types";

// Definición de interfaces para parámetros de reportes
interface AverageLifeParams {
  year?: number;
  brandId?: number;
  sizeId?: number;
}

interface CostPerKmParams {
  startDate?: string;
  endDate?: string;
  equipmentId?: number;
}

interface BrandRankingParams {
  minKm?: number;
  maxRecaps?: number;
}

export class TireReportsService {
  private static basePath = "/tires/reports";

  static async averageLife(params: AverageLifeParams = {}) {
    const query = new URLSearchParams();
    if (params.year) query.append("year", params.year.toString());
    if (params.brandId) query.append("brandId", params.brandId.toString());
    if (params.sizeId) query.append("sizeId", params.sizeId.toString());

    const response = await ApiClient.get(
      `${this.basePath}/average-life?${query.toString()}`
    );
    return unwrap<TireAverageLifeReport>(response);
  }

  static async costPerKm(params: CostPerKmParams = {}) {
    const query = new URLSearchParams();
    if (params.startDate) query.append("startDate", params.startDate);
    if (params.endDate) query.append("endDate", params.endDate);
    if (params.equipmentId)
      query.append("equipmentId", params.equipmentId.toString());

    const response = await ApiClient.get(
      `${this.basePath}/cost-per-km?${query.toString()}`
    );
    return unwrap<TireCostPerKmReport>(response);
  }

  static async brandRanking(params: BrandRankingParams = {}) {
    const query = new URLSearchParams();
    if (params.minKm) query.append("minKm", params.minKm.toString());
    if (params.maxRecaps)
      query.append("maxRecaps", params.maxRecaps.toString());

    const response = await ApiClient.get(
      `${this.basePath}/brand-ranking?${query.toString()}`
    );
    return unwrap<TireBrandRankingReport>(response);
  }

  static async exportReport(
    reportType: "average-life" | "cost-per-km" | "brand-ranking",
    params: Record<string, any> = {}
  ) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) query.append(key, value.toString());
    });

    const response = await ApiClient.getBlob(
      `${this.basePath}/${reportType}/export?${query.toString()}`
    );
    return response;
  }
}
