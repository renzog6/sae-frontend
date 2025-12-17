// filepath: sae-frontend/components/tire/tire-unmount-dialog.tsx
"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, MapPin, Minus } from "lucide-react";
import { tireStatusLabels } from "@/lib/constants";
import { useToast } from "@/components/ui/toaster";
import { TireAssignmentsService } from "@/lib/api/tires";
import {
  unmountTireSchema,
  type UnmountTireFormData,
} from "@/lib/validations/tire";
import type { TirePositionConfig } from "@/lib/types/domain/tire";
import type { Equipment } from "@/lib/types/domain/equipment";

interface TireUnmountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPosition: TirePositionConfig | null;
  selectedEquipment: Equipment | null;
  assignedTire: any; // Should be fetched from API
  assignmentId: number | null;
}

export function TireUnmountDialog({
  open,
  onOpenChange,
  selectedPosition,
  selectedEquipment,
  assignedTire,
  assignmentId,
}: TireUnmountDialogProps) {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form
  const form = useForm<UnmountTireFormData>({
    resolver: zodResolver(unmountTireSchema),
    defaultValues: {
      kmAtEnd: 0,
      unmountDate: new Date().toISOString().split("T")[0], // Today's date
      newStatus: "IN_STOCK",
      note: "",
    },
  });

  const onSubmit = async (data: UnmountTireFormData) => {
    if (!assignmentId) {
      console.error("No assignmentId provided");
      toast({
        title: "Error",
        description: "No se encontró la asignación del neumático.",
        variant: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Calling TireAssignmentsService.unmountTire with:", {
        assignmentId,
        kmAtEnd: data.kmAtEnd || 0,
        note: data.note || "",
      });

      const result = await TireAssignmentsService.unmount(assignmentId, {
        assignmentId,
        kmAtEnd: data.kmAtEnd || 0,
        unmountDate: data.unmountDate,
        newStatus: data.newStatus,
        note: data.note || "",
      });

      console.log("Unmount result:", result);

      toast({
        title: "Neumático desmontado",
        description: "El neumático ha sido desmontado exitosamente.",
        variant: "success",
      });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error al desmontar neumático:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "No se pudo desmontar el neumático. Intente nuevamente.",
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
            <Minus className="w-5 h-5" />
            Desmontar Neumático
          </DialogTitle>
          <DialogDescription>
            Registra el desmontaje del neumático de la posición seleccionada.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submit event triggered");
              const formData = form.getValues();
              console.log("Form data:", formData);
              onSubmit(formData);
            }}
            className="space-y-6"
          >
            {/* Position Info */}
            {selectedPosition && assignedTire && (
              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Posición y Neumático</span>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posición:</span>
                    <Badge variant="secondary">
                      {selectedPosition.positionKey}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Equipo:</span>
                    <span>{selectedEquipment?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Neumático:</span>
                    <span className="font-mono">
                      #{assignedTire.serialNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Marca/Modelo:</span>
                    <span>
                      {assignedTire.model?.brand?.name}{" "}
                      {assignedTire.model?.name}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* KM at End */}
            <FormField
              control={form.control}
              name="kmAtEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilómetros al Final</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Unmount Date */}
            <FormField
              control={form.control}
              name="unmountDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Desmontaje</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Status */}
            <FormField
              control={form.control}
              name="newStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nuevo Estado del Neumático</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="IN_STOCK">
                        {tireStatusLabels.IN_STOCK}
                      </SelectItem>
                      <SelectItem value="UNDER_REPAIR">
                        {tireStatusLabels.UNDER_REPAIR}
                      </SelectItem>
                      <SelectItem value="RECAP">
                        {tireStatusLabels.RECAP}
                      </SelectItem>
                      <SelectItem value="DISCARDED">
                        {tireStatusLabels.DISCARDED}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observaciones sobre el desmontaje..."
                      className="resize-none"
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
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={() => console.log("Submit button clicked")}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Desmontando...
                  </>
                ) : (
                  <>
                    <Minus className="w-4 h-4 mr-2" />
                    Desmontar Neumático
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
