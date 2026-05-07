import { PersonsService } from "@/lib/api/persons/persons.service";
import { EmployeesService } from "@/lib/api/employees/employees.service";
import { CreatePersonFormData, UpdatePersonFormData } from "@/lib/validations/person";
import { CreateEmployeeFormData, UpdateEmployeeFormData } from "@/lib/validations/employee";

// Application layer types
export type CreateEmployeeApplicationData = {
  personData: CreatePersonFormData;
  employeeData: Omit<CreateEmployeeFormData, 'personId'>;
};

export type UpdateEmployeeApplicationData = {
  personData: UpdatePersonFormData;
  employeeData: UpdateEmployeeFormData;
};

export class EmployeeApplicationService {
  /**
   * Creates a new employee by orchestrating person and employee creation
   * @param data - Application data containing person and employee data
   * @returns Promise with created employee data
   */
  static async createEmployee(data: CreateEmployeeApplicationData) {
    // First create the person
    const createdPerson = await PersonsService.create(data.personData);

    // Then create the employee linked to the person
    const employeeWithPersonId = {
      ...data.employeeData,
      personId: createdPerson.id,
    };

    const createdEmployee = await EmployeesService.create(employeeWithPersonId);

    return {
      person: createdPerson,
      employee: createdEmployee,
    };
  }

  /**
   * Updates an employee by orchestrating person and employee updates
   * @param employeeId - ID of the employee to update
   * @param data - Application data containing person and employee data
   * @returns Promise with updated employee data
   */
  static async updateEmployee(
    employeeId: number,
    data: UpdateEmployeeApplicationData
  ) {
    // Update the employee first
    const updatedEmployee = await EmployeesService.update(employeeId, data.employeeData);

    // Then update the associated person
    const updatedPerson = await PersonsService.update(updatedEmployee.personId, data.personData);

    return {
      person: updatedPerson,
      employee: updatedEmployee,
    };
  }

  /**
   * Gets complete employee data including person information
   * @param employeeId - ID of the employee
   * @returns Promise with employee and person data
   */
  static async getEmployeeById(employeeId: number) {
    const employee = await EmployeesService.getById(employeeId);
    const person = await PersonsService.getById(employee.personId);

    return {
      employee,
      person,
    };
  }
}