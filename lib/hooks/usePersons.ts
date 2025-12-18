// filepath: sae-frontend/lib/hooks/usePersons.ts
import { createApiHooks } from "./createApiHooks";
import { PersonsService } from "@/lib/api/persons/persons.service";
import {
  Person,
  CreatePersonDto,
  UpdatePersonDto,
} from "@/lib/types/domain/employee";

// ===== Persons =====
export const usePersons = () =>
  createApiHooks<Person, CreatePersonDto, UpdatePersonDto>(
    PersonsService,
    "Persons"
  );
