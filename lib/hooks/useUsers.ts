// filepath: sae-frontend/lib/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersService } from "@/lib/api/users";
import { User } from "@/lib/types/user";
import { UserFormData } from "@/lib/validations/auth";

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => UsersService.getUsers(),
  });
}

export function useUser(id: number) {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => UsersService.getUserById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserFormData) => UsersService.createUser(userData),
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
      UsersService.updateUser(id, userData),
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
    mutationFn: (id: number) => UsersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
