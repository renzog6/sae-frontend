// filepath: sae-frontend/lib/application/employee-application.hooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeeApplicationService, CreateEmployeeApplicationData, UpdateEmployeeApplicationData } from "./employee-application.service";

export function useCreateEmployeeApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeApplicationData) =>
      EmployeeApplicationService.createEmployee(data),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["employees", "list"] });
      queryClient.invalidateQueries({ queryKey: ["persons", "list"] });
    },
  });
}

export function useUpdateEmployeeApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmployeeApplicationData }) =>
      EmployeeApplicationService.updateEmployee(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["employees", "detail", id] });
      queryClient.invalidateQueries({ queryKey: ["employees", "list"] });
      queryClient.invalidateQueries({ queryKey: ["persons", "list"] });
    },
  });
}

export function useGetEmployeeApplication(id: number) {
  return EmployeeApplicationService.getEmployeeById(id);
}