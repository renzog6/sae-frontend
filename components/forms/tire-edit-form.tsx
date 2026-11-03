// filepath: sae-frontend/components/forms/tire-edit-form.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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

import { useUpdateTire } from "@/lib/hooks/useTires";
import { TireStatus } from "@/lib/types/shared/enums";
import {
  updateTireSchema,
  type UpdateTireFormData,
} from "@/lib/validations/tire";
import type { Tire, UpdateTireDto } from "@/lib/types/domain/tire";

interface TireEditFormProps {
  tire: Tire;
  tireId: number;
  onSuccess?: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  IN_STOCK: "En Stock",
  IN_USE: "En Uso",
  UNDER_REPAIR: "En Reparación",
  RECAP: "Recapado",
  DISCARDED: "Descartado",
};

export function TireEditForm({ tire, tireId, onSuccess }: TireEditFormProps) {
  const router = useRouter();
  const updateTireMutation = useUpdateTire();
  const [formError, setFormError] = useState<string | null>(null);

  const defaultValues = useMemo(
    () => ({
      serialNumber: tire.serialNumber,
      status: tire.status,
      totalKm: tire.totalKm || undefined,
      createdAt: tire.createdAt,
    }) as UpdateTireFormData,
    [tire]
  );

  const form = useForm<UpdateTireFormData>({
    resolver: zodResolver(updateTireSchema),
    defaultValues,
    values: defaultValues,
  });

  async function handleSubmit(data: UpdateTireFormData) {
    setFormError(null);
    try {
      const { createdAt, ...updateData } = data;
      const cleanData = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v !== undefined)
      );
      await updateTireMutation.mutateAsync({
        id: tireId,
        dto: cleanData as UpdateTireDto,
      });
      onSuccess ? onSuccess() : router.back();
    } catch (e: any) {
      setFormError((e as Error)?.message || "Error al guardar cambios del neumático");
    }
  }

  return (
    <div className="space-y-6">
      {formError && (
        <div className="p-3 text-sm text-destructive border border-destructive/30 rounded-md bg-destructive/10">
          {formError}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Serie</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Número de serie único"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <select
                      className="w-full h-10 px-2 border rounded border-input text-foreground bg-background"
                      value={field.value ?? TireStatus.IN_STOCK}
                      onChange={(e) =>
                        field.onChange(e.target.value as TireStatus)
                      }
                    >
                      {Object.values(TireStatus).map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABELS[status] ?? status}
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
              name="totalKm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilómetros Totales</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Km recorridos"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Creación</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? (field.value as string).substring(0, 10)
                          : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            ? new Date(e.target.value).toISOString()
                            : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Read-only information */}
          <div className="pt-4 border-t border-border">
            <h3 className="mb-3 text-sm font-medium text-foreground">
              Información de Solo Lectura
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Fecha de Creación
                </label>
                <Input
                  value={new Date(tire.createdAt).toLocaleDateString()}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Marca
                </label>
                <Input
                  value={tire.model?.brand?.name || "No especificada"}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Modelo
                </label>
                <Input
                  value={tire.model?.name || "No especificado"}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="md:col-span-3">
                <label className="text-sm font-medium text-muted-foreground">
                  Medida
                </label>
                <Input
                  value={tire.model?.size?.mainCode || "No especificada"}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={updateTireMutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={updateTireMutation.isPending}>
              {updateTireMutation.isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
