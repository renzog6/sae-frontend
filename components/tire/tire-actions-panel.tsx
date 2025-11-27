//filepath: sae-frontend/components/tire/tire-actions-panel.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, RotateCcw, Wrench, Minus, Eye, Truck } from "lucide-react";
import { TireAssignmentsDialog } from "./tire-assignments-dialog";
import { TireUnmountDialog } from "./tire-unmount-dialog";
import { TireRotateDialog } from "./tire-rotate-dialog";
import { TireInspectionDialog } from "./tire-inspection-dialog";
import { TireAssignmentsService } from "@/lib/api/tires";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import type { TirePositionConfig } from "@/lib/types/domain/tire";
import type { Equipment } from "@/lib/types/domain/equipment";

interface Props {
  selectedPosition: TirePositionConfig | null;
  selectedEquipment: Equipment | null;
  onRefreshDiagram?: () => void;
}

export const TireActionsPanel: React.FC<Props> = ({
  selectedPosition,
  selectedEquipment,
  onRefreshDiagram,
}) => {
  const { data: session } = useSession();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isUnmountDialogOpen, setIsUnmountDialogOpen] = React.useState(false);
  const [isRotateDialogOpen, setIsRotateDialogOpen] = React.useState(false);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] =
    React.useState(false);

  // Fetch current assignment for this position
  const {
    data: currentAssignment,
    isLoading: assignmentLoading,
    refetch: refetchAssignment,
  } = useQuery({
    queryKey: ["tire-assignment", selectedPosition?.id],
    queryFn: () => TireAssignmentsService.getOpen(),
    enabled: !!selectedPosition?.id,
    select: (data) => {
      // Find assignment for this specific position
      const assignments = Array.isArray(data) ? data : [];
      return assignments.find(
        (assignment: any) =>
          assignment.positionConfigId === selectedPosition?.id
      );
    },
  });
  const assignedTire = currentAssignment?.tire || null;
  const assignmentId = currentAssignment?.id || null;

  const handleRotationSuccess = React.useCallback(() => {
    // Refetch assignment data
    refetchAssignment();
    // Trigger diagram refresh
    onRefreshDiagram?.();
  }, [refetchAssignment, onRefreshDiagram]);

  return (
    <>
      <div className="card h-fit">
        <div className="p-4">
          <h4 className="text-lg font-semibold">Acciones del Neumático</h4>
          <p className="text-sm text-muted-foreground">
            {selectedPosition
              ? `Posición: ${selectedPosition.positionKey}`
              : "Selecciona una posición"}
          </p>

          <div className="mt-4 space-y-4">
            {selectedPosition ? (
              <>
                {/* Assigned Tire Info */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Info del neumático asignado:
                  </h5>
                  {assignmentLoading ? (
                    <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-950/20 dark:border-gray-800">
                      <p className="text-sm text-center text-muted-foreground">
                        Cargando información del neumático...
                      </p>
                    </div>
                  ) : assignedTire ? (
                    <div className="p-3 border border-green-200 rounded-lg bg-green-50 dark:bg-green-950/20 dark:border-green-800">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">Serial:</span>
                          <span className="font-mono">
                            #{(assignedTire as any).serialNumber}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Medida:</span>
                          <span>
                            {(assignedTire as any).model?.size?.mainCode}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Marca:</span>
                          <span>
                            {(assignedTire as any).model?.brand?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Modelo:</span>
                          <span>{(assignedTire as any).model?.name}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="font-medium">Km Totales:</span>
                          <span>{(assignedTire as any).totalKm || 0} km</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-950/20 dark:border-gray-800">
                      <p className="text-sm text-center text-muted-foreground">
                        No hay neumático asignado
                      </p>
                    </div>
                  )}
                </div>

                {/* Position Info */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Info de la posición:
                  </h5>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tipo:</span>
                    <Badge variant="secondary">
                      {selectedPosition.isDual ? "Dual" : "Simple"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Lado:</span>
                    <span className="text-sm">{selectedPosition.side}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => setIsDialogOpen(true)}
                    disabled={!!assignedTire} // Disable if already assigned
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {assignedTire ? "Posición Ocupada" : "Asignar Neumático"}
                  </Button>
                  {/*Button rotate tire*/}
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    disabled={!assignedTire} // Enable only if assigned
                    onClick={() => setIsRotateDialogOpen(true)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Rotar
                  </Button>
                  {/*Button inspect tire*/}
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    disabled={!assignedTire}
                    onClick={() => setIsInspectionDialogOpen(true)}
                  >
                    <Wrench className="w-4 h-4 mr-2" /> Inspeccionar
                  </Button>

                  {/*Button unmount tire*/}
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    disabled={!assignedTire}
                    onClick={() => setIsUnmountDialogOpen(true)}
                  >
                    <Minus className="w-4 h-4 mr-2" /> Desmontar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    disabled={!assignedTire}
                  >
                    <Eye className="w-4 h-4 mr-2" /> Ver Historial
                  </Button>
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Selecciona una posición en el diagrama</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <TireAssignmentsDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            // Refetch assignment data when dialog closes
            refetchAssignment();
            // Refresh diagram to show updated tire assignments
            onRefreshDiagram?.();
          }
        }}
        selectedPosition={selectedPosition}
        selectedEquipment={selectedEquipment}
      />

      <TireUnmountDialog
        open={isUnmountDialogOpen}
        onOpenChange={(open) => {
          setIsUnmountDialogOpen(open);
          if (!open) {
            // Refetch assignment data when dialog closes
            refetchAssignment();
            // Refresh diagram to show updated tire assignments
            onRefreshDiagram?.();
          }
        }}
        selectedPosition={selectedPosition}
        selectedEquipment={selectedEquipment}
        assignedTire={assignedTire}
        assignmentId={assignmentId}
      />

      <TireRotateDialog
        open={isRotateDialogOpen}
        onOpenChange={(open) => {
          setIsRotateDialogOpen(open);
          if (!open) {
            // Refetch assignment data when dialog closes
            refetchAssignment();
            // Refresh diagram to show updated tire assignments
            onRefreshDiagram?.();
          }
        }}
        selectedPosition={selectedPosition}
        selectedEquipment={selectedEquipment}
        assignedTire={assignedTire}
        assignmentId={assignmentId}
        onRotationSuccess={handleRotationSuccess}
      />

      <TireInspectionDialog
        open={isInspectionDialogOpen}
        onOpenChange={(open) => {
          setIsInspectionDialogOpen(open);
          if (!open) {
            // Refetch assignment data when dialog closes
            refetchAssignment();
            // Refresh diagram to show updated tire assignments
            onRefreshDiagram?.();
          }
        }}
        selectedPosition={selectedPosition}
        selectedEquipment={selectedEquipment}
        assignedTire={assignedTire}
      />
    </>
  );
};
