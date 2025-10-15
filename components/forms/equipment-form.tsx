// filepath: sae-frontend/components/forms/equipment-form.tsx
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
import { Checkbox } from "@/components/ui/checkbox";
import { EquipmentStatus } from "@/types/enums";
import {
  equipmentFormSchema,
  type EquipmentFormData,
} from "@/lib/validations/equipment";
import {
  useEquipmentCategories,
  useEquipmentTypes,
  useEquipmentModels,
  useCreateEquipment,
} from "@/lib/hooks/useEquipment";
import { useCompanies } from "@/lib/hooks/useCompanies";
import { useToast } from "@/components/ui/toaster";

interface EquipmentFormProps {
  accessToken: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  defaultValues?: Partial<EquipmentFormData>;
  isEdit?: boolean;
}

export function EquipmentForm({
  accessToken,
  onSuccess,
  onCancel,
  defaultValues,
  isEdit = false,
}: EquipmentFormProps) {
  const { toast } = useToast();
  const { data: categories = [] } = useEquipmentCategories(accessToken);
  const { data: companies = [] } = useCompanies(accessToken);

  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentFormSchema),
    defaultValues: {
      internalCode: "",
      name: "",
      description: "",
      observation: "",
      year: undefined,
      licensePlate: "",
      chassis: "",
      engine: "",
      color: "",
      information: "",
      diesel: false,
      status: "ACTIVE",
      companyId: 1, // Default company ID for now
      categoryId: undefined,
      typeId: undefined,
      modelId: undefined,
      ...defaultValues,
    },
  });

  const selectedCategoryId = form.watch("categoryId");
  const selectedTypeId = form.watch("typeId");

  const { data: typesResponse } = useEquipmentTypes(accessToken, {
    limit: 100,
  });
  const types =
    typesResponse?.data.filter(
      (type) => !selectedCategoryId || type.categoryId === selectedCategoryId
    ) || [];

  const { data: modelsResponse } = useEquipmentModels(accessToken, {
    limit: 100,
  });
  const models =
    modelsResponse?.data.filter(
      (model) => !selectedTypeId || model.typeId === selectedTypeId
    ) || [];

  const { mutate: createEquipment, isPending } =
    useCreateEquipment(accessToken);

  const handleSubmit = (data: EquipmentFormData) => {
    const submitData = {
      ...data,
      status: data.status as EquipmentStatus,
    };
    createEquipment(submitData, {
      onSuccess: () => {
        toast({
          title: "Equipo creado",
          description: "El equipo se ha registrado correctamente.",
          variant: "success",
        });
        onSuccess?.();
      },
      onError: (error: any) => {
        toast({
          title: "Error al crear equipo",
          description: error?.message || "Intenta nuevamente.",
          variant: "error",
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Información básica */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="internalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código Interno</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: EQ-00123"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Camión Volvo FH"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Clasificación */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                    form.setValue("typeId", undefined);
                    form.setValue("modelId", undefined);
                  }}
                  defaultValue={field.value?.toString()}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                    form.setValue("modelId", undefined);
                  }}
                  defaultValue={field.value?.toString()}
                  disabled={isPending || !selectedCategoryId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="modelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                  disabled={isPending || !selectedTypeId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona modelo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id.toString()}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Identificación */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: ABC-123"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chassis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chasis</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número de chasis"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Más identificación */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="engine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número de motor"
                    {...field}
                    disabled={isPending}
                  />
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
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2023"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Blanco"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Estado y empresa */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Activo</SelectItem>
                    <SelectItem value="INACTIVE">Inactivo</SelectItem>
                    <SelectItem value="MAINTENANCE">
                      En mantenimiento
                    </SelectItem>
                    <SelectItem value="RETIRED">Retirado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona empresa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem
                        key={company.id}
                        value={company.id.toString()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Combustible */}
        <FormField
          control={form.control}
          name="diesel"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Combustible diésel</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Descripciones */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción general del equipo..."
                    className="resize-none"
                    rows={3}
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Observaciones adicionales..."
                    className="resize-none"
                    rows={3}
                    {...field}
                    disabled={isPending}
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
              <FormLabel>Información Adicional</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Información adicional..."
                  className="resize-none"
                  rows={2}
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botones */}
        <div className="flex justify-end gap-2 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creando..." : "Crear Equipo"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
