// filepath: sae-frontend/lib/utils/employee.ts

import { Employee, EmployeeVacation, VacationType } from "@/lib/types/employee";

/**
 * Calculates the total available vacation days for an employee.
 * ASSIGNED days are added, TAKEN days are subtracted.
 */
export function sumVacationDays(vacations: EmployeeVacation[] = []): number {
  return vacations.reduce((acc, v) => {
    const d = Number(v?.days ?? 0) || 0;
    if (v?.type === VacationType.ASSIGNED) return acc + d;
    if (v?.type === VacationType.TAKEN) return acc - d;
    return acc;
  }, 0);
}

/**
 * Calculates the total available vacation days for an employee from the Employee object.
 */
export function sumEmployeeVacationDays(employee: Employee): number {
  return sumVacationDays(employee.vacations || []);
}
