// filepath: sae-frontend/lib/hooks/useUsers.ts
import { useUsers as useUsersHook, useUserById, useCreateUser, useUpdateUser, useDeleteUser } from "@/lib/api/users/users.service";

// Re-export for backward compatibility
export { useUsersHook as useUsers, useUserById, useCreateUser, useUpdateUser, useDeleteUser };

// Also export the individual hooks for granular usage
export * from "@/lib/api/users/users.service";
