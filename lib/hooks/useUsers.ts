// filepath: sae-frontend/lib/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersService } from "@/lib/api/users";
import { User } from "@/types/user";
import { UserFormData } from "@/lib/validations/auth";

export function useUsers(accessToken: string) {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => UsersService.getUsers(accessToken),
    enabled: !!accessToken, // solo se ejecuta si hay token
  });
}

export function useUser(accessToken: string, id: number) {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => UsersService.getUserById(id, accessToken),
    enabled: !!accessToken && !!id, // solo se ejecuta si hay token e ID
  });
}

export function useCreateUser(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserFormData) =>
      UsersService.createUser(userData, accessToken),
    onSuccess: () => {
      // Invalidar y refetch la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: Partial<User> }) =>
      UsersService.updateUser(id, userData, accessToken),
    onSuccess: () => {
      // Invalidar tanto la lista de usuarios como el usuario individual
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useDeleteUser(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => UsersService.deleteUser(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
