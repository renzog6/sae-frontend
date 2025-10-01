// filepath: sae-frontend/components/forms/employee-category-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  EmployeeCategorySchema,
  type EmployeeCategoryFormData,
  type EmployeeCategoryFormInput,
} from "@/lib/validations/employee";

export interface EmployeeCategoryFormProps {
  onSubmit: (data: EmployeeCategoryFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<EmployeeCategoryFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function EmployeeCategoryForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: EmployeeCategoryFormProps) {
  // IMPORTANT: use the schema INPUT type here to match zodResolver's expected FieldValues
  const form = useForm<EmployeeCategoryFormInput>({
    resolver: zodResolver(EmployeeCategorySchema),
    defaultValues: {
      name: "",
      code: "",
      information: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      {/* Bridge input type to output type for consumer onSubmit */}
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(values as unknown as EmployeeCategoryFormData)
        )}
        className="space-y-4"
      >
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
                <Input placeholder="Ej. Administrativo" {...field} />
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
                <Input placeholder="Ej. ADM" {...field} />
              </FormControl>
              <FormDescription>Identificador único legible.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="information"
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
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
