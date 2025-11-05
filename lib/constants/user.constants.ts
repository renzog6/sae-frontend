import { Role } from "@/lib/types/enums";

export const roleLabels: Record<Role, string> = {
  [Role.USER]: "Usuario",
  [Role.ADMIN]: "Administrador",
} as const;
