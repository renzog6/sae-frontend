//filepath: sae-frontend/lib/api/employees/employee-vacations.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import {
  EmployeeVacation,
  CreateEmployeeVacationDto,
  UpdateEmployeeVacationDto,
} from "@/lib/types/domain/employee";

class EmployeeVacationsServiceClass extends BaseApiService<
  EmployeeVacation,
  CreateEmployeeVacationDto,
  UpdateEmployeeVacationDto
> {
  protected basePath = "/employee-vacations";

  /**
   * Notificacion de vacaciones de un emplpeado
   * Descarga un PDF asociado a un registro de vacaciones
   */
  async downloadPdf(id: number): Promise<void> {
    return this.openInNewTab(`${id}/pdf`);
  }
}

export const EmployeeVacationsService = new EmployeeVacationsServiceClass();
