// filepath: sae-frontend/components/forms/employee-incident-form.tsx
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
  createEmployeeIncidentFormInputSchema,
  type EmployeeIncidentFormData,
  type EmployeeIncidentFormInput,
} from "@/lib/validations/employeeIncident";
import { EmployeeIncidentType } from "@/lib/types/domain/history";
import { employeeIncidentTypeLabels } from "@/lib/constants";

export interface EmployeeIncidentFormProps {
  onSubmit: (data: EmployeeIncidentFormInput) => void;
  isLoading?: boolean;
  defaultValues?: Partial<EmployeeIncidentFormInput>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function EmployeeIncidentForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: EmployeeIncidentFormProps) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const form = useForm<EmployeeIncidentFormInput>({
    resolver: zodResolver(createEmployeeIncidentFormInputSchema),
    defaultValues: {
      type: EmployeeIncidentType.SICK_LEAVE,
      description: "",
      startDate: "",
      endDate: "",
      createdAt: today,
      doctorNote: false,
      paidLeave: false,
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

        {/* Tipo de Incidente */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Incidente</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) =>
                  field.onChange(value as EmployeeIncidentType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EmployeeIncidentType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {employeeIncidentTypeLabels[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe el incidente..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fecha del Incidente */}
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha del Incidente</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fechas */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Inicio</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Fin</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="doctorNote"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Certificado Médico</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    ¿Tiene certificado médico?
                  </p>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paidLeave"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Licencia Pagada</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    ¿Es una licencia paga?
                  </p>
                </div>
              </FormItem>
            )}
          />
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
