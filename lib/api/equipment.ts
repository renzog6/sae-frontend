// filepath: sae-frontend/lib/api/equipment.ts
import { ApiClient } from "./apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { normalizeListResponse } from "@/lib/api/utils";
import {
  Equipment,
  EquipmentCategory,
  EquipmentType,
  EquipmentModel,
  CreateEquipmentCategoryDto,
  UpdateEquipmentCategoryDto,
  CreateEquipmentTypeDto,
  UpdateEquipmentTypeDto,
  CreateEquipmentModelDto,
  UpdateEquipmentModelDto,
  CreateEquipmentDto,
  UpdateEquipmentDto,
} from "@/lib/types/equipment";

function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

export class EquipmentService {
  // Categories
  static async getCategories(
    accessToken: string
  ): Promise<EquipmentCategory[]> {
    const response = await ApiClient.request<
      EquipmentCategory[] | ApiResponse<EquipmentCategory[]>
    >("/equipment/categories/all", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<EquipmentCategory[]>(response);
  }

  static async createCategory(
    data: CreateEquipmentCategoryDto,
    accessToken: string
  ): Promise<EquipmentCategory> {
    const response = await ApiClient.request<
      EquipmentCategory | ApiResponse<EquipmentCategory>
    >("/equipment-categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EquipmentCategory>(response);
  }

  static async updateCategory(
    id: number,
    data: UpdateEquipmentCategoryDto,
    accessToken: string
  ): Promise<EquipmentCategory> {
    const response = await ApiClient.request<
      EquipmentCategory | ApiResponse<EquipmentCategory>
    >(`/equipment-categories/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EquipmentCategory>(response);
  }

  static async deleteCategory(
    id: number,
    accessToken: string
  ): Promise<string> {
    await ApiClient.request(`/equipment-categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Category deleted";
  }

  // Types
  static async getTypes(
    accessToken: string,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<EquipmentType>> {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.request<
      EquipmentType[] | PaginatedResponse<EquipmentType>
    >(`/equipment/types/all${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return normalizeListResponse<EquipmentType>(response);
  }

  static async getTypeById(
    id: number,
    accessToken: string
  ): Promise<EquipmentType> {
    const response = await ApiClient.request<
      EquipmentType | ApiResponse<EquipmentType>
    >(`/equipment-types/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<EquipmentType>(response);
  }

  static async createType(
    data: CreateEquipmentTypeDto,
    accessToken: string
  ): Promise<EquipmentType> {
    const response = await ApiClient.request<
      EquipmentType | ApiResponse<EquipmentType>
    >("/equipment-types", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EquipmentType>(response);
  }

  static async updateType(
    id: number,
    data: UpdateEquipmentTypeDto,
    accessToken: string
  ): Promise<EquipmentType> {
    const response = await ApiClient.request<
      EquipmentType | ApiResponse<EquipmentType>
    >(`/equipment-types/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EquipmentType>(response);
  }

  static async deleteType(id: number, accessToken: string): Promise<string> {
    await ApiClient.request(`/equipment-types/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Type deleted";
  }

  static async getTypesByCategory(
    categoryId: number,
    accessToken: string
  ): Promise<EquipmentType[]> {
    const response = await ApiClient.request<
      EquipmentType[] | ApiResponse<EquipmentType[]>
    >(`/equipment-types/category/${categoryId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<EquipmentType[]>(response);
  }

  // Models
  static async getModels(
    accessToken: string,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<EquipmentModel>> {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.request<
      EquipmentModel[] | PaginatedResponse<EquipmentModel>
    >(`/equipment/models/all${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return normalizeListResponse<EquipmentModel>(response);
  }

  static async getModelById(
    id: number,
    accessToken: string
  ): Promise<EquipmentModel> {
    const response = await ApiClient.request<
      EquipmentModel | ApiResponse<EquipmentModel>
    >(`/equipment-models/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<EquipmentModel>(response);
  }

  static async createModel(
    data: CreateEquipmentModelDto,
    accessToken: string
  ): Promise<EquipmentModel> {
    const response = await ApiClient.request<
      EquipmentModel | ApiResponse<EquipmentModel>
    >("/equipment-models", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EquipmentModel>(response);
  }

  static async updateModel(
    id: number,
    data: UpdateEquipmentModelDto,
    accessToken: string
  ): Promise<EquipmentModel> {
    const response = await ApiClient.request<
      EquipmentModel | ApiResponse<EquipmentModel>
    >(`/equipment-models/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EquipmentModel>(response);
  }

  static async deleteModel(id: number, accessToken: string): Promise<string> {
    await ApiClient.request(`/equipment-models/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Model deleted";
  }

  static async getModelsByType(
    typeId: number,
    accessToken: string
  ): Promise<EquipmentModel[]> {
    const response = await ApiClient.request<
      EquipmentModel[] | ApiResponse<EquipmentModel[]>
    >(`/equipment-models/type/${typeId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<EquipmentModel[]>(response);
  }

  // Equipment
  static async getEquipment(
    accessToken: string,
    params?: { page?: number; limit?: number; companyId?: number }
  ): Promise<PaginatedResponse<Equipment>> {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.companyId) query.set("companyId", String(params.companyId));
    const qs = query.toString();

    const url = `/equipment${qs ? `?${qs}` : ""}`;

    const response = await ApiClient.request<
      Equipment[] | PaginatedResponse<Equipment>
    >(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const normalized = normalizeListResponse<Equipment>(response);

    return normalized;
  }

  static async getEquipmentById(
    id: number,
    accessToken: string
  ): Promise<Equipment> {
    const response = await ApiClient.request<
      Equipment | ApiResponse<Equipment>
    >(`/equipment/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<Equipment>(response);
  }

  static async createEquipment(
    data: CreateEquipmentDto,
    accessToken: string
  ): Promise<Equipment> {
    const response = await ApiClient.request<
      Equipment | ApiResponse<Equipment>
    >("/equipment", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<Equipment>(response);
  }

  static async updateEquipment(
    id: number,
    data: UpdateEquipmentDto,
    accessToken: string
  ): Promise<Equipment> {
    const response = await ApiClient.request<
      Equipment | ApiResponse<Equipment>
    >(`/equipment/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<Equipment>(response);
  }

  static async deleteEquipment(
    id: number,
    accessToken: string
  ): Promise<string> {
    await ApiClient.request(`/equipment/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Equipment deleted";
  }
}
