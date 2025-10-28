// filepath: sae-frontend/lib/hooks/useHistory.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HistoryService } from "@/lib/api/history";
import {
  EmployeeHistoryResponse,
  CreateEmployeeIncidentDto,
  UpdateEmployeeIncidentDto,
} from "@/lib/types/history";

export function useEmployeeHistory(employeeId: number | undefined) {
  return useQuery<EmployeeHistoryResponse, Error>({
    queryKey: ["employee-history", employeeId],
    queryFn: () => HistoryService.getEmployeeHistory(employeeId as number),
    enabled: typeof employeeId === "number",
  });
}

// Employee Incident CRUD hooks
export function useCreateEmployeeIncident() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEmployeeIncidentDto) =>
      HistoryService.createEmployeeIncident(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-history"] });
    },
  });
}

export function useUpdateEmployeeIncident() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateEmployeeIncidentDto;
    }) => HistoryService.updateEmployeeIncident(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-history"] });
    },
  });
}

export function useDeleteEmployeeIncident() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => HistoryService.deleteEmployeeIncident(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-history"] });
    },
  });
}
