// filepath: sae-frontend/lib/hooks/useEmployees.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  EmployeesService,
  EmployeeCategoriesService,
  EmployeePositionsService,
} from "@/lib/api/employees";
import { EmployeeCategory, EmployeePosition } from "@/lib/types/employee";

import {
  CreateEmployeeFormData,
  UpdateEmployeeFormData,
  EmployeeCategoryFormData,
  UpdateEmployeeCategoryFormData,
  EmployeePositionFormData,
  UpdateEmployeePositionFormData,
} from "@/lib/validations/employee";

// Hook to fetch employees list
export function useEmployeesList(params?: {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: [
      "employees",
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.q ?? "",
      params?.status ?? "",
    ],
    queryFn: () => EmployeesService.getAll(params),
  });
}

export function useEmployeeDetail(id: number | undefined) {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => EmployeesService.getById(id as number),
    enabled: typeof id === "number",
  });
}

export function useCreateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["employees", "create"],
    mutationFn: (data: CreateEmployeeFormData) => EmployeesService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}

export function useUpdateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["employees", "update"],
    mutationFn: (vars: { id: number; data: UpdateEmployeeFormData }) =>
      EmployeesService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["employees", vars.id] });
    },
  });
}

export function useDeleteEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["employees", "delete"],
    mutationFn: (id: number) => EmployeesService.delete(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["employees", id] });
    },
  });
}

// Categories
export function useEmployeeCategories() {
  return useQuery({
    queryKey: ["employee-categories"],
    queryFn: () => EmployeeCategoriesService.getAll(),
  });
}

export function useCreateEmployeeCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeeCategoryFormData) =>
      EmployeeCategoriesService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-categories"] });
    },
  });
}

export function useUpdateEmployeeCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEmployeeCategoryFormData }) =>
      EmployeeCategoriesService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employee-categories"] });
      qc.invalidateQueries({ queryKey: ["employee-category", vars.id] });
    },
  });
}

export function useDeleteEmployeeCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EmployeeCategoriesService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["employee-categories"] });
      qc.invalidateQueries({ queryKey: ["employee-category", id] });
    },
  });
}

// Positions
export function useEmployeePositions() {
  return useQuery({
    queryKey: ["employee-positions"],
    queryFn: () => EmployeePositionsService.getAll(),
  });
}

export function useCreateEmployeePosition() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeePositionFormData) =>
      EmployeePositionsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-positions"] });
    },
  });
}

export function useUpdateEmployeePosition() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEmployeePositionFormData }) =>
      EmployeePositionsService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employee-positions"] });
      qc.invalidateQueries({ queryKey: ["employee-position", vars.id] });
    },
  });
}

export function useDeleteEmployeePosition() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EmployeePositionsService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["employee-positions"] });
      qc.invalidateQueries({ queryKey: ["employee-position", id] });
    },
  });
}

// filepath: sae-frontend/lib/hooks/useEmployees.ts
