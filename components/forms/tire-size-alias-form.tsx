// filepath: sae-frontend/components/forms/tire-size-alias-form.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const tireSizeAliasSchema = z.object({
  aliasCode: z.string().min(1, "El código alternativo es requerido"),
  tireSizeId: z.number().int().positive("ID de tamaño inválido"),
});

type TireSizeAliasFormData = z.infer<typeof tireSizeAliasSchema>;

export interface TireSizeAliasFormProps {
  onSubmit: (data: TireSizeAliasFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<TireSizeAliasFormData>;
  isEdit?: boolean;
  error?: string | null;
}

export function TireSizeAliasForm({
  onSubmit,
  onCancel,
  isLoading = false,
  defaultValues,
  isEdit = false,
  error,
}: TireSizeAliasFormProps) {
  const form = useForm<TireSizeAliasFormData>({
    resolver: zodResolver(tireSizeAliasSchema),
    defaultValues: {
      aliasCode: defaultValues?.aliasCode || "",
      tireSizeId: defaultValues?.tireSizeId || 0,
    },
  });

  const handleSubmit = (data: TireSizeAliasFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="aliasCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código alternativo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: 14.9R46"
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
          name="tireSizeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID del tamaño</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                  disabled={true} // Siempre disabled, se setea automáticamente
                  className="bg-gray-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div className="p-2 text-sm text-red-600 rounded bg-red-50">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
