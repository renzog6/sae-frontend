// filepath: sae-frontend/components/forms/business-subcategory-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  BusinessSubcategorySchema,
  type BusinessSubcategoryFormData,
} from "@/lib/validations/company";
import { useBusinessCategories } from "@/lib/hooks/useCompanies";
import { useSession } from "next-auth/react";

export interface BusinessSubcategoryFormProps {
  onSubmit: (data: BusinessSubcategoryFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<BusinessSubcategoryFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function BusinessSubcategoryForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: BusinessSubcategoryFormProps) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const { data: categoriesResponse } = useBusinessCategories();
  const categories = categoriesResponse || [];

  const form = useForm<BusinessSubcategoryFormData>({
    resolver: zodResolver(BusinessSubcategorySchema),
    defaultValues: {
      name: "",
      description: "",
      businessCategoryId:
        defaultValues?.businessCategoryId ?? categories[0]?.id ?? 0,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
            {error}
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Transporte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <select
                  className="w-full h-10 px-2 border rounded"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  <option value={0} disabled>
                    Seleccionar categoría
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
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
              <FormLabel>Información</FormLabel>
              <FormControl>
                <Textarea placeholder="Notas opcionales..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-2">
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
          <Button
            type="submit"
            disabled={isLoading}
            className="text-white bg-emerald-600 hover:bg-emerald-700"
          >
            {isLoading
              ? isEdit
                ? "Guardando..."
                : "Creando..."
              : isEdit
              ? "Guardar"
              : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
