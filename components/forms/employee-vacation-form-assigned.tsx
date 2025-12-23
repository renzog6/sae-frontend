// filepath: sae-frontend/components/forms/employee-vacation-form-assigned.tsx
"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createVacationFormInputAssignedSchema,
  type EmployeeVacationFormData,
  type EmployeeVacationFormAssignedInput,
} from "@/lib/validations/employee-vacation";
import { Label } from "@/components/ui/label";
import type { AvailableYear } from "@/lib/types/domain/employee";

export interface EmployeeVacationFormProps {
  onSubmit: (data: EmployeeVacationFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<EmployeeVacationFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
  availableYears?: AvailableYear[];
}

export function EmployeeVacationFormAssigned({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
  availableYears = [],
}: EmployeeVacationFormProps) {
  // IMPORTANT: use the schema INPUT type here to match zodResolver's expected FieldValues
  const form = useForm<EmployeeVacationFormAssignedInput>({
    resolver: zodResolver(
      createVacationFormInputAssignedSchema(availableYears, isEdit)
    ),
    defaultValues: {
      detail: "Vacaciones",
      days: 1,
      year: availableYears[0]?.year || new Date().getFullYear(),
      startDate: "",
      settlementDate: new Date().toISOString().slice(0, 10),
      ...defaultValues,
    },
  });

  const watchedYear = form.watch("year");

  useEffect(() => {
    form.setValue("detail", `Vacaciones ${watchedYear}`);
  }, [watchedYear, form]);

  return (
    <Form {...form}>
      {/* Bridge input type to output type for consumer onSubmit */}
      <form
        onSubmit={form.handleSubmit((values) => {
          // seteás valores adicionales antes de enviar
          form.setValue("settlementDate", `10-01-${values.year}`);
          form.setValue("startDate", `10-01-${values.year}`);

          onSubmit({
            ...values,
            settlementDate: form.getValues("settlementDate"),
            startDate: form.getValues("startDate"),
          } as unknown as EmployeeVacationFormData);
        })}
        className="space-y-4"
      >
        {error && (
          <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
            {error}
          </div>
        )}

        <div className="flex gap-12 justify-self-start">
          <Label className="mt-1 text-gray-500">
            Fecha de inicio de la vacaciones es a partir del 01/10/{watchedYear}
          </Label>
        </div>

        <div className="flex gap-12 justify-self-start">
          {/* Año */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex flex-col w-32">
                <FormLabel>Año</FormLabel>
                <Input
                  className="w-30"
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value, 10) || 1)
                  }
                />
              </FormItem>
            )}
          />

          {/* Días */}
          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Días</FormLabel>
                <FormControl>
                  <Input
                    className="w-30"
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10) || 1)
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.year && (
          <p className="text-sm text-red-600">
            {form.formState.errors.year.message}
          </p>
        )}
        {/* Detalle */}
        <div>
          <FormItem>
            <FormLabel>Detalle</FormLabel>
            <FormControl>
              <Input type="text" disabled value={`Vacaciones ${watchedYear}`} />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

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
