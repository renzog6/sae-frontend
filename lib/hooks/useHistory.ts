// filepath: sae-frontend/lib/hooks/useHistory.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HistoryService } from "@/lib/api/history";
import {
  EmployeeHistoryResponse,
  CreateEmployeeIncidentDto,
  UpdateEmployeeIncidentDto,
} from "@/lib/types/history";

export function useEmployeeHistory(
  employeeId: number | undefined,
  accessToken: string
) {
  return useQuery<EmployeeHistoryResponse, Error>({
    queryKey: ["employee-history", employeeId],
    queryFn: () =>
      HistoryService.getEmployeeHistory(employeeId as number, accessToken),
    enabled: !!accessToken && typeof employeeId === "number",
  });
}

// Employee Incident CRUD hooks
export function useCreateEmployeeIncident(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEmployeeIncidentDto) =>
      HistoryService.createEmployeeIncident(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-history"] });
    },
  });
}

export function useUpdateEmployeeIncident(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateEmployeeIncidentDto;
    }) => HistoryService.updateEmployeeIncident(id, data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-history"] });
    },
  });
}

export function useDeleteEmployeeIncident(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      HistoryService.deleteEmployeeIncident(id, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-history"] });
    },
  });
}
