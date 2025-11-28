//filepath: sae-frontend/lib/api/employees/employee-positions.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import {
  EmployeePosition,
  CreateEmployeePositionDto,
  UpdateEmployeePositionDto,
} from "@/lib/types/domain/employee";

class EmployeePositionsServiceClass extends BaseApiService<
  EmployeePosition,
  CreateEmployeePositionDto,
  UpdateEmployeePositionDto
> {
  protected basePath = "/employee-positions";
}

export const EmployeePositionsService = new EmployeePositionsServiceClass();
