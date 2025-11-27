// filepath: sae-frontend/lib/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersService } from "@/lib/api/users";
import { User } from "@/lib/types/domain/user";
import { PaginatedResponse } from "@/lib/types/core/api";
import { UserFormData } from "@/lib/validations/auth";

export function useUsers() {
  return useQuery<PaginatedResponse<User>, Error>({
    queryKey: ["users"],
    queryFn: () => UsersService.getAll(),
  });
}

export function useUser(id: number) {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => UsersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserFormData) => UsersService.create(userData),
    onSuccess: () => {
      // Invalidar y refetch la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: Partial<User> }) =>
      UsersService.update(id, userData),
    onSuccess: () => {
      // Invalidar tanto la lista de usuarios como el usuario individual
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => UsersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
