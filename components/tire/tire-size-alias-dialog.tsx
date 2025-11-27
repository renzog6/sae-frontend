// filepath: sae-frontend/components/tire/tire-size-alias-dialog.tsx
"use client";

import * as React from "react";
import type { TireSize, TireSizeAlias } from "@/lib/types/domain/tire";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { TireSizeAliasForm } from "@/components/forms/tire-size-alias-form";
import {
  useCreateTireSizeAlias,
  useUpdateTireSizeAlias,
  useDeleteTireSizeAlias,
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

export interface TireSizeAliasDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  tireSize: TireSize;
  alias?: TireSizeAlias | null;
}

export function TireSizeAliasDialog({
  accessToken,
  open,
  onOpenChange,
  mode,
  tireSize,
  alias,
}: TireSizeAliasDialogProps) {
  const { toast } = useToast();
  const { mutate: createAlias, isPending: creating } =
    useCreateTireSizeAlias(accessToken);
  const { mutate: updateAlias, isPending: updating } =
    useUpdateTireSizeAlias(accessToken);
  const { mutate: deleteAlias, isPending: deleting } =
    useDeleteTireSizeAlias(accessToken);

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createAlias(data, {
        onSuccess: () => {
          toast({
            title: "Alias creado",
            description: `"${data.aliasCode}" creado correctamente.`,
            variant: "success",
          });
          onOpenChange(false);
        },
        onError: (e: any) => {
          toast({
            title: "Error al crear alias",
            description: e?.message || "Intenta nuevamente.",
            variant: "error",
          });
        },
      });
    } else if (mode === "edit" && alias) {
      updateAlias(
        { id: alias.id, data },
        {
          onSuccess: () => {
            toast({
              title: "Alias actualizado",
              description: `"${data.aliasCode}" guardado correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar alias",
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
        title={
          mode === "create"
            ? "Crear medida alternativa"
            : "Editar medida alternativa"
        }
        description={
          mode === "create"
            ? `Agrega una medida alternativa para el tamaño "${tireSize.mainCode}".`
            : "Modifica la medida alternativa seleccionada."
        }
      >
        <div className="space-y-4">
          <TireSizeAliasForm
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={
              mode === "edit" && alias
                ? {
                    aliasCode: alias.aliasCode,
                    tireSizeId: alias.tireSizeId,
                  }
                : {
                    tireSizeId: tireSize.id,
                  }
            }
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={null}
          />

          {mode === "edit" && alias && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Eliminar medida alternativa
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
            <AlertDialogTitle>Eliminar medida alternativa</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar la medida alternativa "
              {alias?.aliasCode}"? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (alias) {
                  deleteAlias(alias.id, {
                    onSuccess: () => {
                      toast({
                        title: "Alias eliminado",
                        description: `"${alias.aliasCode}" eliminado.`,
                        variant: "success",
                      });
                      setConfirmOpen(false);
                      onOpenChange(false);
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar alias",
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
