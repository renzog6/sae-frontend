// filepath: sae-frontend/lib/hooks/useUsers.ts
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { UsersService } from "@/lib/api/users/users.service";

export const useUsers = () => createApiHooks(UsersService, "users");
