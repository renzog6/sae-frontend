// filepath: sae-frontend/components/tire/tire-size-dialog.tsx
"use client";

import * as React from "react";
import type { TireSize } from "@/lib/types/domain/tire";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { TireSizeForm } from "@/components/forms/tire-size-form";
import { useTireSizes } from "@/lib/hooks/useTires";
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

export interface TireSizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  size?: TireSize | null;
}

export function TireSizeDialog({
  open,
  onOpenChange,
  mode,
  size,
}: TireSizeDialogProps) {
  const { toast } = useToast();
  const { useCreate, useUpdate, useDelete } = useTireSizes();
  const { mutate: createSize, isPending: creating } = useCreate();
  const { mutate: updateSize, isPending: updating } = useUpdate();
  const { mutate: deleteSize, isPending: deleting } = useDelete();

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createSize(data, {
        onSuccess: () => {
          toast({
            title: "Tamaño creado",
            description: `"${data.mainCode}" creado correctamente.`,
            variant: "success",
          });
          onOpenChange(false);
        },
        onError: (e: any) => {
          toast({
            title: "Error al crear tamaño",
            description: e?.message || "Intenta nuevamente.",
            variant: "error",
          });
        },
      });
    } else if (mode === "edit" && size) {
      updateSize(
        { id: size.id, dto: data },
        {
          onSuccess: () => {
            toast({
              title: "Tamaño actualizado",
              description: `"${data.mainCode}" guardado correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar tamaño",
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
        title={mode === "create" ? "Crear tamaño" : "Editar tamaño"}
        description={
          mode === "create"
            ? "Completa los datos para crear un nuevo tamaño de neumático."
            : "Modifica los datos del tamaño seleccionado."
        }
      >
        <div className="space-y-4">
          <TireSizeForm
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={
              mode === "edit" && size
                ? {
                    mainCode: size.mainCode,
                    width: size.width || undefined,
                    aspectRatio: size.aspectRatio || undefined,
                    rimDiameter: size.rimDiameter || undefined,
                    construction: size.construction || "",
                    information: size.information || "",
                  }
                : undefined
            }
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={null}
          />

          {mode === "edit" && size && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Eliminar tamaño
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
            <AlertDialogTitle>Eliminar tamaño</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar el tamaño "{size?.mainCode}"? Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (size) {
                  deleteSize(size.id, {
                    onSuccess: () => {
                      toast({
                        title: "Tamaño eliminado",
                        description: `"${size.mainCode}" eliminado.`,
                        variant: "success",
                      });
                      setConfirmOpen(false);
                      onOpenChange(false);
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar tamaño",
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
