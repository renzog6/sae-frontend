// filepath: sae-frontend/lib/types/core/common.ts

export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface SoftDeleteEntity extends BaseEntity {
  deletedAt?: string | null;
  isActive: boolean;
}
