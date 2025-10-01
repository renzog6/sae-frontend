// filepath: sae-frontend/components/employees/employee-vacation-delete-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { EmployeeVacation } from "@/types/employee";
import { useDeleteEmployeeVacation } from "@/lib/hooks/useEmployeeVacations";
import { useState } from "react";

export function EmployeeVacationDeleteDialog(props: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  accessToken: string;
  vacation: EmployeeVacation | null;
  onSuccess?: () => void;
}) {
  const { open, onOpenChange, accessToken, vacation, onSuccess } = props;
  const [pending, setPending] = useState(false);
  const deleteMutation = useDeleteEmployeeVacation(accessToken);

  async function handleDelete() {
    if (!vacation) return;
    setPending(true);
    try {
      await deleteMutation.mutateAsync(vacation.id);
      onOpenChange(false);
      onSuccess?.();
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar registro</DialogTitle>
        </DialogHeader>
        <div className="py-2 text-sm">
          ¿Confirmás eliminar el registro de vacaciones
          {vacation
            ? ` del ${new Date(vacation.settlementDate).toLocaleDateString()}`
            : ""}
          ?
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={pending}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={pending || !vacation}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
