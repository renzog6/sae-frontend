// filepath: sae-frontend/types/user.ts

export interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}
