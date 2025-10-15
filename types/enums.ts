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
