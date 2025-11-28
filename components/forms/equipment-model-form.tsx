// filepath: sae-frontend/components/forms/equipment-model-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  equipmentModelFormSchema,
  type EquipmentModelFormData,
} from "@/lib/validations/equipment";
import { useEquipmentTypes } from "@/lib/hooks/useEquipments";
import { useBrands } from "@/lib/hooks/useCatalogs";
import { Combobox } from "@/components/ui/combobox";

interface EquipmentModelFormProps {
  onSubmit: (data: EquipmentModelFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<EquipmentModelFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function EquipmentModelForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: EquipmentModelFormProps) {
  const { useGetAll } = useEquipmentTypes();
  const { data: typesData } = useGetAll();
  const types = Array.isArray(typesData)
    ? typesData
    : (typesData as any)?.data || [];
  const { data: brands = [] } = useBrands();

  const form = useForm<EquipmentModelFormData>({
    resolver: zodResolver(equipmentModelFormSchema),
    defaultValues: {
      name: "",
      code: "",
      year: undefined,
      description: "",
      typeId: undefined,
      brandId: undefined,
      ...defaultValues,
    },
  });

  const handleSubmit = (data: EquipmentModelFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 rounded-md bg-red-50">
            {error}
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: Modelo X-2000"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: MX2000"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ej: 2023"
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo *</FormLabel>
              <FormControl>
                <Combobox
                  options={types
                    .filter((type: any) => type.name.toLowerCase().includes(""))
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((type: any) => ({
                      value: type.id.toString(),
                      label: type.name,
                    }))}
                  value={field.value?.toString() || ""}
                  onValueChange={(value) =>
                    field.onChange(value ? Number(value) : undefined)
                  }
                  placeholder="Selecciona un tipo"
                  searchPlaceholder="Buscar tipo..."
                  disabled={isLoading}
                  caseSensitive={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca *</FormLabel>
              <FormControl>
                <Combobox
                  options={brands
                    .filter((brand) => brand.name.toLowerCase().includes(""))
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((brand) => ({
                      value: brand.id.toString(),
                      label: brand.name,
                    }))}
                  value={field.value?.toString() || ""}
                  onValueChange={(value) =>
                    field.onChange(value ? Number(value) : undefined)
                  }
                  placeholder="Selecciona una marca"
                  searchPlaceholder="Buscar marca..."
                  disabled={isLoading}
                  caseSensitive={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción opcional..."
                  className="resize-none"
                  rows={3}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
