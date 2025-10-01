// filepath: sae-frontend/components/categories/business-category-dialog.tsx
"use client";

import * as React from "react";
import { useCreateBusinessCategory, useUpdateBusinessCategory } from "@/lib/hooks/useCompanies";
import type { BusinessCategory } from "@/types/company";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { BusinessCategoryForm } from "@/components/forms/business-category-form";
import type { BusinessCategoryFormData } from "@/lib/validations/company";

export interface BusinessCategoryDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  category?: BusinessCategory | null;
}

export function BusinessCategoryDialog({ accessToken, open, onOpenChange, mode, category }: BusinessCategoryDialogProps) {
  const { toast } = useToast();
  const { mutate: createCategory, isPending: creating } = useCreateBusinessCategory(accessToken);
  const { mutate: updateCategory, isPending: updating } = useUpdateBusinessCategory(accessToken);

  const onSubmit = (data: BusinessCategoryFormData) => {
    if (mode === "create") {
      createCategory(
        { name: data.name, code: data.code, information: data.information },
        {
          onSuccess: () => {
            toast({ title: "Categoría creada", description: `"${data.name}" creada correctamente.`, variant: "success" });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({ title: "Error al crear categoría", description: e?.message || "Intenta nuevamente.", variant: "error" });
          },
        }
      );
    } else if (mode === "edit" && category) {
      updateCategory(
        { id: category.id, data: { name: data.name, code: data.code, information: data.information } },
        {
          onSuccess: () => {
            toast({ title: "Categoría actualizada", description: `"${data.name}" guardada.`, variant: "success" });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({ title: "Error al actualizar categoría", description: e?.message || "Intenta nuevamente.", variant: "error" });
          },
        }
      );
    }
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "create" ? "Crear categoría" : "Editar categoría"}
      description={mode === "create" ? "Completa los datos para crear una nueva categoría." : "Modifica los datos de la categoría."}
    >
      <BusinessCategoryForm
        onSubmit={onSubmit}
        isLoading={creating || updating}
        defaultValues={mode === "edit" && category ? { name: category.name, code: category.code || "", information: category.information || "" } : undefined}
        isEdit={mode === "edit"}
        onCancel={() => onOpenChange(false)}
        error={null}
      />
    </FormDialog>
  );
}
