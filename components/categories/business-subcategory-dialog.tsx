// filepath: sae-frontend/components/categories/business-subcategory-dialog.tsx
"use client";

import * as React from "react";
import {
  useCreateBusinessSubcategory,
  useUpdateBusinessSubcategory,
} from "@/lib/hooks/useCompanies";
import type { BusinessSubcategory } from "@/lib/types/company";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { BusinessSubcategoryForm } from "@/components/forms/business-subcategory-form";
import type { BusinessSubcategoryFormData } from "@/lib/validations/company";

export interface BusinessSubcategoryDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  subcategory?: BusinessSubcategory | null;
}

export function BusinessSubcategoryDialog({
  accessToken,
  open,
  onOpenChange,
  mode,
  subcategory,
}: BusinessSubcategoryDialogProps) {
  const { toast } = useToast();
  const { mutate: createSub, isPending: creating } =
    useCreateBusinessSubcategory();
  const { mutate: updateSub, isPending: updating } =
    useUpdateBusinessSubcategory();

  const onSubmit = (data: BusinessSubcategoryFormData) => {
    if (mode === "create") {
      createSub(
        {
          name: data.name,
          description: data.description,
          businessCategoryId: data.businessCategoryId,
        },
        {
          onSuccess: () => {
            toast({
              title: "Subcategoría creada",
              description: `"${data.name}" creada correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al crear subcategoría",
              description: e?.message || "Intenta nuevamente.",
              variant: "error",
            });
          },
        }
      );
    } else if (mode === "edit" && subcategory) {
      updateSub(
        {
          id: subcategory.id,
          data: {
            name: data.name,
            description: data.description,
            businessCategoryId: data.businessCategoryId,
          },
        },
        {
          onSuccess: () => {
            toast({
              title: "Subcategoría actualizada",
              description: `"${data.name}" guardada.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar subcategoría",
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
      title={mode === "create" ? "Crear subcategoría" : "Editar subcategoría"}
      description={
        mode === "create"
          ? "Completa los datos para crear una nueva subcategoría."
          : "Modifica los datos de la subcategoría."
      }
    >
      <BusinessSubcategoryForm
        onSubmit={onSubmit}
        isLoading={creating || updating}
        defaultValues={
          mode === "edit" && subcategory
            ? {
                name: subcategory.name,
                description: subcategory.description || "",
                businessCategoryId: subcategory.businessCategoryId,
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
