// filepath: sae-frontend/lib/api/tires/tire-reports.service.ts

import { ApiClient } from "@/lib/api/apiClient";

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
    const params = new URLSearchParams();
    if (filter?.brand) params.append("brand", filter.brand);

    return ApiClient.get<AverageLifeReport>(
      `${this.basePath}/average-life?${params.toString()}`
    );
  }

  static async getCostPerKm(filter?: TireReportFilter) {
    const params = new URLSearchParams();
    if (filter?.brand) params.append("brand", filter.brand);

    return ApiClient.get<CostPerKmReport[]>(
      `${this.basePath}/cost-per-km?${params.toString()}`
    );
  }

  static async getOverRecapped(threshold = 2) {
    return ApiClient.get<OverRecappedReport[]>(
      `${this.basePath}/over-recap?threshold=${threshold}`
    );
  }

  static async getBrandRanking() {
    return ApiClient.get<BrandRankingReport[]>(
      `${this.basePath}/brand-ranking`
    );
  }

  static async getYearlyRecap(year: number) {
    return ApiClient.get<YearlyRecapReport>(
      `${this.basePath}/yearly-recaps?year=${year}`
    );
  }
}
