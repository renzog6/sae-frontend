// filepath: sae-frontend/lib/hooks/useEmployees.ts
import {
  EmployeesService,
  EmployeeCategoriesService,
  EmployeePositionsService,
} from "@/lib/api/employees";

import { createApiHooks } from "./createApiHooks";


// ==== EMPLOYEES ====
const employeesHooks = createApiHooks(EmployeesService, "employees");
export const useEmployees = () => employeesHooks;

// === EMPLOYEE CATEGORIES ===
const employeeCategoriesHooks = createApiHooks(
  EmployeeCategoriesService,
  "employeeCategories"
);
export const useEmployeeCategories = () => employeeCategoriesHooks;

// ==== EMPLOYEE POSITIONS ====
const employeePositionsHooks = createApiHooks(
  EmployeePositionsService,
  "employeePositions"
);
export const useEmployeePositions = () => employeePositionsHooks;



