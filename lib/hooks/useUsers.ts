// filepath: sae-frontend/lib/hooks/useUsers.ts

import { useQuery } from "@tanstack/react-query";
import { UsersService } from "@/lib/api/users";
import { User } from "@/types/user";

export function useUsers(accessToken: string) {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => UsersService.getUsers(accessToken),
    enabled: !!accessToken, // solo se ejecuta si hay token
  });
}
