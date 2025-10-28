// filepath: sae-frontend/lib/hooks/useEquipment.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EquipmentService } from "@/lib/api/equipment";
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
    queryFn: () => EquipmentService.getEquipmentAxles(params),
    enabled: !!params?.equipmentId,
  });
}

export function useEquipmentAxleDetail(
  id: number | undefined,
  accessToken: string
) {
  return useQuery({
    queryKey: ["equipment-axles", id],
    queryFn: () =>
      EquipmentService.getEquipmentAxleById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateEquipmentAxle(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      equipmentId: number;
      order: number;
      axleType: string;
      wheelCount: number;
      description?: string;
    }) => EquipmentService.createEquipmentAxle(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment-axles"] });
    },
  });
}

export function useUpdateEquipmentAxle(accessToken: string) {
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
    }) => EquipmentService.updateEquipmentAxle(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment-axles"] });
      qc.invalidateQueries({ queryKey: ["equipment-axles", vars.id] });
    },
  });
}

export function useDeleteEquipmentAxle(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      EquipmentService.deleteEquipmentAxle(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment-axles"] });
      qc.invalidateQueries({ queryKey: ["equipment-axles", id] });
    },
  });
}

// Categories
export function useEquipmentCategories() {
  return useQuery<EquipmentCategory[], Error>({
    queryKey: ["equipment-categories"],
    queryFn: () => EquipmentService.getCategories(),
  });
}

export function useCreateEquipmentCategory(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEquipmentCategoryDto) =>
      EquipmentService.createCategory(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment-categories"] });
    },
  });
}

export function useUpdateEquipmentCategory(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEquipmentCategoryDto }) =>
      EquipmentService.updateCategory(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment-categories"] });
      qc.invalidateQueries({ queryKey: ["equipment-category", vars.id] });
    },
  });
}

export function useDeleteEquipmentCategory(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      EquipmentService.deleteCategory(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment-categories"] });
      qc.invalidateQueries({ queryKey: ["equipment-category", id] });
    },
  });
}

// Types
export function useEquipmentTypes(params?: { categoryId?: number }) {
  return useQuery<EquipmentType[], Error>({
    queryKey: ["equipment-types", params?.categoryId ?? ""],
    queryFn: () => EquipmentService.getTypes(params),
  });
}

export function useEquipmentTypeDetail(
  id: number | undefined,
  accessToken: string
) {
  return useQuery({
    queryKey: ["equipment-types", id],
    queryFn: () => EquipmentService.getTypeById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateEquipmentType(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEquipmentTypeDto) =>
      EquipmentService.createType(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment-types"] });
    },
  });
}

export function useUpdateEquipmentType(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEquipmentTypeDto }) =>
      EquipmentService.updateType(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment-types"] });
      qc.invalidateQueries({ queryKey: ["equipment-types", vars.id] });
    },
  });
}

export function useDeleteEquipmentType(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EquipmentService.deleteType(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment-types"] });
      qc.invalidateQueries({ queryKey: ["equipment-types", id] });
    },
  });
}

export function useEquipmentTypesByCategory(
  categoryId: number,
  accessToken: string
) {
  return useQuery<EquipmentType[], Error>({
    queryKey: ["equipment-types", "category", categoryId],
    queryFn: () => EquipmentService.getTypesByCategory(categoryId, accessToken),
    enabled: !!accessToken,
  });
}

// Models
export function useEquipmentModels(params?: { typeId?: number }) {
  return useQuery<EquipmentModel[], Error>({
    queryKey: ["equipment-models", params?.typeId ?? ""],
    queryFn: () => EquipmentService.getModels(params),
  });
}

export function useEquipmentModelDetail(
  id: number | undefined,
  accessToken: string
) {
  return useQuery({
    queryKey: ["equipment-models", id],
    queryFn: () => EquipmentService.getModelById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateEquipmentModel(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEquipmentModelDto) =>
      EquipmentService.createModel(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment-models"] });
    },
  });
}

export function useUpdateEquipmentModel(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEquipmentModelDto }) =>
      EquipmentService.updateModel(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment-models"] });
      qc.invalidateQueries({ queryKey: ["equipment-models", vars.id] });
    },
  });
}

export function useDeleteEquipmentModel(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EquipmentService.deleteModel(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment-models"] });
      qc.invalidateQueries({ queryKey: ["equipment-models", id] });
    },
  });
}

export function useEquipmentModelsByType(typeId: number, accessToken: string) {
  return useQuery<EquipmentModel[], Error>({
    queryKey: ["equipment-models", "type", typeId],
    queryFn: () => EquipmentService.getModelsByType(typeId, accessToken),
    enabled: !!accessToken,
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
      return EquipmentService.getEquipment(params);
    },
  });
}

export function useEquipmentDetail(
  id: number | undefined,
  accessToken: string
) {
  return useQuery({
    queryKey: ["equipment", id],
    queryFn: () => EquipmentService.getEquipmentById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateEquipment(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEquipmentDto) =>
      EquipmentService.createEquipment(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
    },
  });
}

export function useUpdateEquipment(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEquipmentDto }) =>
      EquipmentService.updateEquipment(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      qc.invalidateQueries({ queryKey: ["equipment", vars.id] });
    },
  });
}

export function useDeleteEquipment(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      EquipmentService.deleteEquipment(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      qc.invalidateQueries({ queryKey: ["equipment", id] });
    },
  });
}
