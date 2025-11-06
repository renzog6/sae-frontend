// filepath: sae-frontend/components/companies/company-form.tsx
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
import { CompanySchema, type CompanyFormData } from "@/lib/validations/company";
// No se requieren hooks de categorías/ciudades aquí; se gestionan fuera

export interface CompanyFormProps {
  onSubmit: (data: CompanyFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<CompanyFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function CompanyForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: CompanyFormProps) {
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      cuit: "",
      name: "",
      businessName: "",
      information: "",
      address: undefined,
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre comercial" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cuit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CUIT</FormLabel>
                <FormControl>
                  <Input
                    placeholder="30-12345678-9"
                    maxLength={13}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razón social</FormLabel>
                <FormControl>
                  <Input placeholder="Razón social (opcional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
              className="border-amber-500 text-amber-600 hover:bg-amber-50"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="text-white bg-amber-500 hover:bg-amber-600"
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
