// filepath: sae-frontend/components/forms/city-form.tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CitySchema, CityFormData } from "@/lib/validations/location";
import { useProvinces } from "@/lib/hooks/useLocations";

interface CityFormProps {
  accessToken: string;
  onSubmit: (data: CityFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<CityFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function CityForm({
  accessToken,
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: CityFormProps) {
  const { data: provinces, isLoading: provLoading, error: provError } = useProvinces(accessToken);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CityFormData>({
    resolver: zodResolver(CitySchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nombre de la ciudad</Label>
        <Input id="name" {...register("name")} placeholder="Ej. Buenos Aires" />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="postalCode">Código postal</Label>
        <Input id="postalCode" {...register("postalCode")} placeholder="Ej. C1000" />
        {errors.postalCode && (
          <p className="text-sm text-red-600">{errors.postalCode.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="provinceId">Provincia</Label>
        <Controller
          name="provinceId"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(val) => field.onChange(Number(val))}
              value={field.value ? String(field.value) : undefined}
              disabled={provLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={provLoading ? "Cargando..." : "Selecciona una provincia"} />
              </SelectTrigger>
              <SelectContent>
                {provinces?.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {provError && (
          <p className="text-sm text-red-600">Error al cargar provincias</p>
        )}
        {errors.provinceId && (
          <p className="text-sm text-red-600">{errors.provinceId.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="text-white bg-green-700 hover:bg-green-600">
          {isLoading ? (isEdit ? "Guardando..." : "Creando...") : isEdit ? "Guardar cambios" : "Crear ciudad"}
        </Button>
      </div>
    </form>
  );
}
