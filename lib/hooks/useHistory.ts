// filepath: sae-frontend/lib/hooks/useHistory.ts
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { useQuery } from "@tanstack/react-query";
import { HistoryService, EmployeeIncidentsService } from "@/lib/api/history";

// ===== EMPLOYEE HISTORY =====
export const useEmployeeHistory = (employeeId: number) =>
  useQuery({
    queryKey: ["history", employeeId],
    queryFn: () => HistoryService.getEmployeeHistory(employeeId),
    enabled: !!employeeId,
  });

// ===== EMPLOYEE INCIDENTS =====
export const useEmployeeIncidents = () =>
  createApiHooks(EmployeeIncidentsService, "employeeIncidents");

export const useCreateEmployeeIncident = () => {
  const { useCreate } = useEmployeeIncidents();
  return useCreate();
};

export const useUpdateEmployeeIncident = () => {
  const { useUpdate } = useEmployeeIncidents();
  return useUpdate();
};

export const useDeleteEmployeeIncident = () => {
  const { useDelete } = useEmployeeIncidents();
  return useDelete();
};
