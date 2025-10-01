// filepath: sae-frontend/components/forms/employee-vacation-form.tsx
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  VacationFormSchema,
  type EmployeeVacationFormData,
  type EmployeeVacationFormInput,
} from "@/lib/validations/employeeVacation";

export interface EmployeeVacationFormProps {
  onSubmit: (data: EmployeeVacationFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<EmployeeVacationFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
  availableYears?: number[];
}

export function EmployeeVacationForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
  availableYears = [],
}: EmployeeVacationFormProps) {
  // IMPORTANT: use the schema INPUT type here to match zodResolver's expected FieldValues
  const form = useForm<EmployeeVacationFormInput>({
    resolver: zodResolver(VacationFormSchema),
    defaultValues: {
      detail: "",
      days: 1,
      year: availableYears[0] || new Date().getFullYear(),
      startDate: "",
      settlementDate: new Date().toISOString().slice(0, 10),
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      {/* Bridge input type to output type for consumer onSubmit */}
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(values as unknown as EmployeeVacationFormData)
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
          name="settlementDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de liquidación</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalle</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Notas opcionales..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Días</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value, 10) || 1)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de inicio</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(parseInt(value, 10))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona año" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                  {!availableYears.length && (
                    <SelectItem value={new Date().getFullYear().toString()}>
                      {new Date().getFullYear()}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
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
