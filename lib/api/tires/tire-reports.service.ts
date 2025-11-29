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

class TireReportsServiceClass {
  private basePath = "/tires/reports";

  // 🔧 Helper consistente con toda la estandarización SAE
  private buildParams(obj?: Record<string, any>): string {
    if (!obj) return "";
    const params = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    return params.toString();
  }

  async getAverageLife(filter?: TireReportFilter) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = this.buildParams(filter);
        return ApiClient.get<AverageLifeReport>(
          `${this.basePath}/average-life?${query}`
        );
      },
      "TireReportsService",
      "getAverageLife",
      { filter }
    );
  }

  async getCostPerKm(filter?: TireReportFilter) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = this.buildParams(filter);
        return ApiClient.get<CostPerKmReport[]>(
          `${this.basePath}/cost-per-km?${query}`
        );
      },
      "TireReportsService",
      "getCostPerKm",
      { filter }
    );
  }

  async getOverRecapped(threshold = 2) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = this.buildParams({ threshold });
        return ApiClient.get<OverRecappedReport[]>(
          `${this.basePath}/over-recap?${query}`
        );
      },
      "TireReportsService",
      "getOverRecapped",
      { threshold }
    );
  }

  async getBrandRanking() {
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

  async getYearlyRecap(year: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = this.buildParams({ year });
        return ApiClient.get<YearlyRecapReport>(
          `${this.basePath}/yearly-recaps?${query}`
        );
      },
      "TireReportsService",
      "getYearlyRecap",
      { year }
    );
  }
}

export const TireReportsService = new TireReportsServiceClass();
