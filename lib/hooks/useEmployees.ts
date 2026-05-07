// filepath: sae-frontend/lib/hooks/useEmployees.ts
import { createApiHooks } from "./createApiHooks";
import { invalidateEmployeeRelatedQueries } from "@/lib/utils/cache-invalidation";
import {
  EmployeesService,
  EmployeeCategoriesService,
  EmployeePositionsService,
} from "@/lib/api/employees";

// ==== EMPLOYEES ====
const employeesHooks = createApiHooks(EmployeesService, "employees", {
  onCreateSuccess: (qc) => invalidateEmployeeRelatedQueries(qc),
  onUpdateSuccess: (qc, id) => invalidateEmployeeRelatedQueries(qc, id),
  onDeleteSuccess: (qc) => invalidateEmployeeRelatedQueries(qc),
});
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



