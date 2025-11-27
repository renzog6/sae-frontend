// filepath: sae-frontend/lib/api/tires/tire-reports.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";

export interface TireReportFilter {
  brand?: string;
}

export interface AverageLifeReport {
  count: number;
  averageKm: number;
}

export interface CostPerKmReport {
  tireId: number;
  brand: string;
  totalCost: number;
  km: number;
  costPerKm: number | null;
}

export interface OverRecappedReport {
  tireId: number;
  recapCount: number;
}

export interface BrandRankingReport {
  brand: string;
  avgKm: number;
}

export interface YearlyRecapReport {
  year: number;
  totalRecaps: number;
  totalCost: number;
  costByBrand: Record<string, number>;
}

export class TireReportsService {
  private static basePath = "/tires/reports";

  static async getAverageLife(filter?: TireReportFilter) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const params = new URLSearchParams();
        if (filter?.brand) params.append("brand", filter.brand);

        return ApiClient.get<AverageLifeReport>(
          `${this.basePath}/average-life?${params.toString()}`
        );
      },
      "TireReportsService",
      "getAverageLife",
      { filter }
    );
  }

  static async getCostPerKm(filter?: TireReportFilter) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const params = new URLSearchParams();
        if (filter?.brand) params.append("brand", filter.brand);

        return ApiClient.get<CostPerKmReport[]>(
          `${this.basePath}/cost-per-km?${params.toString()}`
        );
      },
      "TireReportsService",
      "getCostPerKm",
      { filter }
    );
  }

  static async getOverRecapped(threshold = 2) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<OverRecappedReport[]>(
          `${this.basePath}/over-recap?threshold=${threshold}`
        );
      },
      "TireReportsService",
      "getOverRecapped",
      { threshold }
    );
  }

  static async getBrandRanking() {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<BrandRankingReport[]>(
          `${this.basePath}/brand-ranking`
        );
      },
      "TireReportsService",
      "getBrandRanking"
    );
  }

  static async getYearlyRecap(year: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<YearlyRecapReport>(
          `${this.basePath}/yearly-recaps?year=${year}`
        );
      },
      "TireReportsService",
      "getYearlyRecap",
      { year }
    );
  }
}
