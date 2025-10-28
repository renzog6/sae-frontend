// filepath: sae-frontend/types/auth.ts
import { User } from "./user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  username: string;
  role: string;
}
