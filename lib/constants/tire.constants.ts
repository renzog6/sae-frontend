import {
  TireStatus,
  TirePosition,
  TireEventType,
  AxleType,
  TireSide,
} from "@/lib/types/shared/enums";

/**
 * Mapping of tire statuses to their corresponding color classes.
 */

export const tireStatusColors: Record<string, string> = {
  IN_USE: "bg-green-500",
  IN_STOCK: "bg-blue-500",
  UNDER_REPAIR: "bg-yellow-500",
  RECAP: "bg-purple-500",
  DISCARDED: "bg-red-500",
  DEFAULT: "bg-gray-400",
};

// Tire status labels
export const tireStatusLabels: Record<TireStatus, string> = {
  [TireStatus.IN_STOCK]: "En stock",
  [TireStatus.IN_USE]: "En uso",
  [TireStatus.UNDER_REPAIR]: "En reparación",
  [TireStatus.RECAP]: "En recapado",
  [TireStatus.DISCARDED]: "Dado de baja",
} as const;

// Tire position labels
export const tirePositionLabels: Record<TirePosition, string> = {
  [TirePosition.DI]: "Delantero Izquierdo",
  [TirePosition.DD]: "Delantero Derecho",
  [TirePosition.E1I]: "Eje 1 Izquierdo",
  [TirePosition.E1D]: "Eje 1 Derecho",
  [TirePosition.E2I]: "Eje 2 Izquierdo",
  [TirePosition.E2D]: "Eje 2 Derecho",
  [TirePosition.E3I]: "Eje 3 Izquierdo",
  [TirePosition.E3D]: "Eje 3 Derecho",
  [TirePosition.E4I]: "Eje 4 Izquierdo",
  [TirePosition.E4D]: "Eje 4 Derecho",
  [TirePosition.E1II]: "Eje 1 Izquierdo Interno",
  [TirePosition.E1ID]: "Eje 1 Izquierdo Externo",
  [TirePosition.E1DI]: "Eje 1 Derecho Interno",
  [TirePosition.E1DD]: "Eje 1 Derecho Externo",
  [TirePosition.E2II]: "Eje 2 Izquierdo Interno",
  [TirePosition.E2ID]: "Eje 2 Izquierdo Externo",
  [TirePosition.E2DI]: "Eje 2 Derecho Interno",
  [TirePosition.E2DD]: "Eje 2 Derecho Externo",
  [TirePosition.E3II]: "Eje 3 Izquierdo Interno",
  [TirePosition.E3ID]: "Eje 3 Izquierdo Externo",
  [TirePosition.E3DI]: "Eje 3 Derecho Interno",
  [TirePosition.E3DD]: "Eje 3 Derecho Externo",
  [TirePosition.E4II]: "Eje 4 Izquierdo Interno",
  [TirePosition.E4ID]: "Eje 4 Izquierdo Externo",
  [TirePosition.E4DI]: "Eje 4 Derecho Interno",
  [TirePosition.E4DD]: "Eje 4 Derecho Externo",
  [TirePosition.SPARE]: "Rueda de auxilio",
  [TirePosition.UNKNOWN]: "Sin posición",
} as const;

// Tire event type labels
export const tireEventTypeLabels: Record<TireEventType, string> = {
  [TireEventType.ASSIGNMENT]: "Asignación",
  [TireEventType.UNASSIGNMENT]: "Desasignación",
  [TireEventType.ROTATION]: "Rotación",
  [TireEventType.INSPECTION]: "Inspección",
  [TireEventType.RECAP]: "Recapado",
  [TireEventType.DISCARD]: "Descartado",
  [TireEventType.OTHER]: "Otro",
} as const;

// Axle type labels
export const axleTypeLabels: Record<AxleType, string> = {
  [AxleType.FRONT]: "Delantero",
  [AxleType.DRIVE]: "Motriz",
  [AxleType.TRAILER]: "Remolque",
  [AxleType.TAG]: "Tag",
} as const;

// Tire side labels
export const tireSideLabels: Record<TireSide, string> = {
  [TireSide.LEFT]: "Izquierda",
  [TireSide.RIGHT]: "Derecha",
  [TireSide.INNER]: "Interna",
  [TireSide.OUTER]: "Externa",
} as const;
