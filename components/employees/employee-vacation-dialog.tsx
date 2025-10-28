// filepath: sae-frontend/components/employees/employee-vacation-dialog.tsx
"use client";

import * as React from "react";
import type {
  EmployeeVacation,
  VacationType,
  AvailableYear,
} from "@/lib/types/employee";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import {
  useCreateEmployeeVacation,
  useUpdateEmployeeVacation,
} from "@/lib/hooks/useEmployeeVacations";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { EmployeeVacationFormTaken } from "@/components/forms/employee-vacation-form-taken";
import { EmployeeVacationFormAssigned } from "@/components/forms/employee-vacation-form-assigned";
import { useDeleteEmployeeVacation } from "@/lib/hooks/useEmployeeVacations";

export interface EmployeeVacationDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: number;
  mode: "create" | "edit";
  fixedType: VacationType; // ASSIGNED or TAKEN; not shown to the user
  vacation?: EmployeeVacation | null;
  availableYears?: AvailableYear[]; // years with available days to choose
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
    useCreateEmployeeVacation();
  const { mutate: updateVacation, isPending: updating } =
    useUpdateEmployeeVacation();
  const { mutate: deleteVacation, isPending: deleting } =
    useDeleteEmployeeVacation();

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleDeleteConfirm = async () => {
    if (!vacation) return;
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
  };

  const deleteDescription = `¿Seguro que quieres eliminar la vacación "${
    vacation?.detail || "Sin detalle"
  }"? Esta acción no se puede deshacer.`;

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
          {/* Vacation Form Taken*/}
          {fixedType === "TAKEN" && (
            <EmployeeVacationFormTaken
              onSubmit={onSubmit}
              isLoading={creating || updating}
              defaultValues={
                mode === "edit" && vacation
                  ? {
                      detail: vacation.detail || "",
                      days: vacation.days,
                      year: vacation.year,
                      startDate: vacation.startDate
                        ? new Date(vacation.startDate)
                            .toISOString()
                            .slice(0, 10)
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
          )}

          {/* Vacation Form Assigned*/}
          {fixedType === "ASSIGNED" && (
            <EmployeeVacationFormAssigned
              onSubmit={onSubmit}
              isLoading={creating || updating}
              defaultValues={
                mode === "edit" && vacation
                  ? {
                      detail: vacation.detail || "",
                      days: vacation.days,
                      year: vacation.year,
                      startDate: vacation.startDate
                        ? new Date(vacation.startDate)
                            .toISOString()
                            .slice(0, 10)
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
              availableYears={availableYears[0] ? [availableYears[0]] : []} // only current year for assigned
              onCancel={() => onOpenChange(false)}
              error={null}
            />
          )}

          {/* Delete button, only in edit mode */}
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
                >
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </div>
      </FormDialog>

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Eliminar vacación"
        description={deleteDescription}
        onConfirm={handleDeleteConfirm}
        isLoading={deleting}
      />
    </>
  );
}
