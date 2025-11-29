// filepath: sae-frontend/lib/api/history/employee-incidents.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import {
  EmployeeIncident,
  CreateEmployeeIncidentDto,
  UpdateEmployeeIncidentDto,
} from "@/lib/types/domain/history";

class EmployeeIncidentsServiceClass extends BaseApiService<
  EmployeeIncident,
  CreateEmployeeIncidentDto,
  UpdateEmployeeIncidentDto
> {
  protected basePath = "/employee-incidents";
}

export const EmployeeIncidentsService = new EmployeeIncidentsServiceClass();
