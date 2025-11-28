// filepath: sae-frontend/components/tire/tire-rotate-dialog.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, ArrowRight, Truck, MapPin } from "lucide-react";
import { TireRotationsService } from "@/lib/api/tires";
import { useQueryClient } from "@tanstack/react-query";
import {
  useTirePositionConfigsByEquipment,
  useTireAssignments,
} from "@/lib/hooks/useTires";
import { useEquipments } from "@/lib/hooks/useEquipments";
import type { TirePositionConfig } from "@/lib/types/domain/tire";
import type { Equipment } from "@/lib/types/domain/equipment";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPosition: TirePositionConfig | null;
  selectedEquipment: Equipment | null;
  assignedTire: any;
  assignmentId: number | null;
  onRotationSuccess?: () => void;
}

export const TireRotateDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  selectedPosition,
  selectedEquipment,
  assignedTire,
  assignmentId,
  onRotationSuccess,
}) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fromEquipmentId: selectedEquipment?.id || 0,
    toEquipmentId: "",
    fromPosition: selectedPosition?.positionKey || "",
    toPosition: "",
    kmAtRotation: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available equipments for rotation
  const { useGetAll: useEquipmentList } = useEquipments();
  const { data: equipments, isLoading: equipmentsLoading } = useEquipmentList({
    page: 1,
    limit: 100,
    status: "ACTIVE",
  });

  // Fetch current assignments for the equipment to know which positions are occupied
  const { data: currentAssignments, isLoading: assignmentsLoading } =
    useTireAssignments({
      equipmentId: selectedEquipment?.id,
    });

  // Fetch available positions for the current equipment
  const { data: availablePositions, isLoading: positionsLoading } =
    useTirePositionConfigsByEquipment(selectedEquipment?.id);

  // Filter positions that are available (not occupied by other tires)
  const availableTargetPositions = useMemo(() => {
    if (!availablePositions || !Array.isArray(currentAssignments)) return [];

    // Get occupied position keys from current assignments
    const occupiedPositions = currentAssignments
      .map((assignment: any) => {
        // The assignment has positionConfigId, we need to find the position key
        // from availablePositions using the positionConfigId
        const position = availablePositions?.find(
          (p) => p.id === assignment.positionConfigId
        );
        return position?.positionKey;
      })
      .filter(Boolean);

    return availablePositions.filter((pos: TirePositionConfig) => {
      // Exclude current position and occupied positions
      const isAvailable =
        pos.positionKey !== selectedPosition?.positionKey &&
        !occupiedPositions.includes(pos.positionKey);
      console.log(
        `Position ${pos.positionKey}: ${isAvailable ? "AVAILABLE" : "OCCUPIED"}`
      );
      return isAvailable;
    });
  }, [availablePositions, selectedPosition, currentAssignments]);

  const availableEquipments = Array.isArray(equipments)
    ? equipments
    : equipments?.data || [];

  const handleSubmit = async () => {
    if (!assignedTire || !selectedPosition) return;

    setIsSubmitting(true);
    try {
      await TireRotationsService.create({
        tireId: assignedTire.id,
        fromEquipmentId: formData.fromEquipmentId
          ? parseInt(formData.fromEquipmentId.toString())
          : undefined,
        toEquipmentId: formData.toEquipmentId
          ? parseInt(formData.toEquipmentId)
          : undefined,
        fromPosition: selectedPosition?.positionKey as any, // Use actual position key
        toPosition: formData.toPosition as any, // TirePosition enum
        kmAtRotation: formData.kmAtRotation
          ? parseInt(formData.kmAtRotation)
          : undefined,
        notes: formData.notes,
      });

      // ✅ INVALIDATE QUERIES TO REFRESH UI AUTOMATICALLY
      await queryClient.invalidateQueries({
        queryKey: ["tire-assignments"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["tire-position-configs-equipment", selectedEquipment?.id],
      });

      // If inter-equipment rotation, also invalidate destination equipment
      if (formData.toEquipmentId) {
        await queryClient.invalidateQueries({
          queryKey: [
            "tire-position-configs-equipment",
            parseInt(formData.toEquipmentId),
          ],
        });
      }

      // Invalidate tire detail if assigned tire exists
      if (assignedTire?.id) {
        await queryClient.invalidateQueries({
          queryKey: ["tires", assignedTire.id],
        });
      }

      // Invalidate specific assignment queries for both positions
      await queryClient.invalidateQueries({
        queryKey: ["tire-assignment", selectedPosition?.id], // Old position
      });

      // If inter-equipment rotation, also invalidate queries for destination equipment
      if (formData.toEquipmentId) {
        await queryClient.invalidateQueries({
          queryKey: ["tire-assignments"], // General assignments for destination equipment
        });
      }

      // Call success callback to refresh parent components
      if (onRotationSuccess) {
        onRotationSuccess();
      }

      onOpenChange(false);
      // Reset form
      setFormData({
        fromEquipmentId: selectedEquipment?.id || 0,
        toEquipmentId: "",
        fromPosition: selectedPosition?.positionKey || "",
        toPosition: "",
        kmAtRotation: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error rotating tire:", error);
      alert("Error al rotar el neumático");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isIntraEquipment = !formData.toEquipmentId; // Same equipment
  const isInterEquipment = !!formData.toEquipmentId; // Different equipment

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Rotar Neumático
          </DialogTitle>
          <DialogDescription>
            Registra una rotación del neumático a una nueva posición o equipo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Assignment Info */}
          <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <h4 className="mb-2 text-sm font-medium text-blue-900 dark:text-blue-100">
              Información Actual
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Equipo actual:</span>
                <p className="text-muted-foreground">
                  {selectedEquipment?.name}
                </p>
              </div>
              <div>
                <span className="font-medium">Posición actual:</span>
                <p className="text-muted-foreground">
                  {selectedPosition?.positionKey}
                </p>
              </div>
              <div>
                <span className="font-medium">Neumático:</span>
                <p className="text-muted-foreground">
                  #{assignedTire?.serialNumber}
                </p>
              </div>
              <div>
                <span className="font-medium">Km actuales:</span>
                <p className="text-muted-foreground">
                  {assignedTire?.totalKm || 0} km
                </p>
              </div>
            </div>
          </div>

          {/* Rotation Type Selection */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Rotación</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={!formData.toEquipmentId ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, toEquipmentId: "" }))
                  }
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Intra-equipo
                </Button>
                <Button
                  type="button"
                  variant={!!formData.toEquipmentId ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      toEquipmentId: "select",
                    }))
                  }
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Inter-equipo
                </Button>
              </div>
            </div>

            {/* Target Equipment Selection (for inter-equipment rotation) */}
            {isInterEquipment && (
              <div className="space-y-2">
                <Label htmlFor="toEquipment">Equipo Destino *</Label>
                <Select
                  value={formData.toEquipmentId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, toEquipmentId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar equipo destino" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentsLoading ? (
                      <SelectItem value="loading-equipments" disabled>
                        Cargando equipos...
                      </SelectItem>
                    ) : (
                      availableEquipments
                        .filter(
                          (eq: Equipment) => eq.id !== selectedEquipment?.id
                        )
                        .map((equipment: Equipment) => (
                          <SelectItem
                            key={equipment.id}
                            value={equipment.id.toString()}
                          >
                            {equipment.name}
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Target Position Selection */}
            <div className="space-y-2">
              <Label htmlFor="toPosition">Posición Destino *</Label>
              <Select
                value={formData.toPosition}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, toPosition: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar posición destino" />
                </SelectTrigger>
                <SelectContent>
                  {positionsLoading ? (
                    <SelectItem value="loading-positions" disabled>
                      Cargando posiciones...
                    </SelectItem>
                  ) : availableTargetPositions.length > 0 ? (
                    availableTargetPositions.map(
                      (position: TirePositionConfig) => (
                        <SelectItem
                          key={position.id}
                          value={position.positionKey}
                        >
                          <div className="flex items-center gap-2">
                            <span>{position.positionKey}</span>
                            <Badge variant="secondary" className="text-xs">
                              {position.isDual ? "Dual" : "Simple"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {position.side}
                            </span>
                          </div>
                        </SelectItem>
                      )
                    )
                  ) : (
                    <SelectItem value="no-positions" disabled>
                      No hay posiciones disponibles
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* KM at Rotation */}
            <div className="space-y-2">
              <Label htmlFor="kmAtRotation">
                Kilómetros al momento de la rotación
              </Label>
              <Input
                id="kmAtRotation"
                type="number"
                placeholder="Ej: 125000"
                value={formData.kmAtRotation}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    kmAtRotation: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-muted-foreground">
                Km actuales del equipo al momento de la rotación
              </p>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Textarea
                id="notes"
                placeholder="Motivo de la rotación, observaciones..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                rows={3}
              />
            </div>
          </div>

          {/* Rotation Summary */}
          {formData.toPosition && (
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <h4 className="mb-2 text-sm font-medium text-green-900 dark:text-green-100">
                Resumen de la Rotación
              </h4>
              <div className="flex items-center gap-2 text-sm">
                <span>{selectedPosition?.positionKey}</span>
                <ArrowRight className="w-4 h-4" />
                <span>{formData.toPosition}</span>
                {isInterEquipment && (
                  <>
                    <span className="mx-2">en</span>
                    <span className="font-medium">
                      {
                        availableEquipments.find(
                          (eq: Equipment) =>
                            eq.id.toString() === formData.toEquipmentId
                        )?.name
                      }
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.toPosition}
          >
            {isSubmitting ? "Rotando..." : "Confirmar Rotación"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
