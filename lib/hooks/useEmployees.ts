// filepath: sae-frontend/lib/hooks/useEmployees.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApiHooks } from "./createApiHooks";
import { invalidateEmployeeRelatedQueries } from "@/lib/utils/cache-invalidation";
import {
  EmployeesService,
  EmployeesApplicationService,
  CreateEmployeeApplicationData,
  UpdateEmployeeApplicationData,
  EmployeeCategoriesService,
  EmployeePositionsService,
} from "@/lib/api/employees";

// ==== EMPLOYEES ====
const employeesHooks = createApiHooks(EmployeesService, "employees", {
  onCreateSuccess: (qc) => invalidateEmployeeRelatedQueries(qc),
  onUpdateSuccess: (qc, id) => invalidateEmployeeRelatedQueries(qc, id),
  onDeleteSuccess: (qc) => invalidateEmployeeRelatedQueries(qc),
});
export const useEmployees = () => employeesHooks;

// === EMPLOYEE CATEGORIES ===
const employeeCategoriesHooks = createApiHooks(
  EmployeeCategoriesService,
  "employeeCategories"
);
export const useEmployeeCategories = () => employeeCategoriesHooks;

// ==== EMPLOYEE POSITIONS ====
const employeePositionsHooks = createApiHooks(
  EmployeePositionsService,
  "employeePositions"
);
export const useEmployeePositions = () => employeePositionsHooks;

// ==== APPLICATION-LEVEL HOOKS ====
export function useCreateEmployeeApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeApplicationData) =>
      EmployeesApplicationService.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
  });
}

export function useUpdateEmployeeApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateEmployeeApplicationData;
    }) => EmployeesApplicationService.updateEmployee(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
    },
  });
}



