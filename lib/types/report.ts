// filepath: sae-frontend/lib/types/report.ts

export enum ReportType {
  EMPLOYEE_LIST = "employee_list",
  EMPLOYEE_VACATION_BALANCE = "employee_vacation_balance",
  EMPLOYEE_VACATION_HISTORY = "employee_vacation_history",
  EQUIPMENT_LIST = "equipment_list",
  TIRE_LIST = "tire_list",
}

export enum ReportFormat {
  XLSX = "xlsx",
  PDF = "pdf",
  CSV = "csv",
  DOCX = "docx",
}

/*
*Exmple:{
  "reportType": "employee_list",
  "format": "xlsx",
  "filter": {
    "status": "active"    
  },
  "title": "Empleados"
}
*/
export interface GenerateReportDto {
  reportType: ReportType;
  format: ReportFormat;
  filter?: Record<string, any> | string;
  title?: string;
}
