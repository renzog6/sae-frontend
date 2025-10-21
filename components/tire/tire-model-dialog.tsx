// filepath: sae-frontend/components/tire/tire-model-dialog.tsx
"use client";

import * as React from "react";
import type { TireModel } from "@/lib/types/tire";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { TireModelForm } from "@/components/forms/tire-model-form";
import {
  useCreateTireModel,
  useUpdateTireModel,
  useDeleteTireModel,
} from "@/lib/hooks/useTires";
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

export interface TireModelDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  model?: TireModel | null;
}

export function TireModelDialog({
  accessToken,
  open,
  onOpenChange,
  mode,
  model,
}: TireModelDialogProps) {
  const { toast } = useToast();
  const { mutate: createModel, isPending: creating } =
    useCreateTireModel(accessToken);
  const { mutate: updateModel, isPending: updating } =
    useUpdateTireModel(accessToken);
  const { mutate: deleteModel, isPending: deleting } =
    useDeleteTireModel(accessToken);

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createModel(data, {
        onSuccess: () => {
          toast({
            title: "Modelo creado",
            description: `"${data.name}" creado correctamente.`,
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
    } else if (mode === "edit" && model) {
      updateModel(
        { id: model.id, data },
        {
          onSuccess: () => {
            toast({
              title: "Modelo actualizado",
              description: `"${data.name}" guardado correctamente.`,
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
        }
      );
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
            ? "Completa los datos para crear un nuevo modelo de neumático."
            : "Modifica los datos del modelo seleccionado."
        }
      >
        <div className="space-y-4">
          <TireModelForm
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={
              mode === "edit" && model
                ? {
                    brandId: model.brandId,
                    sizeId: model.sizeId,
                    name: model.name,
                    loadIndex: model.loadIndex || undefined,
                    speedSymbol: model.speedSymbol || "",
                    plyRating: model.plyRating || "",
                    treadPattern: model.treadPattern || "",
                    information: model.information || "",
                  }
                : undefined
            }
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={null}
            accessToken={accessToken}
          />

          {mode === "edit" && model && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Eliminar modelo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Esta acción no se puede deshacer.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setConfirmOpen(true)}
                  disabled={deleting}
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
                  deleteModel(model.id, {
                    onSuccess: () => {
                      toast({
                        title: "Modelo eliminado",
                        description: `"${model.name}" eliminado.`,
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
