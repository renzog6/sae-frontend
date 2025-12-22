// filepath: sae-frontend/lib/types/shared/validators.ts

// Unique validator request/response types
export interface UniqueValidatorDto {
  model: string; // Prisma.ModelName
  field: string;
  value: string;
  excludeId?: string;
}

export interface UniqueCheckResponse {
  exists: boolean;
}

// Unique validator params for frontend hook
export interface UniqueValidatorParams {
  model: string; // Prisma.ModelName
  field: string;
  value: string;
  excludeId?: string;
  minLength?: number;
  debounce?: number;
}

// Unique validator params for API service
export interface UniqueCheckParams {
  model: string; // Prisma.ModelName
  field: string;
  value: string;
  excludeId?: string;
}
