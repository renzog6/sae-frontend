// filepath: sae-frontend/lib/hooks/usePersons.ts
import { createApiHooks } from "./createApiHooks";
import { invalidatePersonQueries, invalidatePersonDetailQueries } from "@/lib/utils/cache-invalidation";
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
    "persons",
    {
      onCreateSuccess: (qc) => invalidatePersonQueries(qc),
      onUpdateSuccess: (qc, id) => {
        invalidatePersonQueries(qc);
        invalidatePersonDetailQueries(qc, id);
      },
      onDeleteSuccess: (qc) => invalidatePersonQueries(qc),
    }
  );
