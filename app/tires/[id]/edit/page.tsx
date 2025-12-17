// filepath: sae-frontend/app/tires/[id]/edit/page.tsx

"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TiresService } from "@/lib/api/tires";
import { useTires } from "@/lib/hooks/useTires";
import { TireStatus } from "@/lib/types/shared/enums";
import {
  updateTireSchema,
  type UpdateTireFormData,
} from "@/lib/validations/tire";
import { UpdateTireDto } from "@/lib/types/domain/tire";

export default function TireEditPage() {
  const params = useParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const id = useMemo(() => {
    const p = params?.id;
    const asStr = Array.isArray(p) ? p[0] : (p as string | undefined);
    const n = asStr ? Number(asStr) : NaN;
    return Number.isNaN(n) ? undefined : n;
  }, [params]);

  const { useGetById } = useTires();
  // Only call the API if we have a valid ID
  const {
    data: tire,
    isLoading,
    error: fetchError,
  } = id !== undefined
    ? useGetById(id)
    : { data: null, isLoading: false, error: new Error("ID inválido") };

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultValues = useMemo(() => {
    if (!tire) return undefined;
    return {
      serialNumber: tire.serialNumber,
      status: tire.status,
      totalKm: tire.totalKm || undefined,
      createdAt: tire.createdAt,
    } as UpdateTireFormData;
  }, [tire]);

  const form = useForm<UpdateTireFormData>({
    resolver: zodResolver(updateTireSchema),
    defaultValues: defaultValues,
    values: defaultValues,
  });

  async function handleSubmit(data: UpdateTireFormData) {
    // Guard clause: Check if we have a valid ID before proceeding
    if (id === undefined) {
      setError(
        "ID de neumático inválido. No se puede proceder con la actualización."
      );
      return;
    }

    setSaving(true);
    setError(null);
    try {
      // Remove createdAt from data if it's not supposed to be updated
      const { createdAt, ...updateData } = data;
      // Also remove position if it's undefined to avoid type issues
      const cleanData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined)
      );
      await TiresService.update(id, cleanData as UpdateTireDto);
      // refresh caches
      queryClient.invalidateQueries({ queryKey: ["tires"] });
      if (id !== undefined) {
        queryClient.invalidateQueries({ queryKey: ["tires", id] });
      }
      router.back();
    } catch (e: any) {
      setError(e?.message || "Error al guardar cambios del neumático");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Editar Neumático</CardTitle>
          <CardDescription>Cargando datos del neumático...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="w-1/2 h-4 rounded bg-muted"></div>
            <div className="w-1/3 h-4 rounded bg-muted"></div>
            <div className="w-1/4 h-4 rounded bg-muted"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Early return if ID is invalid
  if (id === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Editar Neumático</CardTitle>
          <CardDescription>ID de neumático inválido</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
            El ID proporcionado no es válido. Verifique la URL e intente
            nuevamente.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!tire) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Editar Neumático</CardTitle>
          <CardDescription>Neumático no encontrado</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Neumático</CardTitle>
        <CardDescription>
          Modificar información básica del neumático
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {(error || fetchError) && (
          <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
            {error || (fetchError as any)?.message}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
                        className="w-full h-10 px-2 border rounded border-slate-200 text-slate-700"
                        value={field.value ?? TireStatus.IN_STOCK}
                        onChange={(e) =>
                          field.onChange(e.target.value as TireStatus)
                        }
                      >
                        {Object.values(TireStatus).map((status) => (
                          <option key={status} value={status}>
                            {status === "IN_STOCK"
                              ? "En Stock"
                              : status === "IN_USE"
                              ? "En Uso"
                              : status === "UNDER_REPAIR"
                              ? "En Reparación"
                              : status === "RECAP"
                              ? "Recapado"
                              : status === "DISCARDED"
                              ? "Descartado"
                              : status}
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
            <div className="pt-4 border-t border-slate-200">
              <h3 className="mb-3 text-sm font-medium text-slate-700">
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
                    className="bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Marca
                  </label>
                  <Input
                    value={tire.model?.brand?.name || "No especificada"}
                    readOnly
                    className="bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Modelo
                  </label>
                  <Input
                    value={tire.model?.name || "No especificado"}
                    readOnly
                    className="bg-slate-50"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="text-sm font-medium text-muted-foreground">
                    Medida
                  </label>
                  <Input
                    value={tire.model?.size?.mainCode || "No especificada"}
                    readOnly
                    className="bg-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="text-white bg-emerald-600 hover:bg-emerald-700"
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
