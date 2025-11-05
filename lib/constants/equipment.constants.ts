import { EquipmentStatus } from "@/lib/types/enums";

export const equipmentStatusLabels: Record<EquipmentStatus, string> = {
  [EquipmentStatus.ACTIVE]: "Activo",
  [EquipmentStatus.INACTIVE]: "Inactivo",
  [EquipmentStatus.MAINTENANCE]: "En mantenimiento",
  [EquipmentStatus.RETIRED]: "Retirado",
} as const;
