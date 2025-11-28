//filepath: sae-frontend/lib/api/employees/employee-categories.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import {
  EmployeeCategory,
  CreateEmployeeCategoryDto,
  UpdateEmployeeCategoryDto,
} from "@/lib/types/domain/employee";

class EmployeeCategoriesServiceClass extends BaseApiService<
  EmployeeCategory,
  CreateEmployeeCategoryDto,
  UpdateEmployeeCategoryDto
> {
  protected basePath = "/employee-categories";
}

export const EmployeeCategoriesService = new EmployeeCategoriesServiceClass();
