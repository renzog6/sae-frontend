// filepath: sae-frontend/lib/types/domain/history.ts

// Import enums from shared location
import {
  EmployeeIncidentType,
  HistoryType,
  SeverityLevel,
} from "../shared/enums";

// Re-export enums for backward compatibility
export {
  EmployeeIncidentType,
  HistoryType,
  SeverityLevel,
} from "../shared/enums";

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
