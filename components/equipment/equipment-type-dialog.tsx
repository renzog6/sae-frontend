// filepath: sae-frontend/components/equipment/equipment-type-dialog.tsx
"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EquipmentType } from "@/lib/types/domain/equipment";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { EquipmentTypeForm } from "@/components/forms/equipment-type-form";
import { EquipmentTypesService } from "@/lib/api/equipments";
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

export interface EquipmentTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  type?: EquipmentType | null;
}

export function EquipmentTypeDialog({
  open,
  onOpenChange,
  mode,
  type,
}: EquipmentTypeDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: any) => EquipmentTypesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipmentTypes"] });
      toast({
        title: "Tipo creado",
        description: `"${(type as any)?.name || "Tipo"}" creado correctamente.`,
        variant: "success",
      });
      onOpenChange(false);
    },
    onError: (e: any) => {
      toast({
        title: "Error al crear tipo",
        description: e?.message || "Intenta nuevamente.",
        variant: "error",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      EquipmentTypesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipmentTypes"] });
      toast({
        title: "Tipo actualizado",
        description: `"${type?.name}" guardado correctamente.`,
        variant: "success",
      });
      onOpenChange(false);
    },
    onError: (e: any) => {
      toast({
        title: "Error al actualizar tipo",
        description: e?.message || "Intenta nuevamente.",
        variant: "error",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => EquipmentTypesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipmentTypes"] });
      toast({
        title: "Tipo eliminado",
        description: `"${type?.name}" eliminado.`,
        variant: "success",
      });
      setConfirmOpen(false);
      onOpenChange(false);
    },
    onError: (e: any) => {
      toast({
        title: "Error al eliminar tipo",
        description: e?.message || "Intenta nuevamente.",
        variant: "error",
      });
    },
  });

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createMutation.mutate(data);
    } else if (mode === "edit" && type) {
      updateMutation.mutate({ id: type.id, data });
    }
  };

  return (
    <>
      <FormDialog
        open={open}
        onOpenChange={onOpenChange}
        title={mode === "create" ? "Crear tipo" : "Editar tipo"}
        description={
          mode === "create"
            ? "Completa los datos para crear un nuevo tipo de equipo."
            : "Modifica los datos del tipo seleccionado."
        }
      >
        <div className="space-y-4">
          <EquipmentTypeForm
            onSubmit={onSubmit}
            isLoading={createMutation.isPending || updateMutation.isPending}
            defaultValues={
              mode === "edit" && type
                ? {
                    name: type.name,
                    code: type.code || "",
                    description: type.description || "",
                    categoryId: type.categoryId || undefined,
                  }
                : undefined
            }
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={null}
          />

          {mode === "edit" && type && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-destructive">
                    Eliminar tipo
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
            <AlertDialogTitle>Eliminar tipo</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar el tipo "{type?.name}"? Esta acción
              no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (type) {
                  deleteMutation.mutate(type.id);
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
