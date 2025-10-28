// filepath: sae-frontend/lib/constants.ts

import {
  Gender,
  MaritalStatus,
  EmployeeStatus,
  PersonStatus,
  VacationType,
  Role,
  ContactType,
  MaintenanceType,
  InspectionType,
  TireStatus,
  TirePosition,
  TireEventType,
  AxleType,
  TireSide,
} from "@/lib/types/enums";
import {
  EmployeeIncidentType,
  HistoryType,
  SeverityLevel,
} from "@/lib/types/enums";
import { EquipmentStatus } from "@/lib/types/enums";

export const genderLabels: Record<Gender, string> = {
  [Gender.MALE]: "Masculino",
  [Gender.FEMALE]: "Femenino",
  [Gender.OTHER]: "Otro",
} as const;

export const maritalLabels: Record<MaritalStatus, string> = {
  [MaritalStatus.SINGLE]: "Soltero/a",
  [MaritalStatus.MARRIED]: "Casado/a",
  [MaritalStatus.DIVORCED]: "Divorciado/a",
  [MaritalStatus.WIDOWED]: "Viudo/a",
} as const;

export const employeeStatusLabels: Record<EmployeeStatus, string> = {
  [EmployeeStatus.ACTIVE]: "Activo",
  [EmployeeStatus.SUSPENDED]: "Suspendido",
  [EmployeeStatus.TERMINATED]: "Terminado",
} as const;

export const personStatusLabels: Record<PersonStatus, string> = {
  [PersonStatus.ACTIVE]: "Activo",
  [PersonStatus.INACTIVE]: "Inactivo",
} as const;

export const vacationTypeLabels: Record<VacationType, string> = {
  [VacationType.ASSIGNED]: "Asignadas",
  [VacationType.TAKEN]: "Tomadas",
} as const;

export const employeeIncidentTypeLabels: Record<EmployeeIncidentType, string> =
  {
    [EmployeeIncidentType.SICK_LEAVE]: "Licencia por enfermedad",
    [EmployeeIncidentType.DISCIPLINARY]: "Medida disciplinaria",
    [EmployeeIncidentType.WARNING]: "Llamado de atención",
    [EmployeeIncidentType.ACCIDENT]: "Accidente laboral",
    [EmployeeIncidentType.FAMILY_EMERGENCY]: "Emergencia familiar",
    [EmployeeIncidentType.UNJUSTIFIED_ABSENCE]: "Ausencia sin justificar",
    [EmployeeIncidentType.VACATION_LEAVE]: "Licencia por vacaciones",
  } as const;

export const historyTypeLabels: Record<HistoryType, string> = {
  [HistoryType.EMPLOYEE_ILLNESS]: "Enfermedad empleado",
  [HistoryType.EMPLOYEE_WARNING]: "Llamado de atención",
  [HistoryType.EMPLOYEE_ACHIEVEMENT]: "Logro/reconocimiento",
  [HistoryType.EMPLOYEE_HIRE]: "Contratación de empleado",
  [HistoryType.VACATION_ASSIGNED]: "Vacaciones asignadas",
  [HistoryType.VACATION_TAKEN]: "Vacaciones tomadas",
  [HistoryType.COMPANY_REMINDER]: "Recordatorio empresa",
  [HistoryType.COMPANY_EVENT]: "Evento corporativo",
  [HistoryType.EQUIPMENT_MAINTENANCE]: "Mantenimiento equipo",
  [HistoryType.EQUIPMENT_ACCIDENT]: "Accidente equipo",
  [HistoryType.EQUIPMENT_REPAIR]: "Reparación",
  [HistoryType.PERSONAL_EVENT]: "Evento personal",
  [HistoryType.GENERAL_NOTE]: "Nota general",
} as const;

export const severityLevelLabels: Record<SeverityLevel, string> = {
  [SeverityLevel.INFO]: "Informativo",
  [SeverityLevel.WARNING]: "Advertencia",
  [SeverityLevel.CRITICAL]: "Crítico",
  [SeverityLevel.SUCCESS]: "Exitoso",
} as const;

export const equipmentStatusLabels: Record<EquipmentStatus, string> = {
  [EquipmentStatus.ACTIVE]: "Activo",
  [EquipmentStatus.INACTIVE]: "Inactivo",
  [EquipmentStatus.MAINTENANCE]: "En mantenimiento",
  [EquipmentStatus.RETIRED]: "Retirado",
} as const;

export const roleLabels: Record<Role, string> = {
  [Role.USER]: "Usuario",
  [Role.ADMIN]: "Administrador",
} as const;

export const contactTypeLabels: Record<ContactType, string> = {
  [ContactType.EMAIL]: "Email",
  [ContactType.PHONE]: "Teléfono",
  [ContactType.WHATSAPP]: "WhatsApp",
  [ContactType.TELEGRAM]: "Telegram",
  [ContactType.INSTAGRAM]: "Instagram",
  [ContactType.LINKEDIN]: "LinkedIn",
  [ContactType.OTHER]: "Otro",
} as const;

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
