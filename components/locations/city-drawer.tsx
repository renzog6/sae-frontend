// filepath: sae-frontend/components/locations/city-drawer.tsx
"use client";

import { useMemo } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { CityForm } from "@/components/forms/city-form";
import { useCreateCity, useUpdateCity } from "@/lib/hooks/useLocations";
import type { City } from "@/types/location";
import type { CityFormData } from "@/lib/validations/location";

interface CityDrawerProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  city?: City | null;
}

export function CityDrawer({ accessToken, open, onOpenChange, mode, city }: CityDrawerProps) {
  const { mutate: createCity, isPending: creating, error: createError } = useCreateCity(accessToken);
  const { mutate: updateCity, isPending: updating, error: updateError } = useUpdateCity(accessToken);

  const defaultValues: Partial<CityFormData> | undefined = useMemo(() => {
    if (mode === "edit" && city) {
      return {
        name: city.name,
        postalCode: city.postalCode || "",
        provinceId: city.provinceId,
      };
    }
    return undefined;
  }, [mode, city]);

  const onSubmit = (data: CityFormData) => {
    if (mode === "create") {
      createCity(data, {
        onSuccess: () => onOpenChange(false),
      });
    } else if (mode === "edit" && city) {
      updateCity(
        { id: city.id, cityData: data },
        {
          onSuccess: () => onOpenChange(false),
        }
      );
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{mode === "create" ? "Nueva ciudad" : `Editar ciudad`}</DrawerTitle>
          <DrawerDescription>
            {mode === "create"
              ? "Completa los datos para crear una nueva ciudad."
              : `Modifica los datos de la ciudad ${city?.name}.`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-auto">
          <CityForm
            accessToken={accessToken}
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={defaultValues}
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={(createError || updateError) ? (createError as any)?.message || (updateError as any)?.message : null}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
