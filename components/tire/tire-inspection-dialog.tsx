// filepath: sae-frontend/components/tire/tire-inspection-dialog.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Wrench, Loader2, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/toaster";
import { TireInspectionsService } from "@/lib/api/tires";
import {
  createTireInspectionSchema,
  type CreateTireInspectionFormData,
} from "@/lib/validations/tire";
import type { TirePositionConfig } from "@/lib/types/domain/tire";
import type { Equipment } from "@/lib/types/domain/equipment";

interface TireInspectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPosition: TirePositionConfig | null;
  selectedEquipment: Equipment | null;
  assignedTire: any;
}

export function TireInspectionDialog({
  open,
  onOpenChange,
  selectedPosition,
  selectedEquipment,
  assignedTire,
}: TireInspectionDialogProps) {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form
  const form = useForm<CreateTireInspectionFormData>({
    resolver: zodResolver(createTireInspectionSchema),
    defaultValues: {
      tireId: 0,
      inspectionDate: new Date().toISOString().split("T")[0], // Today's date
      pressure: undefined,
      treadDepth: undefined,
      observation: "",
    },
  });

  // Update form when assignedTire changes
  React.useEffect(() => {
    if (assignedTire?.id) {
      form.setValue("tireId", assignedTire.id);
    }
  }, [assignedTire?.id, form]);

  const onSubmit = async (data: CreateTireInspectionFormData) => {
    if (!assignedTire) return;

    setIsSubmitting(true);
    try {
      await TireInspectionsService.create({
        tireId: assignedTire.id,
        inspectionDate: data.inspectionDate,
        pressure: data.pressure,
        treadDepth: data.treadDepth,
        observation: data.observation || undefined,
      });

      toast({
        title: "Inspección registrada",
        description:
          "La inspección del neumático ha sido registrada exitosamente.",
        variant: "success",
      });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar la inspección. Intente nuevamente.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Inspeccionar Neumático
          </DialogTitle>
          <DialogDescription>
            Registra una inspección técnica del neumático asignado a esta
            posición.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Position and Tire Info */}
            {selectedPosition && assignedTire && (
              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Información del Neumático</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Posición:</span>
                    <Badge variant="secondary" className="ml-2">
                      {selectedPosition.positionKey}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Serial:</span>
                    <span className="ml-2 font-mono">
                      #{assignedTire.serialNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Marca:</span>
                    <span className="ml-2">
                      {assignedTire.model?.brand?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Modelo:</span>
                    <span className="ml-2">{assignedTire.model?.name}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Medida:</span>
                    <span className="ml-2">
                      {assignedTire.model?.size?.mainCode}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Inspection Date */}
            <FormField
              control={form.control}
              name="inspectionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Inspección</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pressure */}
            <FormField
              control={form.control}
              name="pressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presión (PSI)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Ej: 32.5"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            ? parseFloat(e.target.value)
                            : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tread Depth */}
            <FormField
              control={form.control}
              name="treadDepth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profundidad de Banda (mm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Ej: 8.5"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            ? parseFloat(e.target.value)
                            : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Observation */}
            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Estado general, daños, recomendaciones..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <Wrench className="w-4 h-4 mr-2" />
                    Registrar Inspección
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
