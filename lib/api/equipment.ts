// filepath: sae-frontend/lib/api/equipment.ts
import { ApiClient } from "./apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { unwrap, normalizeListResponse } from "@/lib/api/utils";
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
  EquipmentAxle,
} from "@/lib/types/equipment";

export class EquipmentService {
  // ===== EQUIPMENT AXLES =====

  static async getEquipmentAxles(params?: { equipmentId?: number }) {
    const query = new URLSearchParams();
    if (params?.equipmentId)
      query.set("equipmentId", String(params.equipmentId));
    const qs = query.toString();

    const response = await ApiClient.get<
      EquipmentAxle[] | PaginatedResponse<EquipmentAxle>
    >(`/equipments/axles${qs ? `?${qs}` : ""}`);
    return unwrap<EquipmentAxle[] | PaginatedResponse<EquipmentAxle>>(response);
  }

  static async getEquipmentAxleById(id: number, accessToken: string) {
    const response = await ApiClient.get<
      EquipmentAxle | ApiResponse<EquipmentAxle>
    >(`/equipments/axles/${id}`);
    return unwrap<EquipmentAxle>(response);
  }

  static async createEquipmentAxle(
    data: {
      equipmentId: number;
      order: number;
      axleType: string;
      wheelCount: number;
      description?: string;
    },
    accessToken: string
  ) {
    const response = await ApiClient.post<
      EquipmentAxle | ApiResponse<EquipmentAxle>
    >("/equipments/axles", data);
    return unwrap<EquipmentAxle>(response);
  }

  static async updateEquipmentAxle(
    id: number,
    data: Partial<{
      equipmentId: number;
      order: number;
      axleType: string;
      wheelCount: number;
      description?: string;
    }>,
    accessToken: string
  ) {
    const response = await ApiClient.put<
      EquipmentAxle | ApiResponse<EquipmentAxle>
    >(`/equipments/axles/${id}`, data);
    return unwrap<EquipmentAxle>(response);
  }

  static async deleteEquipmentAxle(id: number, accessToken: string) {
    await ApiClient.delete(`/equipments/axles/${id}`);
    return "Equipment axle deleted";
  }

  static async createWithPositions(
    data: {
      axle: {
        equipmentId: number;
        order: number;
        axleType: string;
        wheelCount: number;
        description?: string;
      };
      positions: Array<{
        positionKey: string;
        side: string;
        isDual: boolean;
      }>;
    },
    accessToken: string
  ) {
    const response = await ApiClient.post(
      "/equipments/axles/with-positions",
      data
    );
    return unwrap<any>(response);
  }

  // Get positions by equipment
  static async getEquipmentAxlePositions(equipmentId: number) {
    const response = await ApiClient.get(
      `/equipments/axles/positions/equipment/${equipmentId}`
    );
    return unwrap<any>(response);
  }

  // Categories
  static async getCategories(): Promise<EquipmentCategory[]> {
    const response = await ApiClient.get<
      EquipmentCategory[] | ApiResponse<EquipmentCategory[]>
    >("/equipments/categories");
    return unwrap<EquipmentCategory[]>(response);
  }

  static async createCategory(
    data: CreateEquipmentCategoryDto,
    accessToken: string
  ): Promise<EquipmentCategory> {
    const response = await ApiClient.post<
      EquipmentCategory | ApiResponse<EquipmentCategory>
    >("/equipments/categories", data);
    return unwrap<EquipmentCategory>(response);
  }

  static async updateCategory(
    id: number,
    data: UpdateEquipmentCategoryDto,
    accessToken: string
  ): Promise<EquipmentCategory> {
    const response = await ApiClient.put<
      EquipmentCategory | ApiResponse<EquipmentCategory>
    >(`/equipments/categories/${id}`, data);
    return unwrap<EquipmentCategory>(response);
  }

  static async deleteCategory(
    id: number,
    accessToken: string
  ): Promise<string> {
    await ApiClient.delete(`/equipments/categories/${id}`);
    return "Category deleted";
  }

  // Types
  static async getTypes(params?: {
    categoryId?: number;
  }): Promise<EquipmentType[]> {
    const query = new URLSearchParams();
    if (params?.categoryId) query.set("categoryId", String(params.categoryId));
    const qs = query.toString();
    const response = await ApiClient.get<
      EquipmentType[] | ApiResponse<EquipmentType[]>
    >(`/equipments/types${qs ? `?${qs}` : ""}`);
    return unwrap<EquipmentType[]>(response);
  }

  static async getTypeById(
    id: number,
    accessToken: string
  ): Promise<EquipmentType> {
    const response = await ApiClient.get<
      EquipmentType | ApiResponse<EquipmentType>
    >(`/equipments/types/${id}`);
    return unwrap<EquipmentType>(response);
  }

  static async createType(
    data: CreateEquipmentTypeDto,
    accessToken: string
  ): Promise<EquipmentType> {
    const response = await ApiClient.post<
      EquipmentType | ApiResponse<EquipmentType>
    >("/equipments/types", data);
    return unwrap<EquipmentType>(response);
  }

  static async updateType(
    id: number,
    data: UpdateEquipmentTypeDto,
    accessToken: string
  ): Promise<EquipmentType> {
    const response = await ApiClient.put<
      EquipmentType | ApiResponse<EquipmentType>
    >(`/equipments/types/${id}`, data);
    return unwrap<EquipmentType>(response);
  }

  static async deleteType(id: number, accessToken: string): Promise<string> {
    await ApiClient.delete(`/equipments/types/${id}`);
    return "Type deleted";
  }

  static async getTypesByCategory(
    categoryId: number,
    accessToken: string
  ): Promise<EquipmentType[]> {
    const response = await ApiClient.get<
      EquipmentType[] | ApiResponse<EquipmentType[]>
    >(`/equipments/types/category/${categoryId}`);
    return unwrap<EquipmentType[]>(response);
  }

  // Models
  static async getModels(params?: {
    typeId?: number;
  }): Promise<EquipmentModel[]> {
    const query = new URLSearchParams();
    if (params?.typeId) query.set("typeId", String(params.typeId));
    const qs = query.toString();
    const response = await ApiClient.get<
      EquipmentModel[] | ApiResponse<EquipmentModel[]>
    >(`/equipments/models${qs ? `?${qs}` : ""}`);
    return unwrap<EquipmentModel[]>(response);
  }

  static async getModelById(
    id: number,
    accessToken: string
  ): Promise<EquipmentModel> {
    const response = await ApiClient.get<
      EquipmentModel | ApiResponse<EquipmentModel>
    >(`/equipments/models/${id}`);
    return unwrap<EquipmentModel>(response);
  }

  static async createModel(
    data: CreateEquipmentModelDto,
    accessToken: string
  ): Promise<EquipmentModel> {
    const response = await ApiClient.post<
      EquipmentModel | ApiResponse<EquipmentModel>
    >("/equipments/models", data);
    return unwrap<EquipmentModel>(response);
  }

  static async updateModel(
    id: number,
    data: UpdateEquipmentModelDto,
    accessToken: string
  ): Promise<EquipmentModel> {
    const response = await ApiClient.put<
      EquipmentModel | ApiResponse<EquipmentModel>
    >(`/equipments/models/${id}`, data);
    return unwrap<EquipmentModel>(response);
  }

  static async deleteModel(id: number, accessToken: string): Promise<string> {
    await ApiClient.delete(`/equipments/models/${id}`);
    return "Model deleted";
  }

  static async getModelsByType(
    typeId: number,
    accessToken: string
  ): Promise<EquipmentModel[]> {
    const response = await ApiClient.get<
      EquipmentModel[] | ApiResponse<EquipmentModel[]>
    >(`/equipments/models/type/${typeId}`);
    return unwrap<EquipmentModel[]>(response);
  }

  // Equipment
  static async getEquipment(params?: {
    skip?: number;
    take?: number;
    typeId?: number;
    modelId?: number;
    categoryId?: number;
    year?: number;
    search?: string;
  }): Promise<PaginatedResponse<Equipment>> {
    const query = new URLSearchParams();
    if (params?.skip !== undefined) query.set("skip", String(params.skip));
    if (params?.take !== undefined) query.set("take", String(params.take));
    if (params?.typeId) query.set("typeId", String(params.typeId));
    if (params?.modelId) query.set("modelId", String(params.modelId));
    if (params?.categoryId) query.set("categoryId", String(params.categoryId));
    if (params?.year) query.set("year", String(params.year));
    if (params?.search) query.set("search", params.search);
    const qs = query.toString();

    const url = `/equipments${qs ? `?${qs}` : ""}`;

    const response = await ApiClient.get<
      Equipment[] | PaginatedResponse<Equipment>
    >(url);

    const normalized = normalizeListResponse<Equipment>(response);

    return normalized;
  }

  static async getEquipmentById(
    id: number,
    accessToken: string
  ): Promise<Equipment> {
    const response = await ApiClient.get<Equipment | ApiResponse<Equipment>>(
      `/equipments/${id}`
    );
    return unwrap<Equipment>(response);
  }

  static async createEquipment(
    data: CreateEquipmentDto,
    accessToken: string
  ): Promise<Equipment> {
    const response = await ApiClient.post<Equipment | ApiResponse<Equipment>>(
      "/equipments",
      data
    );
    return unwrap<Equipment>(response);
  }

  static async updateEquipment(
    id: number,
    data: UpdateEquipmentDto,
    accessToken: string
  ): Promise<Equipment> {
    const response = await ApiClient.put<Equipment | ApiResponse<Equipment>>(
      `/equipments/${id}`,
      data
    );
    return unwrap<Equipment>(response);
  }

  static async deleteEquipment(
    id: number,
    accessToken: string
  ): Promise<string> {
    await ApiClient.delete(`/equipments/${id}`);
    return "Equipment deleted";
  }
}
