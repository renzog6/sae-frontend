// filepath: sae-frontend/components/forms/unit-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UnitSchema, type UnitFormData } from "@/lib/validations/catalog";

export interface UnitFormProps {
  onSubmit: (data: UnitFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<UnitFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function UnitForm({ onSubmit, isLoading = false, defaultValues, isEdit = false, onCancel, error }: UnitFormProps) {
  const form = useForm<UnitFormData>({
    resolver: zodResolver(UnitSchema),
    defaultValues: {
      name: "",
      abbreviation: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">{error}</div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Litro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="abbreviation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abreviatura</FormLabel>
              <FormControl>
                <Input placeholder="Ej. L" {...field} />
              </FormControl>
              <FormDescription>Usa una abreviatura corta y clara.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {isLoading ? (isEdit ? "Guardando..." : "Creando...") : isEdit ? "Guardar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
