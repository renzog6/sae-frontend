// filepath: sae-frontend/types/user.ts

import { Role } from "./enums";

export interface User {
  id: number;
  email: string;
  name: string;
  username?: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  username?: string;
  password: string;
  role?: Role;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}
