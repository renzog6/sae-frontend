// filepath: sae-frontend/lib/hooks/useEmployees.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeesService } from "@/lib/api/employees";
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
    queryFn: () => EmployeesService.getEmployees(params),
  });
}

export function useEmployeeDetail(id: number | undefined) {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => EmployeesService.getEmployeeById(id as number),
    enabled: typeof id === "number",
  });
}

export function useCreateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["employees", "create"],
    mutationFn: (data: CreateEmployeeFormData) =>
      EmployeesService.createEmployee(data),
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
      EmployeesService.updateEmployee(vars.id, vars.data),
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
    mutationFn: (id: number) => EmployeesService.deleteEmployee(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["employees", id] });
    },
  });
}

// Categories
export function useEmployeeCategories() {
  return useQuery<EmployeeCategory[], Error>({
    queryKey: ["employee-categories"],
    queryFn: () => EmployeesService.getCategories(),
  });
}

export function useCreateEmployeeCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeeCategoryFormData) =>
      EmployeesService.createCategory(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-categories"] });
    },
  });
}

export function useUpdateEmployeeCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEmployeeCategoryFormData }) =>
      EmployeesService.updateCategory(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employee-categories"] });
      qc.invalidateQueries({ queryKey: ["employee-category", vars.id] });
    },
  });
}

export function useDeleteEmployeeCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EmployeesService.deleteCategory(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["employee-categories"] });
      qc.invalidateQueries({ queryKey: ["employee-category", id] });
    },
  });
}

// Positions
export function useEmployeePositions() {
  return useQuery<EmployeePosition[], Error>({
    queryKey: ["employee-positions"],
    queryFn: () => EmployeesService.getPositions(),
  });
}

export function useCreateEmployeePosition() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeePositionFormData) =>
      EmployeesService.createPosition(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-positions"] });
    },
  });
}

export function useUpdateEmployeePosition() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEmployeePositionFormData }) =>
      EmployeesService.updatePosition(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employee-positions"] });
      qc.invalidateQueries({ queryKey: ["employee-position", vars.id] });
    },
  });
}

export function useDeleteEmployeePosition() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EmployeesService.deletePosition(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["employee-positions"] });
      qc.invalidateQueries({ queryKey: ["employee-position", id] });
    },
  });
}

// filepath: sae-frontend/lib/hooks/useEmployees.ts
