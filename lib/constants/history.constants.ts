import {
  EmployeeIncidentType,
  HistoryType,
  SeverityLevel,
} from "@/lib/types/enums";

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
