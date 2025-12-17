// filepath: sae-frontend/components/forms/tire-model-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import {
  createTireModelSchema,
  type CreateTireModelFormData,
} from "@/lib/validations/tire";
import { useBrands } from "@/lib/hooks/useCatalogs";
import { Brand } from "@/lib/types/shared/catalogs";
import { useTireSizes } from "@/lib/hooks/useTires";

interface TireModelFormProps {
  onSubmit: (data: CreateTireModelFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<CreateTireModelFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function TireModelForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: TireModelFormProps) {
  const { data: brandsResponse } = useBrands().useGetAll();
  const brands = brandsResponse?.data || [];
  const { useGetAll } = useTireSizes();
  const { data: sizesResponse } = useGetAll({
    page: 1,
    limit: 100,
  });

  const sizes = Array.isArray(sizesResponse)
    ? sizesResponse
    : (sizesResponse as any)?.data ?? [];

  const form = useForm<CreateTireModelFormData>({
    resolver: zodResolver(createTireModelSchema),
    defaultValues: {
      brandId: undefined,
      sizeId: undefined,
      name: "",
      loadIndex: undefined,
      speedSymbol: "",
      plyRating: "",
      treadPattern: "",
      information: "",
      ...defaultValues,
    },
  });

  const handleSubmit = (data: CreateTireModelFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 rounded-md bg-red-50">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca *</FormLabel>
                <FormControl>
                  <Combobox
                    options={
                      brands?.map((brand: Brand) => ({
                        value: brand.id.toString(),
                        label: brand.name,
                      })) || []
                    }
                    value={field.value?.toString()}
                    onValueChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                    placeholder="Selecciona marca"
                    searchPlaceholder="Buscar marca..."
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medida *</FormLabel>
                <FormControl>
                  <Combobox
                    options={
                      sizes?.map((size: any) => ({
                        value: size.id.toString(),
                        label: size.mainCode,
                      })) || []
                    }
                    value={field.value?.toString()}
                    onValueChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                    placeholder="Selecciona medida"
                    searchPlaceholder="Buscar medida..."
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del modelo *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: Agribib"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="loadIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Índice de carga</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="142"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="speedSymbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Símbolo de velocidad</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: A8, B, L"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="plyRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: 8PR"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="treadPattern"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dibujo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: R-1W, LSW"
                    {...field}
                    disabled={isLoading}
                  />
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
              <FormLabel>Información adicional</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Información opcional sobre el modelo..."
                  className="resize-none"
                  rows={3}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
