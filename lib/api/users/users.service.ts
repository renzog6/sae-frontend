// filepath: sae-frontend/lib/api/users/users.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { User, CreateUserDto, UpdateUserDto } from "@/lib/types/domain/user";

class UsersServiceClass extends BaseApiService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  protected basePath = "/users";
}

export const UsersService = new UsersServiceClass();
