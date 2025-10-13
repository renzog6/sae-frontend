// filepath: sae-frontend/types/history.ts

export enum EmployeeIncidentType {
  SICK_LEAVE = "SICK_LEAVE",
  DISCIPLINARY = "DISCIPLINARY",
  WARNING = "WARNING",
  ACCIDENT = "ACCIDENT",
  FAMILY_EMERGENCY = "FAMILY_EMERGENCY",
  UNJUSTIFIED_ABSENCE = "UNJUSTIFIED_ABSENCE",
  //VACATION_LEAVE = "VACATION_LEAVE", // Se usa solo en el Backend
}

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

export enum SeverityLevel {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  SUCCESS = "SUCCESS",
}

export interface EmployeeIncident {
  id: number;
  type: EmployeeIncidentType;
  description: string;
  startDate?: string;
  endDate?: string;
  doctorNote: boolean;
  paidLeave: boolean;
  createdAt: string;
  updatedAt: string;
  employeeId: number;
  employee?: {
    id: number;
    person?: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface HistoryLog {
  id: number;
  title: string;
  description?: string;
  type: HistoryType;
  severity: SeverityLevel;
  eventDate: string;
  createdAt: string;
  employeeId?: number;
  companyId?: number;
  equipmentId?: number;
  personId?: number;
  metadata?: string;
  employee?: {
    id: number;
    person?: {
      firstName: string;
      lastName: string;
    };
  };
  company?: {
    id: number;
    name: string;
  };
  equipment?: {
    id: number;
    name: string;
  };
  person?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface CreateEmployeeIncidentDto {
  type: EmployeeIncidentType;
  description: string;
  startDate?: string;
  endDate?: string;
  doctorNote?: boolean;
  paidLeave?: boolean;
  employeeId: number;
}

export interface UpdateEmployeeIncidentDto
  extends Partial<CreateEmployeeIncidentDto> {}

export interface EmployeeHistoryResponse {
  incidents: EmployeeIncident[];
  logs: HistoryLog[];
}
