// filepath: sae-frontend/components/forms/create-tire-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createTireSchema, CreateTireFormData } from "@/lib/validations/tire";
import { TireModel } from "@/lib/types/tire";
import { TireStatus, TirePosition } from "@/lib/types/enums";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateTireFormProps {
  onSubmit: (
    data: CreateTireFormData | { tires: CreateTireFormData[] }
  ) => void;
  onCancel: () => void;
  tireModels: TireModel[];
  isLoading?: boolean;
}

export function CreateTireForm({
  onSubmit,
  onCancel,
  tireModels,
  isLoading = false,
}: CreateTireFormProps) {
  const [bulkCreate, setBulkCreate] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [modelOpen, setModelOpen] = useState(false);

  const form = useForm<CreateTireFormData>({
    resolver: zodResolver(createTireSchema),
    defaultValues: {
      serialNumber: "",
      modelId: undefined,
      position: "UNKNOWN",
      status: "IN_STOCK",
      totalKm: 0,
    },
    mode: "onChange", // Enable real-time validation
  });

  const selectedModel = tireModels.find(
    (model) => model.id === form.watch("modelId")
  );

  const generateRandomSerial = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = (data: CreateTireFormData) => {
    if (bulkCreate) {
      // Generate multiple tires with random serials
      const tires: CreateTireFormData[] = [];
      for (let i = 0; i < quantity; i++) {
        tires.push({
          ...data,
          serialNumber: generateRandomSerial(),
        });
      }
      onSubmit({ tires });
    } else {
      onSubmit(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Bulk Creation Option */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="bulk-create"
            checked={bulkCreate}
            onCheckedChange={(checked) => setBulkCreate(!!checked)}
            disabled={isLoading}
          />
          <label
            htmlFor="bulk-create"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Crear múltiples neumáticos
          </label>
        </div>

        {bulkCreate && (
          <div className="grid grid-cols-1 gap-6 p-4 rounded-lg md:grid-cols-2 bg-gray-50">
            <div>
              <label className="text-sm font-medium">Cantidad a crear</label>
              <Input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                disabled={isLoading}
                className="mt-1"
              />
              <p className="mt-1 text-xs text-gray-500">
                Se generarán códigos de serie aleatorios automáticamente
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Serial Number */}
          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Serie {!bulkCreate ? "*" : ""}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      bulkCreate
                        ? "Se generará automáticamente"
                        : "Ej: ABC123456"
                    }
                    {...field}
                    disabled={isLoading || bulkCreate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tire Model */}
          <FormField
            control={form.control}
            name="modelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo de Neumático *</FormLabel>
                <Popover open={modelOpen} onOpenChange={setModelOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={modelOpen}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isLoading}
                      >
                        {selectedModel
                          ? `${selectedModel.brand.name} - ${selectedModel.name} (${selectedModel.size.mainCode})`
                          : "Seleccionar modelo"}
                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar modelo..." />
                      <CommandEmpty>No se encontraron modelos.</CommandEmpty>
                      <CommandGroup>
                        {tireModels.map((model) => (
                          <CommandItem
                            key={model.id}
                            value={`${model.brand.name} ${model.name} ${model.size.mainCode}`}
                            onSelect={() => {
                              form.setValue("modelId", model.id);
                              setModelOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                model.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {model.brand.name} - {model.name} (
                            {model.size.mainCode})
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IN_STOCK">En Stock</SelectItem>
                    <SelectItem value="IN_USE">En Uso</SelectItem>
                    <SelectItem value="UNDER_REPAIR">En Reparación</SelectItem>
                    <SelectItem value="RECAP">Recapado</SelectItem>
                    <SelectItem value="DISCARDED">Descartado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posición</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar posición (opcional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DI">Delantero Izquierdo</SelectItem>
                    <SelectItem value="DD">Delantero Derecho</SelectItem>
                    <SelectItem value="E1I">Eje 1 Izquierdo</SelectItem>
                    <SelectItem value="E1D">Eje 1 Derecho</SelectItem>
                    <SelectItem value="E2I">Eje 2 Izquierdo</SelectItem>
                    <SelectItem value="E2D">Eje 2 Derecho</SelectItem>
                    <SelectItem value="E3I">Eje 3 Izquierdo</SelectItem>
                    <SelectItem value="E3D">Eje 3 Derecho</SelectItem>
                    <SelectItem value="E4I">Eje 4 Izquierdo</SelectItem>
                    <SelectItem value="E4D">Eje 4 Derecho</SelectItem>
                    <SelectItem value="E1II">
                      Eje 1 Izquierdo Interno
                    </SelectItem>
                    <SelectItem value="E1ID">
                      Eje 1 Izquierdo Externo
                    </SelectItem>
                    <SelectItem value="E1DI">Eje 1 Derecho Interno</SelectItem>
                    <SelectItem value="E1DD">Eje 1 Derecho Externo</SelectItem>
                    <SelectItem value="SPARE">Rueda de Auxilio</SelectItem>
                    <SelectItem value="UNKNOWN">Sin Posición</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Km */}
          <FormField
            control={form.control}
            name="totalKm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kilómetros Totales</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {bulkCreate ? `Crear ${quantity} Neumáticos` : "Crear Neumático"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
