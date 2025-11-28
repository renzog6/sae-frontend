// filepath: sae-frontend/lib/api/employees/employees.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "@/lib/types/domain/employee";

class EmployeesServiceClass extends BaseApiService<
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto
> {
  protected basePath = "/employees";
}

export const EmployeesService = new EmployeesServiceClass();
