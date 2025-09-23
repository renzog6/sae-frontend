// filepath: sae-frontend/components/locations/city-drawer.tsx
"use client";

import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CityForm } from "@/components/forms/city-form";
import { useCreateCity, useUpdateCity } from "@/lib/hooks/useLocations";
import type { City } from "@/types/location";
import type { CityFormData } from "@/lib/validations/location";
import { motion, useReducedMotion } from "framer-motion";
import { useToast } from "@/components/ui/toaster";

interface CityDrawerProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  city?: City | null;
}

export function CityDialog({ accessToken, open, onOpenChange, mode, city }: CityDrawerProps) {
  const { mutate: createCity, isPending: creating, error: createError } = useCreateCity(accessToken);
  const { mutate: updateCity, isPending: updating, error: updateError } = useUpdateCity(accessToken);
  const prefersReducedMotion = useReducedMotion();
  const { toast } = useToast();

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
        onSuccess: () => {
          toast({ title: "Ciudad creada", description: `"${data.name}" creada correctamente.`, variant: "success" });
          onOpenChange(false);
        },
        onError: (e: any) => {
          toast({ title: "Error al crear ciudad", description: e?.message || "Intenta nuevamente.", variant: "error" });
        },
      });
    } else if (mode === "edit" && city) {
      updateCity(
        { id: city.id, cityData: data },
        {
          onSuccess: () => {
            toast({ title: "Ciudad actualizada", description: `"${data.name}" guardada correctamente.`, variant: "success" });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({ title: "Error al actualizar ciudad", description: e?.message || "Intenta nuevamente.", variant: "error" });
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Nueva ciudad" : `Editar ciudad`}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa los datos para crear una nueva ciudad."
              : `Modifica los datos de la ciudad ${city?.name}.`}
          </DialogDescription>
        </DialogHeader>
        <motion.div
          className="overflow-auto"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
        >
          <CityForm
            accessToken={accessToken}
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={defaultValues}
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={(createError || updateError) ? (createError as any)?.message || (updateError as any)?.message : null}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

