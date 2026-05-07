// filepath: sae-frontend/lib/api/users/users.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { User, CreateUserDto, UpdateUserDto } from "@/lib/types/domain/user";
import { createApiHooks } from "@/lib/hooks/createApiHooks";

class UsersServiceClass extends BaseApiService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  protected basePath = "/users";
}

export const UsersService = new UsersServiceClass();

// Export hooks for consistent usage
export const {
  useGetAll: useUsers,
  useGetById: useUserById,
  useCreate: useCreateUser,
  useUpdate: useUpdateUser,
  useDelete: useDeleteUser,
} = createApiHooks(UsersService, "users");
