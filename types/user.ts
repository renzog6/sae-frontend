// filepath: sae-frontend/types/user.ts

export interface User {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "USER" | string; // 👈 ajusta según los roles que tengas
  createdAt: string;
  updatedAt: string;
}
