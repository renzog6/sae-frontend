// filepath: sae-frontend/components/forms/equipment-category-form.tsx
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
  equipmentCategoryFormSchema,
  type EquipmentCategoryFormData,
} from "@/lib/validations/equipment";

interface EquipmentCategoryFormProps {
  onSubmit: (data: EquipmentCategoryFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<EquipmentCategoryFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function EquipmentCategoryForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: EquipmentCategoryFormProps) {
  const form = useForm<EquipmentCategoryFormData>({
    resolver: zodResolver(equipmentCategoryFormSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      ...defaultValues,
    },
  });

  const handleSubmit = (data: EquipmentCategoryFormData) => {
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
                  placeholder="Ej: Camiones"
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
                <Input placeholder="Ej: CAM" {...field} disabled={isLoading} />
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
