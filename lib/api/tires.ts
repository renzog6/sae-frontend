// filepath: sae-frontend/lib/api/tires.ts

import { ApiClient } from "./apiClient";
import {
  Tire,
  TireWithDetails,
  TireSummary,
  TireStats,
  TireSize,
  TireSizeAlias,
  TireAssignment,
  TireRotation,
  TireRecap,
  TireInspection,
  TireEvent,
  CreateTireDto,
  UpdateTireDto,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
  MountTireDto,
  UnmountTireDto,
  CreateTireRotationDto,
  UpdateTireRotationDto,
  CreateTireRecapDto,
  UpdateTireRecapDto,
  CreateTireInspectionDto,
  UpdateTireInspectionDto,
  TireReportFilterDto,
  TireAverageLifeReport,
  TireCostPerKmReport,
  TireOverRecappedReport,
  TireBrandRankingReport,
  TireYearlyRecapReport,
} from "@/types/tire";
import { PaginatedResponse, ApiResponse } from "@/types/api";

function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

// ===== TIRE CRUD =====

export class TiresService {
  static async getTires(
    accessToken: string,
    params?: {
      status?: string;
      brand?: string;
      size?: string;
      page?: number;
      limit?: number;
    }
  ) {
    const query = new URLSearchParams();
    if (params?.status) query.set("status", params.status);
    if (params?.brand) query.set("brand", params.brand);
    if (params?.size) query.set("size", params.size);
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.request<
      TireSummary[] | PaginatedResponse<TireSummary>
    >(`/tires${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireSummary[] | PaginatedResponse<TireSummary>>(response);
  }

  static async getTireById(id: number, accessToken: string) {
    const response = await ApiClient.request<
      TireWithDetails | ApiResponse<TireWithDetails>
    >(`/tires/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return unwrap<TireWithDetails>(response);
  }

  static async createTire(data: CreateTireDto, accessToken: string) {
    const response = await ApiClient.request<Tire | ApiResponse<Tire>>(
      "/tires",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Tire>(response);
  }

  static async updateTire(
    id: number,
    data: UpdateTireDto,
    accessToken: string
  ) {
    const response = await ApiClient.request<Tire | ApiResponse<Tire>>(
      `/tires/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Tire>(response);
  }

  static async deleteTire(id: number, accessToken: string) {
    await ApiClient.request(`/tires/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Tire deleted";
  }

  static async getTireStats(accessToken: string) {
    const response = await ApiClient.request<
      TireStats | ApiResponse<TireStats>
    >("/tires/stats", { headers: { Authorization: `Bearer ${accessToken}` } });
    return unwrap<TireStats>(response);
  }
}

// ===== TIRE SIZES =====

export class TireSizesService {
  static async getTireSizes(accessToken: string) {
    const response = await ApiClient.request<
      TireSize[] | PaginatedResponse<TireSize>
    >("/tires/sizes", { headers: { Authorization: `Bearer ${accessToken}` } });
    return unwrap<TireSize[] | PaginatedResponse<TireSize>>(response);
  }

  static async getTireSizeById(id: number, accessToken: string) {
    const response = await ApiClient.request<TireSize | ApiResponse<TireSize>>(
      `/tires/sizes/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<TireSize>(response);
  }

  static async createTireSize(data: CreateTireSizeDto, accessToken: string) {
    const response = await ApiClient.request<TireSize | ApiResponse<TireSize>>(
      "/tires/sizes",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<TireSize>(response);
  }

  static async updateTireSize(
    id: number,
    data: UpdateTireSizeDto,
    accessToken: string
  ) {
    const response = await ApiClient.request<TireSize | ApiResponse<TireSize>>(
      `/tires/sizes/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<TireSize>(response);
  }

  static async deleteTireSize(id: number, accessToken: string) {
    await ApiClient.request(`/tires/sizes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Tire size deleted";
  }
}

// ===== TIRE SIZE ALIASES =====

export class TireSizeAliasesService {
  static async getAliasesBySize(sizeId: number, accessToken: string) {
    const response = await ApiClient.request<
      TireSizeAlias[] | PaginatedResponse<TireSizeAlias>
    >(`/tires/sizes/${sizeId}/aliases`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireSizeAlias[] | PaginatedResponse<TireSizeAlias>>(response);
  }

  static async createTireSizeAlias(
    data: CreateTireSizeAliasDto,
    accessToken: string
  ) {
    const response = await ApiClient.request<
      TireSizeAlias | ApiResponse<TireSizeAlias>
    >("/tires/size-aliases", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireSizeAlias>(response);
  }

  static async updateTireSizeAlias(
    id: number,
    data: UpdateTireSizeAliasDto,
    accessToken: string
  ) {
    const response = await ApiClient.request<
      TireSizeAlias | ApiResponse<TireSizeAlias>
    >(`/tires/size-aliases/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireSizeAlias>(response);
  }

  static async deleteTireSizeAlias(id: number, accessToken: string) {
    await ApiClient.request(`/tires/size-aliases/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Tire size alias deleted";
  }
}

// ===== TIRE ASSIGNMENTS =====

export class TireAssignmentsService {
  static async mountTire(data: MountTireDto, accessToken: string) {
    const response = await ApiClient.request<
      TireAssignment | ApiResponse<TireAssignment>
    >("/tires/assignments/mount", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireAssignment>(response);
  }

  static async unmountTire(data: UnmountTireDto, accessToken: string) {
    const response = await ApiClient.request<
      TireAssignment | ApiResponse<TireAssignment>
    >("/tires/assignments/unmount", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireAssignment>(response);
  }

  static async getAssignmentsByTire(tireId: number, accessToken: string) {
    const response = await ApiClient.request<
      TireAssignment[] | PaginatedResponse<TireAssignment>
    >(`/tires/assignments/tire/${tireId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireAssignment[] | PaginatedResponse<TireAssignment>>(
      response
    );
  }

  static async getOpenAssignments(accessToken: string) {
    const response = await ApiClient.request<
      TireAssignment[] | PaginatedResponse<TireAssignment>
    >("/tires/assignments/open", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireAssignment[] | PaginatedResponse<TireAssignment>>(
      response
    );
  }

  static async getAllAssignments(accessToken: string) {
    const response = await ApiClient.request<
      TireAssignment[] | PaginatedResponse<TireAssignment>
    >("/tires/assignments", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireAssignment[] | PaginatedResponse<TireAssignment>>(
      response
    );
  }
}

// ===== TIRE ROTATIONS =====

export class TireRotationsService {
  static async getTireRotations(accessToken: string) {
    const response = await ApiClient.request<
      TireRotation[] | PaginatedResponse<TireRotation>
    >("/tires/rotations", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireRotation[] | PaginatedResponse<TireRotation>>(response);
  }

  static async getTireRotationById(id: number, accessToken: string) {
    const response = await ApiClient.request<
      TireRotation | ApiResponse<TireRotation>
    >(`/tires/rotations/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireRotation>(response);
  }

  static async getRotationsByTire(tireId: number, accessToken: string) {
    const response = await ApiClient.request<
      TireRotation[] | PaginatedResponse<TireRotation>
    >(`/tires/rotations/tire/${tireId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireRotation[] | PaginatedResponse<TireRotation>>(response);
  }

  static async createTireRotation(
    data: CreateTireRotationDto,
    accessToken: string
  ) {
    const response = await ApiClient.request<
      TireRotation | ApiResponse<TireRotation>
    >("/tires/rotations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireRotation>(response);
  }

  static async updateTireRotation(
    id: number,
    data: UpdateTireRotationDto,
    accessToken: string
  ) {
    const response = await ApiClient.request<
      TireRotation | ApiResponse<TireRotation>
    >(`/tires/rotations/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireRotation>(response);
  }

  static async deleteTireRotation(id: number, accessToken: string) {
    await ApiClient.request(`/tires/rotations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Tire rotation deleted";
  }
}

// ===== TIRE RECAPS =====

export class TireRecapsService {
  static async getTireRecaps(accessToken: string) {
    const response = await ApiClient.request<
      TireRecap[] | PaginatedResponse<TireRecap>
    >("/tires/recaps", { headers: { Authorization: `Bearer ${accessToken}` } });
    return unwrap<TireRecap[] | PaginatedResponse<TireRecap>>(response);
  }

  static async getTireRecapById(id: number, accessToken: string) {
    const response = await ApiClient.request<
      TireRecap | ApiResponse<TireRecap>
    >(`/tires/recaps/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireRecap>(response);
  }

  static async getRecapsByTire(tireId: number, accessToken: string) {
    const response = await ApiClient.request<
      TireRecap[] | PaginatedResponse<TireRecap>
    >(`/tires/recaps/tire/${tireId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireRecap[] | PaginatedResponse<TireRecap>>(response);
  }

  static async createTireRecap(data: CreateTireRecapDto, accessToken: string) {
    const response = await ApiClient.request<
      TireRecap | ApiResponse<TireRecap>
    >("/tires/recaps", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireRecap>(response);
  }

  static async updateTireRecap(
    id: number,
    data: UpdateTireRecapDto,
    accessToken: string
  ) {
    const response = await ApiClient.request<
      TireRecap | ApiResponse<TireRecap>
    >(`/tires/recaps/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireRecap>(response);
  }

  static async deleteTireRecap(id: number, accessToken: string) {
    await ApiClient.request(`/tires/recaps/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Tire recap deleted";
  }
}

// ===== TIRE INSPECTIONS =====

export class TireInspectionsService {
  static async getTireInspections(accessToken: string) {
    const response = await ApiClient.request<
      TireInspection[] | PaginatedResponse<TireInspection>
    >("/tires/inspections", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireInspection[] | PaginatedResponse<TireInspection>>(
      response
    );
  }

  static async getTireInspectionById(id: number, accessToken: string) {
    const response = await ApiClient.request<
      TireInspection | ApiResponse<TireInspection>
    >(`/tires/inspections/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireInspection>(response);
  }

  static async getInspectionsByTire(tireId: number, accessToken: string) {
    const response = await ApiClient.request<
      TireInspection[] | PaginatedResponse<TireInspection>
    >(`/tires/inspections/tire/${tireId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireInspection[] | PaginatedResponse<TireInspection>>(
      response
    );
  }

  static async createTireInspection(
    data: CreateTireInspectionDto,
    accessToken: string
  ) {
    const response = await ApiClient.request<
      TireInspection | ApiResponse<TireInspection>
    >("/tires/inspections", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireInspection>(response);
  }

  static async updateTireInspection(
    id: number,
    data: UpdateTireInspectionDto,
    accessToken: string
  ) {
    const response = await ApiClient.request<
      TireInspection | ApiResponse<TireInspection>
    >(`/tires/inspections/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<TireInspection>(response);
  }

  static async deleteTireInspection(id: number, accessToken: string) {
    await ApiClient.request(`/tires/inspections/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Tire inspection deleted";
  }
}

// ===== TIRE EVENTS =====

export class TireEventsService {
  static async getEventsByTire(tireId: number, accessToken: string) {
    const response = await ApiClient.request<
      TireEvent[] | PaginatedResponse<TireEvent>
    >(`/tires/events/tire/${tireId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireEvent[] | PaginatedResponse<TireEvent>>(response);
  }

  static async getAllEvents(
    accessToken: string,
    params?: { eventType?: string; fromDate?: string; toDate?: string }
  ) {
    const query = new URLSearchParams();
    if (params?.eventType) query.set("eventType", params.eventType);
    if (params?.fromDate) query.set("fromDate", params.fromDate);
    if (params?.toDate) query.set("toDate", params.toDate);
    const qs = query.toString();
    const response = await ApiClient.request<
      TireEvent[] | PaginatedResponse<TireEvent>
    >(`/tires/events${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireEvent[] | PaginatedResponse<TireEvent>>(response);
  }
}

// ===== TIRE REPORTS =====

export class TireReportsService {
  static async getAverageLifeReport(
    filter: TireReportFilterDto | undefined,
    accessToken: string
  ) {
    const query = new URLSearchParams();
    if (filter?.brand) query.set("brand", filter.brand);
    if (filter?.fromDate) query.set("fromDate", filter.fromDate);
    if (filter?.toDate) query.set("toDate", filter.toDate);
    if (filter?.minKm) query.set("minKm", String(filter.minKm));
    const qs = query.toString();
    const response = await ApiClient.request<
      TireAverageLifeReport | ApiResponse<TireAverageLifeReport>
    >(`/tires/reports/average-life${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireAverageLifeReport>(response);
  }

  static async getCostPerKmReport(
    filter: TireReportFilterDto | undefined,
    accessToken: string
  ) {
    const query = new URLSearchParams();
    if (filter?.brand) query.set("brand", filter.brand);
    if (filter?.fromDate) query.set("fromDate", filter.fromDate);
    if (filter?.toDate) query.set("toDate", filter.toDate);
    if (filter?.minKm) query.set("minKm", String(filter.minKm));
    const qs = query.toString();
    const response = await ApiClient.request<
      TireCostPerKmReport | ApiResponse<TireCostPerKmReport>
    >(`/tires/reports/cost-per-km${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireCostPerKmReport>(response);
  }

  static async getOverRecappedReport(threshold: number, accessToken: string) {
    const response = await ApiClient.request<
      TireOverRecappedReport | ApiResponse<TireOverRecappedReport>
    >(`/tires/reports/over-recap?threshold=${threshold}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireOverRecappedReport>(response);
  }

  static async getBrandRankingReport(accessToken: string) {
    const response = await ApiClient.request<
      TireBrandRankingReport | ApiResponse<TireBrandRankingReport>
    >("/tires/reports/brand-ranking", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireBrandRankingReport>(response);
  }

  static async getYearlyRecapReport(year: number, accessToken: string) {
    const response = await ApiClient.request<
      TireYearlyRecapReport | ApiResponse<TireYearlyRecapReport>
    >(`/tires/reports/yearly-recaps?year=${year}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<TireYearlyRecapReport>(response);
  }

  // Export methods return Blob for file download
  static async exportAverageLifeReport(
    filter: TireReportFilterDto | undefined,
    accessToken: string
  ) {
    const query = new URLSearchParams();
    if (filter?.brand) query.set("brand", filter.brand);
    if (filter?.fromDate) query.set("fromDate", filter.fromDate);
    if (filter?.toDate) query.set("toDate", filter.toDate);
    if (filter?.minKm) query.set("minKm", String(filter.minKm));
    const qs = query.toString();
    return ApiClient.requestBlob(
      `/tires/reports/export/average-life${qs ? `?${qs}` : ""}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  }

  static async exportBrandRankingReport(accessToken: string) {
    return ApiClient.requestBlob("/tires/reports/export/brand-ranking", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  static async exportCostPerKmReport(
    filter: TireReportFilterDto | undefined,
    accessToken: string
  ) {
    const query = new URLSearchParams();
    if (filter?.brand) query.set("brand", filter.brand);
    if (filter?.fromDate) query.set("fromDate", filter.fromDate);
    if (filter?.toDate) query.set("toDate", filter.toDate);
    if (filter?.minKm) query.set("minKm", String(filter.minKm));
    const qs = query.toString();
    return ApiClient.requestBlob(
      `/tires/reports/export/cost-per-km${qs ? `?${qs}` : ""}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  }

  static async exportYearlyRecapReport(year: number, accessToken: string) {
    return ApiClient.requestBlob(
      `/tires/reports/export/yearly-recaps?year=${year}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  }
}
