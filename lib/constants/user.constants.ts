import { Role } from "@/lib/types/shared/enums";

export const roleLabels: Record<Role, string> = {
  [Role.USER]: "Usuario",
  [Role.ADMIN]: "Administrador",
} as const;
