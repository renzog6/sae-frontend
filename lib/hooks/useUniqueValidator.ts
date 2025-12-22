// filepath: sae-frontend/lib/hooks/useUniqueValidator.ts
import { useEffect, useState } from "react";
import { ValidatorsService } from "@/lib/api/validators/validators.service";
import { UniqueValidatorParams } from "@/lib/types/shared/validators";

/**
Uso en cualquier formulario
Ejemplo: Equipment → engine
const engine = form.watch("engine");

const { exists: engineExists, checking } = useUniqueValidator({
  model: "equipment",
  field: "engine",
  value: engine,
});
 */

export function useUniqueValidator({
  model,
  field,
  value,
  excludeId,
  minLength = 3,
  debounce = 500,
}: UniqueValidatorParams) {
  const [exists, setExists] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!value || value.length < minLength) {
      setExists(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setChecking(true);
        const data = await ValidatorsService.checkUnique({
          model,
          field,
          value,
          excludeId,
        });
        setExists(data.exists);
      } catch {
        setExists(false);
      } finally {
        setChecking(false);
      }
    }, debounce);

    return () => clearTimeout(timeout);
  }, [model, field, value, excludeId, minLength, debounce]);

  return { exists, checking };
}
