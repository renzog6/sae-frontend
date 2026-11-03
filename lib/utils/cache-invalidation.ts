import { QueryClient } from "@tanstack/react-query";

/**
 * Cache invalidation helpers for consistent React Query cache management
 * These helpers provide standardized patterns for invalidating queries after mutations
 */

// Employee-related cache invalidation
export function invalidateEmployeeQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ["employees"] });
}

export function invalidateEmployeeDetailQueries(queryClient: QueryClient, employeeId?: number) {
  if (employeeId) {
    queryClient.invalidateQueries({ queryKey: ["employees", "detail", employeeId] });
  }
  queryClient.invalidateQueries({ queryKey: ["employees", "list"] });
}

// Person-related cache invalidation
export function invalidatePersonQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ["persons"] });
}

export function invalidatePersonDetailQueries(queryClient: QueryClient, personId?: number) {
  if (personId) {
    queryClient.invalidateQueries({ queryKey: ["persons", "detail", personId] });
  }
  queryClient.invalidateQueries({ queryKey: ["persons", "list"] });
}

// Company-related cache invalidation
export function invalidateCompanyQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ["companies"] });
}

export function invalidateCompanyDetailQueries(queryClient: QueryClient, companyId?: number) {
  if (companyId) {
    queryClient.invalidateQueries({ queryKey: ["companies", "detail", companyId] });
  }
  queryClient.invalidateQueries({ queryKey: ["companies", "list"] });
}

// Equipment-related cache invalidation
export function invalidateEquipmentQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ["equipments"] });
}

export function invalidateEquipmentDetailQueries(queryClient: QueryClient, equipmentId?: number) {
  if (equipmentId) {
    queryClient.invalidateQueries({ queryKey: ["equipments", "detail", equipmentId] });
  }
  queryClient.invalidateQueries({ queryKey: ["equipments", "list"] });
}

// Tire-related cache invalidation
export function invalidateTireQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ["tires"] });
}

export function invalidateTireDetailQueries(queryClient: QueryClient, tireId?: number) {
  if (tireId) {
    queryClient.invalidateQueries({ queryKey: ["tires", "detail", tireId] });
  }
  queryClient.invalidateQueries({ queryKey: ["tires", "list"] });
}

// User-related cache invalidation
export function invalidateUserQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ["users"] });
}

export function invalidateUserDetailQueries(queryClient: QueryClient, userId?: number) {
  if (userId) {
    queryClient.invalidateQueries({ queryKey: ["users", "detail", userId] });
  }
  queryClient.invalidateQueries({ queryKey: ["users", "list"] });
}

// Composite invalidation helpers for related entities

/**
 * Invalidates cache for employee-related operations
 * Should be called after employee creation, update, or deletion
 */
export function invalidateEmployeeRelatedQueries(queryClient: QueryClient, employeeId?: number, personId?: number) {
  invalidateEmployeeQueries(queryClient);
  invalidateEmployeeDetailQueries(queryClient, employeeId);
  invalidatePersonQueries(queryClient);
  invalidatePersonDetailQueries(queryClient, personId);
}

/**
 * Invalidates cache for company-related operations
 * Should be called after company creation, update, or deletion
 */
export function invalidateCompanyRelatedQueries(queryClient: QueryClient, companyId?: number) {
  invalidateCompanyQueries(queryClient);
  invalidateCompanyDetailQueries(queryClient, companyId);
}

/**
 * Invalidates cache for equipment-related operations
 * Should be called after equipment creation, update, or deletion
 */
export function invalidateEquipmentRelatedQueries(queryClient: QueryClient, equipmentId?: number) {
  invalidateEquipmentQueries(queryClient);
  invalidateEquipmentDetailQueries(queryClient, equipmentId);
}

/**
 * Invalidates cache for tire-related operations
 * Should be called after tire creation, update, or deletion
 */
export function invalidateTireRelatedQueries(queryClient: QueryClient, tireId?: number) {
  invalidateTireQueries(queryClient);
  invalidateTireDetailQueries(queryClient, tireId);
}

/**
 * Invalidates cache for user-related operations
 * Should be called after user creation, update, or deletion
 */
export function invalidateUserRelatedQueries(queryClient: QueryClient, userId?: number) {
  invalidateUserQueries(queryClient);
  invalidateUserDetailQueries(queryClient, userId);
}