// filepath: sae-frontend/components/brands/brand-dialog.tsx
"use client";

import * as React from "react";
import { useBrands } from "@/lib/hooks/useCatalogs";
import type { Brand } from "@/lib/types/shared/catalogs";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { BrandForm } from "@/components/forms/brand-form";
import type { BrandFormData } from "@/lib/validations/catalog";

export interface BrandDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  brand?: Brand | null;
}

export function BrandDialog({
  accessToken,
  open,
  onOpenChange,
  mode,
  brand,
}: BrandDialogProps) {
  const { toast } = useToast();
  const { mutate: createBrand, isPending: creating } = useBrands().useCreate();
  const { mutate: updateBrand, isPending: updating } = useBrands().useUpdate();

  const onSubmit = (data: BrandFormData) => {
    if (mode === "create") {
      createBrand(
        {
          name: data.name,
          code: data.code,
          information: data.information || undefined,
        },
        {
          onSuccess: () => {
            toast({
              title: "Marca creada",
              description: `"${data.name}" creada correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al crear marca",
              description: e?.message || "Intenta nuevamente.",
              variant: "error",
            });
          },
        }
      );
    } else if (mode === "edit" && brand) {
      updateBrand(
        {
          id: brand.id,
          dto: {
            name: data.name,
            code: data.code,
            information: data.information || undefined,
          },
        },
        {
          onSuccess: () => {
            toast({
              title: "Marca actualizada",
              description: `"${data.name}" guardada correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar marca",
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
      title={mode === "create" ? "Crear marca" : "Editar marca"}
      description={
        mode === "create"
          ? "Completa los datos para crear una nueva marca."
          : "Modifica los datos de la marca seleccionada."
      }
    >
      <BrandForm
        onSubmit={onSubmit}
        isLoading={creating || updating}
        defaultValues={
          mode === "edit" && brand
            ? {
                name: brand.name,
                code: brand.code,
                information: brand.information || "",
              }
            : undefined
        }
        isEdit={mode === "edit"}
        onCancel={() => onOpenChange(false)}
        error={null}
      />
    </FormDialog>
  );
}
