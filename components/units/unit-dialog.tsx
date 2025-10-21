// filepath: sae-frontend/components/units/unit-dialog.tsx
"use client";

import * as React from "react";
import type { UnitFormData } from "@/lib/validations/catalog";
import { useCreateUnit, useUpdateUnit } from "@/lib/hooks/useCatalogs";
import type { Unit } from "@/lib/types/catalog";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { UnitForm } from "@/components/forms/unit-form";

export interface UnitDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  unit?: Unit | null;
}

export function UnitDialog({
  accessToken,
  open,
  onOpenChange,
  mode,
  unit,
}: UnitDialogProps) {
  const { toast } = useToast();
  const { mutate: createUnit, isPending: creating } =
    useCreateUnit(accessToken);
  const { mutate: updateUnit, isPending: updating } =
    useUpdateUnit(accessToken);

  const onSubmit = (data: UnitFormData) => {
    if (mode === "create") {
      createUnit(
        { name: data.name, abbreviation: data.abbreviation },
        {
          onSuccess: () => {
            toast({
              title: "Unidad creada",
              description: `"${data.name}" creada correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al crear unidad",
              description: e?.message || "Intenta nuevamente.",
              variant: "error",
            });
          },
        }
      );
    } else if (mode === "edit" && unit) {
      updateUnit(
        {
          id: unit.id,
          data: { name: data.name, abbreviation: data.abbreviation },
        },
        {
          onSuccess: () => {
            toast({
              title: "Unidad actualizada",
              description: `"${data.name}" guardada correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar unidad",
              description: e?.message || "Intenta nuevamente.",
              variant: "error",
            });
          },
        }
      );
    }
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "create" ? "Crear unidad" : "Editar unidad"}
      description={
        mode === "create"
          ? "Completa los datos para crear una nueva unidad."
          : "Modifica los datos de la unidad seleccionada."
      }
    >
      <UnitForm
        onSubmit={onSubmit}
        isLoading={creating || updating}
        defaultValues={
          mode === "edit" && unit
            ? { name: unit.name, abbreviation: unit.abbreviation }
            : undefined
        }
        isEdit={mode === "edit"}
        onCancel={() => onOpenChange(false)}
        error={null}
      />
    </FormDialog>
  );
}
