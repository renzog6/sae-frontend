// filepath: sae-frontend/components/equipment/equipment-model-dialog.tsx
"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EquipmentModel } from "@/lib/types/domain/equipment";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { EquipmentModelForm } from "@/components/forms/equipment-model-form";
import { EquipmentModelsService } from "@/lib/api/equipments";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export interface EquipmentModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  model?: EquipmentModel | null;
}

export function EquipmentModelDialog({
  open,
  onOpenChange,
  mode,
  model,
}: EquipmentModelDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: any) => EquipmentModelsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipmentModels"] });
      toast({
        title: "Modelo creado",
        description: `"${(model as any)?.name || (model as any)?.name || "Modelo"}" creado correctamente.`,
        variant: "success",
      });
      onOpenChange(false);
    },
    onError: (e: any) => {
      toast({
        title: "Error al crear modelo",
        description: e?.message || "Intenta nuevamente.",
        variant: "error",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      EquipmentModelsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipmentModels"] });
      toast({
        title: "Modelo actualizado",
        description: `"${model?.name}" guardado correctamente.`,
        variant: "success",
      });
      onOpenChange(false);
    },
    onError: (e: any) => {
      toast({
        title: "Error al actualizar modelo",
        description: e?.message || "Intenta nuevamente.",
        variant: "error",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => EquipmentModelsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipmentModels"] });
      toast({
        title: "Modelo eliminado",
        description: `"${model?.name}" eliminado.`,
        variant: "success",
      });
      setConfirmOpen(false);
      onOpenChange(false);
    },
    onError: (e: any) => {
      toast({
        title: "Error al eliminar modelo",
        description: e?.message || "Intenta nuevamente.",
        variant: "error",
      });
    },
  });

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createMutation.mutate(data);
    } else if (mode === "edit" && model) {
      updateMutation.mutate({ id: model.id, data });
    }
  };

  return (
    <>
      <FormDialog
        open={open}
        onOpenChange={onOpenChange}
        title={mode === "create" ? "Crear modelo" : "Editar modelo"}
        description={
          mode === "create"
            ? "Completa los datos para crear un nuevo modelo de equipo."
            : "Modifica los datos del modelo seleccionado."
        }
      >
        <div className="space-y-4">
          <EquipmentModelForm
            onSubmit={onSubmit}
            isLoading={createMutation.isPending || updateMutation.isPending}
            defaultValues={
              mode === "edit" && model
                ? {
                    name: model.name,
                    code: model.code || "",
                    year: model.year || undefined,
                    description: model.description || "",
                    typeId: model.typeId || undefined,
                  }
                : undefined
            }
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={null}
          />

          {mode === "edit" && model && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-destructive">
                    Eliminar modelo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Esta acción no se puede deshacer.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setConfirmOpen(true)}
                  disabled={deleteMutation.isPending}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </div>
      </FormDialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar modelo</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar el modelo "{model?.name}"? Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (model) {
                  deleteMutation.mutate(model.id);
                }
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
