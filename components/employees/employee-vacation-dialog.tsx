// filepath: sae-frontend/components/employees/employee-vacation-dialog.tsx
"use client";

import * as React from "react";
import type { EmployeeVacation, VacationType } from "@/types/employee";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { EmployeeVacationForm } from "@/components/forms/employee-vacation-form";
import {
  useCreateEmployeeVacation,
  useUpdateEmployeeVacation,
  useDeleteEmployeeVacation,
} from "@/lib/hooks/useEmployeeVacations";
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

export interface EmployeeVacationDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: number;
  mode: "create" | "edit";
  fixedType: VacationType; // ASSIGNED or TAKEN; not shown to the user
  vacation?: EmployeeVacation | null;
  availableYears?: number[]; // years with available days to choose
  onSuccess?: () => void;
}

export function EmployeeVacationDialog({
  accessToken,
  open,
  onOpenChange,
  employeeId,
  mode,
  fixedType,
  vacation,
  availableYears = [],
  onSuccess,
}: EmployeeVacationDialogProps) {
  const { toast } = useToast();
  const { mutate: createVacation, isPending: creating } =
    useCreateEmployeeVacation(accessToken);
  const { mutate: updateVacation, isPending: updating } =
    useUpdateEmployeeVacation(accessToken);
  const { mutate: deleteVacation, isPending: deleting } =
    useDeleteEmployeeVacation(accessToken);

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createVacation(
        {
          ...data,
          type: fixedType,
          employeeId,
        },
        {
          onSuccess: () => {
            toast({
              title: "Vacación creada",
              description: "La vacación fue creada correctamente.",
              variant: "success",
            });
            onOpenChange(false);
            onSuccess?.();
          },
          onError: (e: any) => {
            toast({
              title: "Error al crear vacación",
              description: e?.message || "Intenta nuevamente.",
              variant: "error",
            });
          },
        }
      );
    } else if (mode === "edit" && vacation) {
      updateVacation(
        {
          id: vacation.id,
          vacationData: {
            ...data,
            type: fixedType,
          },
        },
        {
          onSuccess: () => {
            toast({
              title: "Vacación actualizada",
              description: "La vacación fue guardada correctamente.",
              variant: "success",
            });
            onOpenChange(false);
            onSuccess?.();
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar vacación",
              description: e?.message || "Intenta nuevamente.",
              variant: "error",
            });
          },
        }
      );
    }
  };

  const title =
    mode === "create"
      ? fixedType === "ASSIGNED"
        ? "Agregar Vacaciones Anuales"
        : "Asignar Días de Vacaciones"
      : "Editar Vacación";

  return (
    <>
      <FormDialog
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={
          mode === "create"
            ? "Completa los datos para crear una nueva vacación."
            : "Modifica los datos de la vacación seleccionada."
        }
      >
        <div className="space-y-4">
          <EmployeeVacationForm
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={
              mode === "edit" && vacation
                ? {
                    detail: vacation.detail || "",
                    days: vacation.days,
                    year: vacation.year,
                    startDate: vacation.startDate
                      ? new Date(vacation.startDate).toISOString().slice(0, 10)
                      : "",
                    settlementDate: vacation.settlementDate
                      ? new Date(vacation.settlementDate)
                          .toISOString()
                          .slice(0, 10)
                      : new Date().toISOString().slice(0, 10),
                  }
                : undefined
            }
            isEdit={mode === "edit"}
            availableYears={availableYears}
            onCancel={() => onOpenChange(false)}
            error={null}
          />

          {mode === "edit" && vacation && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Eliminar vacación
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
            <AlertDialogTitle>Eliminar vacación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar la vacación "
              {vacation?.detail || "Sin detalle"}"? Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (vacation) {
                  deleteVacation(vacation.id, {
                    onSuccess: () => {
                      toast({
                        title: "Vacación eliminada",
                        description: "La vacación fue eliminada.",
                        variant: "success",
                      });
                      setConfirmOpen(false);
                      onOpenChange(false);
                      onSuccess?.();
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar vacación",
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
