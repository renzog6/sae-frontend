// filepath: sae-frontend/components/forms/tire-size-form.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createTireSizeSchema,
  type CreateTireSizeFormData,
} from "@/lib/validations/tire";

interface TireSizeFormProps {
  onSubmit: (data: CreateTireSizeFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<CreateTireSizeFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function TireSizeForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: TireSizeFormProps) {
  const form = useForm<CreateTireSizeFormData>({
    resolver: zodResolver(createTireSizeSchema),
    defaultValues: {
      mainCode: "",
      width: undefined,
      aspectRatio: undefined,
      rimDiameter: undefined,
      construction: "",
      loadIndex: undefined,
      speedSymbol: "",
      information: "",
      ...defaultValues,
    },
  });

  const handleSubmit = (data: CreateTireSizeFormData) => {
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

        <FormField
          control={form.control}
          name="mainCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código principal *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: 380/90R46"
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
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ancho</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="380"
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
            name="aspectRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relación de aspecto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="90"
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rimDiameter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diámetro de llanta</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="46"
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
            name="construction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Construcción</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona construcción" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="R">Radial (R)</SelectItem>
                    <SelectItem value="D">Diagonal (D)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="information"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Información adicional</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Información opcional sobre el tamaño..."
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
