// filepath: sae-frontend/components/employees/employee-incident-dialog.tsx
"use client";

import * as React from "react";
import type { EmployeeIncident } from "@/lib/types/history";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import {
  useCreateEmployeeIncident,
  useUpdateEmployeeIncident,
} from "@/lib/hooks/useHistory";
import { Button } from "@/components/ui/button";
import { EmployeeIncidentForm } from "@/components/forms/employee-incident-form";
import type { EmployeeIncidentFormInput } from "@/lib/validations/employeeIncident";

export interface EmployeeIncidentDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: number;
  mode: "create" | "edit";
  incident?: EmployeeIncident | null;
  onSuccess?: () => void;
}

export function EmployeeIncidentDialog({
  accessToken,
  open,
  onOpenChange,
  employeeId,
  mode,
  incident,
  onSuccess,
}: EmployeeIncidentDialogProps) {
  const { toast } = useToast();
  const { mutate: createIncident, isPending: creating } =
    useCreateEmployeeIncident(accessToken);
  const { mutate: updateIncident, isPending: updating } =
    useUpdateEmployeeIncident(accessToken);

  const onSubmit = (data: EmployeeIncidentFormInput) => {
    if (mode === "create") {
      createIncident(
        {
          ...data,
          employeeId,
        },
        {
          onSuccess: () => {
            toast({
              title: "Incidente creado",
              description: "El incidente fue creado correctamente.",
              variant: "success",
            });
            onOpenChange(false);
            onSuccess?.();
          },
          onError: (e: any) => {
            toast({
              title: "Error al crear incidente",
              description: e?.message || "Intenta nuevamente.",
              variant: "error",
            });
          },
        }
      );
    } else if (mode === "edit" && incident) {
      updateIncident(
        {
          id: incident.id,
          data,
        },
        {
          onSuccess: () => {
            toast({
              title: "Incidente actualizado",
              description: "El incidente fue guardado correctamente.",
              variant: "success",
            });
            onOpenChange(false);
            onSuccess?.();
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar incidente",
              description: e?.message || "Intenta nuevamente.",
              variant: "error",
            });
          },
        }
      );
    }
  };

  const title = mode === "create" ? "Agregar Incidente" : "Editar Incidente";

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={
        mode === "create"
          ? "Completa los datos para registrar un nuevo incidente."
          : "Modifica los datos del incidente seleccionado."
      }
    >
      <EmployeeIncidentForm
        onSubmit={onSubmit}
        isLoading={creating || updating}
        defaultValues={
          mode === "edit" && incident
            ? {
                type: incident.type,
                description: incident.description,
                startDate: incident.startDate
                  ? new Date(incident.startDate).toISOString().slice(0, 10)
                  : "",
                endDate: incident.endDate
                  ? new Date(incident.endDate).toISOString().slice(0, 10)
                  : "",
                doctorNote: incident.doctorNote,
                paidLeave: incident.paidLeave,
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
