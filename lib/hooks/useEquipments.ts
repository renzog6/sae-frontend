// filepath: sae-frontend/lib/hooks/useEquipments.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  EquipmentsService,
  EquipmentModelsService,
  EquipmentTypesService,
  EquipmentCategoriesService,
  EquipmentAxlesService,
} from "@/lib/api/equipments";
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
import { PaginatedResponse } from "@/lib/types/api";

// ===== EQUIPMENT AXLES =====

export function useEquipmentAxles(params?: { equipmentId?: number }) {
  return useQuery({
    queryKey: ["equipment-axles", params?.equipmentId ?? ""],
    queryFn: () => EquipmentAxlesService.getAll(params),
    enabled: !!params?.equipmentId,
  });
}

export function useEquipmentAxleDetail(id: number | undefined) {
  return useQuery({
    queryKey: ["equipment-axles", id],
    queryFn: () => EquipmentAxlesService.getById(id as number),
    enabled: typeof id === "number",
  });
}

export function useCreateEquipmentAxle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      equipmentId: number;
      order: number;
      axleType: string;
      wheelCount: number;
      description?: string;
    }) => EquipmentAxlesService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment-axles"] });
    },
  });
}

export function useUpdateEquipmentAxle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      id: number;
      data: Partial<{
        equipmentId: number;
        order: number;
        axleType: string;
        wheelCount: number;
        description?: string;
      }>;
    }) => EquipmentAxlesService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment-axles"] });
      qc.invalidateQueries({ queryKey: ["equipment-axles", vars.id] });
    },
  });
}

export function useDeleteEquipmentAxle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EquipmentAxlesService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment-axles"] });
      qc.invalidateQueries({ queryKey: ["equipment-axles", id] });
    },
  });
}

// Categories
export function useEquipmentCategories(params?: {
  page?: number;
  limit?: number;
}) {
  return useQuery<PaginatedResponse<EquipmentCategory>, Error>({
    queryKey: ["equipment-categories", params?.page ?? 1, params?.limit ?? 10],
    queryFn: () => EquipmentCategoriesService.getAll(params),
  });
}

export function useCreateEquipmentCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEquipmentCategoryDto) =>
      EquipmentCategoriesService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment-categories"] });
    },
  });
}

export function useUpdateEquipmentCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEquipmentCategoryDto }) =>
      EquipmentCategoriesService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment-categories"] });
      qc.invalidateQueries({ queryKey: ["equipment-category", vars.id] });
    },
  });
}

export function useDeleteEquipmentCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EquipmentCategoriesService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment-categories"] });
      qc.invalidateQueries({ queryKey: ["equipment-category", id] });
    },
  });
}

// Types
export function useEquipmentTypes(params?: {
  categoryId?: number;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: [
      "equipment-types",
      params?.categoryId ?? "",
      params?.page ?? 1,
      params?.limit ?? 10,
    ],
    queryFn: () => EquipmentTypesService.getAll(params),
  });
}

export function useEquipmentTypeDetail(id: number | undefined) {
  return useQuery({
    queryKey: ["equipment-types", id],
    queryFn: () => EquipmentTypesService.getById(id as number),
    enabled: typeof id === "number",
  });
}

export function useCreateEquipmentType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEquipmentTypeDto) =>
      EquipmentTypesService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment-types"] });
    },
  });
}

export function useUpdateEquipmentType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEquipmentTypeDto }) =>
      EquipmentTypesService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment-types"] });
      qc.invalidateQueries({ queryKey: ["equipment-types", vars.id] });
    },
  });
}

export function useDeleteEquipmentType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EquipmentTypesService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment-types"] });
      qc.invalidateQueries({ queryKey: ["equipment-types", id] });
    },
  });
}

export function useEquipmentTypesByCategory(categoryId: number) {
  return useQuery<EquipmentType[], Error>({
    queryKey: ["equipment-types", "category", categoryId],
    queryFn: () => EquipmentTypesService.getByCategory(categoryId),
  });
}

// Models
export function useEquipmentModels(params?: {
  typeId?: number;
  page?: number;
  limit?: number;
}) {
  return useQuery<PaginatedResponse<EquipmentModel>, Error>({
    queryKey: [
      "equipment-models",
      params?.typeId ?? "",
      params?.page ?? 1,
      params?.limit ?? 10,
    ],
    queryFn: () => EquipmentModelsService.getAll(params),
  });
}

export function useEquipmentModelDetail(id: number | undefined) {
  return useQuery({
    queryKey: ["equipment-models", id],
    queryFn: () => EquipmentModelsService.getById(id as number),
    enabled: typeof id === "number",
  });
}

export function useCreateEquipmentModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEquipmentModelDto) =>
      EquipmentModelsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment-models"] });
    },
  });
}

export function useUpdateEquipmentModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEquipmentModelDto }) =>
      EquipmentModelsService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment-models"] });
      qc.invalidateQueries({ queryKey: ["equipment-models", vars.id] });
    },
  });
}

export function useDeleteEquipmentModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EquipmentModelsService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment-models"] });
      qc.invalidateQueries({ queryKey: ["equipment-models", id] });
    },
  });
}

export function useEquipmentModelsByType(typeId: number) {
  return useQuery<EquipmentModel[], Error>({
    queryKey: ["equipment-models", "type", typeId],
    queryFn: () => EquipmentModelsService.getByType(typeId),
  });
}

// Equipment
export function useEquipmentList(params?: {
  skip?: number;
  take?: number;
  typeId?: number;
  modelId?: number;
  categoryId?: number;
  year?: number;
  status?: string;
  search?: string;
}) {
  return useQuery<PaginatedResponse<Equipment>, Error>({
    queryKey: [
      "equipment",
      params?.skip ?? 0,
      params?.take ?? 25,
      params?.typeId ?? "",
      params?.modelId ?? "",
      params?.categoryId ?? "",
      params?.year ?? "",
      params?.status ?? "",
      params?.search ?? "",
    ],
    queryFn: () => {
      return EquipmentsService.getAll(params);
    },
  });
}

export function useEquipmentDetail(id: number | undefined) {
  return useQuery({
    queryKey: ["equipment", id],
    queryFn: () => EquipmentsService.getById(id as number),
    enabled: typeof id === "number",
  });
}

export function useCreateEquipment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEquipmentDto) => EquipmentsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
    },
  });
}

export function useUpdateEquipment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEquipmentDto }) =>
      EquipmentsService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      qc.invalidateQueries({ queryKey: ["equipment", vars.id] });
    },
  });
}

export function useDeleteEquipment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EquipmentsService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      qc.invalidateQueries({ queryKey: ["equipment", id] });
    },
  });
}
