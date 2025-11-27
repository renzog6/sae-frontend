// filepath: sae-frontend/lib/types/domain/user.ts

import { Role } from "../shared/enums";

export interface User {
  id: number;
  email: string;
  name: string;
  username?: string | null;
  role: Role;
  preferences?: Record<string, any>;
  companyId: number;
  isActive?: boolean;
  lastLoginAt?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  username?: string;
  password: string;
  role?: Role;
  preferences?: Record<string, any>;
  companyId?: number;
  isActive?: boolean;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  deletedAt?: string;
}
