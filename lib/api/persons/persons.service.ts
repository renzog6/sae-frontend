// filepath: sae-frontend/lib/api/persons/persons.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import {
  Person,
  CreatePersonDto,
  UpdatePersonDto,
} from "@/lib/types/domain/employee";

class PersonsServiceClass extends BaseApiService<
  Person,
  CreatePersonDto,
  UpdatePersonDto
> {
  protected basePath = "/persons";
}

export const PersonsService = new PersonsServiceClass();
