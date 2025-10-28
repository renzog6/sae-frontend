// filepath: sae-frontend/types/enums.ts

// ===== Enums from schema.prisma =====

// User roles
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Contact types
export enum ContactType {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  WHATSAPP = "WHATSAPP",
  TELEGRAM = "TELEGRAM",
  INSTAGRAM = "INSTAGRAM",
  LINKEDIN = "LINKEDIN",
  OTHER = "OTHER",
}

// Employee statuses
export enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED",
}

// Gender
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

// Marital status
export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

// Person status
export enum PersonStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

// Vacation types
export enum VacationType {
  ASSIGNED = "ASSIGNED",
  TAKEN = "TAKEN",
}

// Equipment status
export enum EquipmentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  MAINTENANCE = "MAINTENANCE",
  RETIRED = "RETIRED",
}

// History types
export enum HistoryType {
  EMPLOYEE_ILLNESS = "EMPLOYEE_ILLNESS",
  EMPLOYEE_WARNING = "EMPLOYEE_WARNING",
  EMPLOYEE_ACHIEVEMENT = "EMPLOYEE_ACHIEVEMENT",
  EMPLOYEE_HIRE = "EMPLOYEE_HIRE",
  VACATION_ASSIGNED = "VACATION_ASSIGNED",
  VACATION_TAKEN = "VACATION_TAKEN",
  COMPANY_REMINDER = "COMPANY_REMINDER",
  COMPANY_EVENT = "COMPANY_EVENT",
  EQUIPMENT_MAINTENANCE = "EQUIPMENT_MAINTENANCE",
  EQUIPMENT_ACCIDENT = "EQUIPMENT_ACCIDENT",
  EQUIPMENT_REPAIR = "EQUIPMENT_REPAIR",
  PERSONAL_EVENT = "PERSONAL_EVENT",
  GENERAL_NOTE = "GENERAL_NOTE",
}

// Severity levels
export enum SeverityLevel {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  SUCCESS = "SUCCESS",
}

// Employee incident types
export enum EmployeeIncidentType {
  SICK_LEAVE = "SICK_LEAVE",
  DISCIPLINARY = "DISCIPLINARY",
  WARNING = "WARNING",
  ACCIDENT = "ACCIDENT",
  FAMILY_EMERGENCY = "FAMILY_EMERGENCY",
  UNJUSTIFIED_ABSENCE = "UNJUSTIFIED_ABSENCE",
  VACATION_LEAVE = "VACATION_LEAVE",
}

// Maintenance types
export enum MaintenanceType {
  PREVENTIVE = "PREVENTIVE",
  CORRECTIVE = "CORRECTIVE",
  ACCIDENT_REPAIR = "ACCIDENT_REPAIR",
  ROUTINE_CHECK = "ROUTINE_CHECK",
}

// Inspection types (placeholder - not defined in schema yet)
export enum InspectionType {
  GENERAL = "GENERAL",
  SAFETY = "SAFETY",
  MAINTENANCE = "MAINTENANCE",
  COMPLIANCE = "COMPLIANCE",
}

// Tire statuses
export enum TireStatus {
  IN_STOCK = "IN_STOCK",
  IN_USE = "IN_USE",
  UNDER_REPAIR = "UNDER_REPAIR",
  RECAP = "RECAP",
  DISCARDED = "DISCARDED",
}

// Tire positions
export enum TirePosition {
  DI = "DI", // Delantero Izquierdo
  DD = "DD", // Delantero Derecho
  E1I = "E1I", // Eje 1 Izquierdo
  E1D = "E1D", // Eje 1 Derecho
  E2I = "E2I", // Eje 2 Izquierdo
  E2D = "E2D", // Eje 2 Derecho
  E3I = "E3I", // Eje 3 Izquierdo
  E3D = "E3D", // Eje 3 Derecho
  E4I = "E4I", // Eje 4 Izquierdo
  E4D = "E4D", // Eje 4 Derecho
  E1II = "E1II", // Eje 1 Izquierdo Interno
  E1ID = "E1ID", // Eje 1 Izquierdo Externo
  E1DI = "E1DI", // Eje 1 Derecho Interno
  E1DD = "E1DD", // Eje 1 Derecho Externo
  E2II = "E2II", // Eje 2 Izquierdo Interno
  E2ID = "E2ID", // Eje 2 Izquierdo Externo
  E2DI = "E2DI", // Eje 2 Derecho Interno
  E2DD = "E2DD", // Eje 2 Derecho Externo
  E3II = "E3II", // Eje 3 Izquierdo Interno
  E3ID = "E3ID", // Eje 3 Izquierdo Externo
  E3DI = "E3DI", // Eje 3 Derecho Interno
  E3DD = "E3DD", // Eje 3 Derecho Externo
  E4II = "E4II", // Eje 4 Izquierdo Interno
  E4ID = "E4ID", // Eje 4 Izquierdo Externo
  E4DI = "E4DI", // Eje 4 Derecho Interno
  E4DD = "E4DD", // Eje 4 Derecho Externo
  SPARE = "SPARE", // Rueda de auxilio
  UNKNOWN = "UNKNOWN", // Sin posición definida
}

// Tire event types
export enum TireEventType {
  ASSIGNMENT = "ASSIGNMENT",
  UNASSIGNMENT = "UNASSIGNMENT",
  ROTATION = "ROTATION",
  INSPECTION = "INSPECTION",
  RECAP = "RECAP",
  DISCARD = "DISCARD",
  OTHER = "OTHER",
}

// Axle types
export enum AxleType {
  FRONT = "FRONT",
  DRIVE = "DRIVE",
  TRAILER = "TRAILER",
  TAG = "TAG",
}

// Tire side
export enum TireSide {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  INNER = "INNER",
  OUTER = "OUTER",
}
