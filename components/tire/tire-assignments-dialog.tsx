// filepath: sae-frontend/components/tire/tire-assignments-dialog.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Truck, MapPin, Search } from "lucide-react";
import { useToast } from "@/components/ui/toaster";
import { useTires } from "@/lib/hooks/useTires";
import { useEquipments } from "@/lib/hooks/useEquipments";
import { TireAssignmentsService } from "@/lib/api/tires";
import {
  mountTireSchema,
  type MountTireFormData,
} from "@/lib/validations/tire";
import type { TirePositionConfig } from "@/lib/types/domain/tire";
import type { Equipment } from "@/lib/types/domain/equipment";

interface TireAssignmentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPosition: TirePositionConfig | null;
  selectedEquipment: Equipment | null;
}

export function TireAssignmentsDialog({
  open,
  onOpenChange,
  selectedPosition,
  selectedEquipment,
}: TireAssignmentsDialogProps) {
  const { toast } = useToast();

  const [selectedTireId, setSelectedTireId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Queries
  const { useGetAll } = useTires();
  const { data: tiresData, isLoading: tiresLoading } = useGetAll({
    status: "IN_STOCK",
    page: 1,
    limit: 50,
  });

  const { useGetAll: useEquipmentList } = useEquipments();
  const { data: equipmentData, isLoading: equipmentLoading } = useEquipmentList(
    {
      page: 1,
      limit: 50,
    }
  );

  // Form
  const form = useForm<MountTireFormData>({
    resolver: zodResolver(mountTireSchema),
    defaultValues: {
      tireId: 0,
      equipmentId: selectedEquipment?.id,
      position: selectedPosition?.positionKey || "",
      kmAtStart: 0,
      mountDate: new Date().toISOString().split("T")[0], // Today's date
      note: "",
    },
  });

  // Update form when selectedPosition or selectedEquipment changes
  React.useEffect(() => {
    if (selectedPosition && selectedEquipment) {
      form.setValue("equipmentId", selectedEquipment.id);
      form.setValue("position", selectedPosition.positionKey);
    }
  }, [selectedPosition, selectedEquipment, form]);

  const onSubmit = async (data: MountTireFormData) => {
    if (!selectedPosition) return;

    setIsSubmitting(true);
    try {
      await TireAssignmentsService.mount({
        tireId: data.tireId,
        positionConfigId: selectedPosition.id,
        kmAtStart: data.kmAtStart || 0,
        mountDate: data.mountDate,
        note: data.note || "",
      });

      toast({
        title: "Neumático asignado",
        description:
          "El neumático ha sido asignado exitosamente a la posición.",
        variant: "success",
      });

      onOpenChange(false);
      form.reset();
      setSelectedTireId(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo asignar el neumático. Intente nuevamente.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableTires = tiresData?.data || [];
  const availableEquipment = equipmentData?.data || [];

  // Filter tires based on search term
  const filteredTires = availableTires.filter(
    (tire: any) =>
      searchTerm === "" ||
      tire.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tire.model?.brand?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      tire.model?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tire.model?.size?.mainCode
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const selectedTire = availableTires.find((t: any) => t.id === selectedTireId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Asignar Neumático
          </DialogTitle>
          <DialogDescription>
            Selecciona un neumático disponible para asignar a la posición
            seleccionada.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Position Info */}
            {selectedPosition && (
              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Posición Seleccionada</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Posición:</span>
                    <Badge variant="secondary" className="ml-2">
                      {selectedPosition.positionKey}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="ml-2">
                      {selectedPosition.isDual ? "Dual" : "Simple"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lado:</span>
                    <span className="ml-2">{selectedPosition.side}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Equipo:</span>
                    <span className="ml-2">
                      {selectedEquipment?.name || "No seleccionado"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Tire Selection with Search */}
            <FormField
              control={form.control}
              name="tireId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neumático Disponible</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const tireId = parseInt(value);
                      field.onChange(tireId);
                      setSelectedTireId(tireId);
                    }}
                    value={field.value?.toString() || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un neumático" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Search Input inside Select */}
                      <div className="p-2 border-b">
                        <div className="relative">
                          <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Buscar neumáticos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-8 pl-10"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>

                      {tiresLoading ? (
                        <div className="p-2 text-center text-muted-foreground">
                          <Loader2 className="w-4 h-4 mx-auto mb-2 animate-spin" />
                          Cargando neumáticos...
                        </div>
                      ) : filteredTires.length === 0 ? (
                        <div className="p-2 text-center text-muted-foreground">
                          {searchTerm
                            ? "No se encontraron neumáticos"
                            : "No hay neumáticos disponibles"}
                        </div>
                      ) : (
                        filteredTires.map((tire: any) => (
                          <SelectItem key={tire.id} value={tire.id.toString()}>
                            <div className="flex items-center justify-between w-full">
                              <span>
                                #{tire.serialNumber} - {tire.model?.brand?.name}{" "}
                                {tire.model?.name}
                              </span>
                              <Badge variant="outline" className="ml-2">
                                {tire.model?.size?.mainCode}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selected Tire Info */}
            {selectedTire && (
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
                <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">
                  Neumático Seleccionado
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Serial:</span>
                    <span className="ml-2 font-mono">
                      #{selectedTire.serialNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Marca:</span>
                    <span className="ml-2">
                      {selectedTire.model?.brand?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Modelo:</span>
                    <span className="ml-2">{selectedTire.model?.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Medida:</span>
                    <span className="ml-2">
                      {selectedTire.model?.size?.mainCode}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* KM at Start */}
            <FormField
              control={form.control}
              name="kmAtStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilómetros al Inicio</FormLabel>
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

            {/* Mount Date */}
            <FormField
              control={form.control}
              name="mountDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Montaje</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
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
                      placeholder="Observaciones sobre la asignación..."
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Asignando...
                  </>
                ) : (
                  <>
                    <Truck className="w-4 h-4 mr-2" />
                    Asignar Neumático
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
