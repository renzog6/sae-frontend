// filepath: sae-frontend/lib/api/employees/employees.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "@/lib/types/domain/employee";
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import { Gender, MaritalStatus } from "@/lib/types/shared/enums";

const basePath_persons = "/persons";
const basePath_employees = "/employees";

class EmployeesServiceClass extends BaseApiService<
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto
> {
  protected basePath = "/employees";
}

export const EmployeesService = new EmployeesServiceClass();

// Export hooks for consistent usage
export const {
  useGetAll: useEmployees,
  useGetById: useEmployeeById,
  useCreate: useCreateEmployee,
  useUpdate: useUpdateEmployee,
  useDelete: useDeleteEmployee,
} = createApiHooks(EmployeesService, "employees");

// ===== Application-level methods =====

export type CreateEmployeeApplicationData = {
  personData: {
    firstName: string;
    lastName: string;
    birthDate?: string | null;
    dni?: string | null;
    cuil?: string | null;
    gender?: Gender | null;
    maritalStatus?: MaritalStatus | null;
    information?: string | null;
  };
  employeeData: Omit<CreateEmployeeDto, "personId">;
};

export type UpdateEmployeeApplicationData = {
  personData: {
    firstName?: string | null;
    lastName?: string | null;
    birthDate?: string | null;
    dni?: string | null;
    cuil?: string | null;
    gender?: Gender | null;
    maritalStatus?: MaritalStatus | null;
    information?: string | null;
  };
  employeeData: UpdateEmployeeDto;
};

export type EmployeeApplicationResult = {
  person: any;
  employee: Employee;
};

export const EmployeesApplicationService = {
  async createEmployee(
    data: CreateEmployeeApplicationData
  ): Promise<EmployeeApplicationResult> {
    let createdPersonId: number | null = null;

    try {
      // Step 1: Create person
      const personRes = await ApiClient.post<ApiResponse<any>>(
        basePath_persons,
        data.personData
      );

      if (!personRes.data?.id) {
        throw new Error("Failed to create person");
      }

      createdPersonId = personRes.data.id;
      const personId = createdPersonId;

      // Step 2: Create employee with personId
      const employeeRes = await ApiClient.post<ApiResponse<Employee>>(
        basePath_employees,
        { ...data.employeeData, personId }
      );

      return {
        person: personRes.data,
        employee: employeeRes.data,
      };
    } catch (error) {
      // Rollback: Delete person if employee creation failed
      if (createdPersonId) {
        try {
          await ApiClient.delete(`${basePath_persons}/${createdPersonId}`);
          console.warn(
            `[EmployeesApplicationService] Rolled back: deleted person ${createdPersonId}`
          );
        } catch (rollbackError) {
          console.error(
            `[EmployeesApplicationService] Rollback failed:`,
            rollbackError
          );
        }
      }
      throw error;
    }
  },

  async updateEmployee(
    employeeId: number,
    data: UpdateEmployeeApplicationData
  ): Promise<EmployeeApplicationResult> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        // Step 1: Get current employee to find personId
        const employeeRes = await ApiClient.get<ApiResponse<Employee>>(
          `${basePath_employees}/${employeeId}`
        );

        const employee = employeeRes.data;
        const personId = employee?.personId;

        if (!personId) {
          throw new Error("Employee not found or missing personId");
        }

        // Step 2: Update employee
        const updatedEmployeeRes = await ApiClient.put<ApiResponse<Employee>>(
          `${basePath_employees}/${employeeId}`,
          data.employeeData
        );

        // Step 3: Update person
        const updatedPersonRes = await ApiClient.put<ApiResponse<any>>(
          `${basePath_persons}/${personId}`,
          data.personData
        );

        return {
          person: updatedPersonRes.data,
          employee: updatedEmployeeRes.data,
        };
      },
      "EmployeesApplicationService",
      "updateEmployee",
      { employeeId, data }
    );
  },

  async getEmployeeById(employeeId: number): Promise<EmployeeApplicationResult> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const employeeRes = await ApiClient.get<ApiResponse<Employee>>(
          `${basePath_employees}/${employeeId}`
        );

        const employee = employeeRes.data;
        const personId = employee?.personId;

        if (!personId) {
          throw new Error("Employee not found or missing personId");
        }

        const personRes = await ApiClient.get<ApiResponse<any>>(
          `${basePath_persons}/${personId}`
        );

        return {
          person: personRes.data,
          employee: employee,
        };
      },
      "EmployeesApplicationService",
      "getEmployeeById",
      { employeeId }
    );
  },
};
