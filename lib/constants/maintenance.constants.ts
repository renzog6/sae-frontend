import { MaintenanceType, InspectionType } from "@/lib/types/enums";

export const maintenanceTypeLabels: Record<MaintenanceType, string> = {
  [MaintenanceType.PREVENTIVE]: "Preventivo",
  [MaintenanceType.CORRECTIVE]: "Correctivo",
  [MaintenanceType.ACCIDENT_REPAIR]: "Reparación por accidente",
  [MaintenanceType.ROUTINE_CHECK]: "Revisión rutinaria",
} as const;

export const inspectionTypeLabels: Record<InspectionType, string> = {
  [InspectionType.GENERAL]: "General",
  [InspectionType.SAFETY]: "Seguridad",
  [InspectionType.MAINTENANCE]: "Mantenimiento",
  [InspectionType.COMPLIANCE]: "Cumplimiento",
} as const;
