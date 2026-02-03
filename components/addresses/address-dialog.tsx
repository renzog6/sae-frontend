// filepath: sae-frontend/components/addresses/address-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form as UIForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddressSchema,
  type AddressFormData,
} from "@/lib/validations/location";
import {
  useProvinces,
  useCities,
} from "@/lib/hooks/useLocations";
import type { Province, City } from "@/lib/types/shared/location";
import { useMemo, useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface AddressDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (data: AddressFormData) => void;
  initial?: Partial<AddressFormData>;

  onDelete?: () => void;
}

export function AddressDialog({
  open,
  onOpenChange,
  initial,
  onSave,

  onDelete,
}: AddressDialogProps) {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      street: "",
      number: "",
      floor: "",
      apartment: "",
      neighborhood: "",
      reference: "",
      cityId: initial?.cityId ?? 1,
      ...initial,
    },
  });

  // Reset form values when editing a different address or when initial changes
  useEffect(() => {
    form.reset({
      street: initial?.street ?? "",
      number: initial?.number ?? "",
      floor: initial?.floor ?? "",
      apartment: initial?.apartment ?? "",
      neighborhood: initial?.neighborhood ?? "",
      reference: initial?.reference ?? "",
      cityId: (initial?.cityId as number | undefined) ?? 1,
    });
  }, [initial, form]);

  // Provincias y Ciudades
  const { useGetAll: useGetProvinces } = useProvinces();
  const { data: provincesResponse, isLoading: provLoading } = useGetProvinces();
  const provinces = (provincesResponse?.data || []) as Province[];

  const { useGetAll: useGetCities } = useCities();
  const { data: citiesResponse, isLoading: citiesLoading } = useGetCities();
  const allCities = (citiesResponse?.data || []) as City[];

  // Provincia seleccionada (no forma parte del AddressSchema)
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );

  // Derivar provincia si tenemos una ciudad inicial
  useEffect(() => {
    if (initial?.cityId && allCities.length > 0) {
      const city = allCities.find((c: City) => c.id === initial.cityId);
      if (city?.province) setSelectedProvinceId(city.province.id);
    }
  }, [initial?.cityId, allCities]);

  const filteredCities = useMemo(
    () =>
      selectedProvinceId
        ? allCities.filter((c: City) => c.province?.id === selectedProvinceId)
        : [],
    [allCities, selectedProvinceId]
  );

  function submit(data: AddressFormData) {
    onSave(data);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            {initial?.cityId ? "Editar dirección" : "Agregar dirección"}
          </DialogTitle>
        </DialogHeader>
        <UIForm {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calle</FormLabel>
                    <FormControl>
                      <Input placeholder="Calle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Piso</FormLabel>
                    <FormControl>
                      <Input placeholder="Piso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Depto</FormLabel>
                    <FormControl>
                      <Input placeholder="Departamento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Barrio</FormLabel>
                    <FormControl>
                      <Input placeholder="Barrio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Referencia</FormLabel>
                    <FormControl>
                      <Input placeholder="Referencia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* shadcn Combobox Provincias */}
              <FormItem>
                <FormLabel>Provincia</FormLabel>
                <Popover open={provinceOpen} onOpenChange={setProvinceOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={provinceOpen}
                      className="justify-between w-full"
                    >
                      {selectedProvinceId
                        ? provinces.find(
                          (p: Province) => p.id === selectedProvinceId
                        )?.name
                        : provLoading
                          ? "Cargando..."
                          : "Selecciona una provincia"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                    <Command>
                      <CommandInput placeholder="Buscar provincia..." />
                      <CommandList>
                        <CommandEmpty>
                          No se encontraron provincias
                        </CommandEmpty>
                        <CommandGroup>
                          {provinces.map((p: Province) => (
                            <CommandItem
                              key={p.id}
                              onSelect={() => {
                                setSelectedProvinceId(p.id);
                                // Al cambiar de provincia, limpiamos ciudad
                                form.setValue(
                                  "cityId",
                                  undefined as unknown as number
                                );
                                setCityOpen(false);
                                setProvinceOpen(false);
                              }}
                            >
                              {p.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>

              {/* shadcn Combobox Ciudades */}
              <FormField
                control={form.control}
                name="cityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <Popover open={cityOpen} onOpenChange={setCityOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          role="combobox"
                          aria-expanded={cityOpen}
                          className="justify-between w-full"
                          disabled={
                            !selectedProvinceId || provLoading || citiesLoading
                          }
                        >
                          {field.value
                            ? filteredCities.find(
                              (c: City) => c.id === field.value
                            )?.name
                            : !selectedProvinceId
                              ? "Selecciona una provincia primero"
                              : citiesLoading
                                ? "Cargando ciudades..."
                                : "Selecciona una ciudad"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                        <Command>
                          <CommandInput placeholder="Buscar ciudad..." />
                          <CommandList>
                            <CommandEmpty>
                              {selectedProvinceId
                                ? "No se encontraron ciudades"
                                : "Selecciona una provincia"}
                            </CommandEmpty>
                            <CommandGroup>
                              {filteredCities.map((c: City) => (
                                <CommandItem
                                  key={c.id}
                                  onSelect={() => {
                                    field.onChange(c.id);
                                    setCityOpen(false);
                                  }}
                                >
                                  {c.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex justify-between gap-2">
              <div>
                {onDelete && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="text-white bg-red-500 hover:bg-red-600"
                    onClick={() => {
                      if (
                        confirm(
                          "¿Eliminar esta dirección? Esta acción no se puede deshacer."
                        )
                      ) {
                        onDelete();
                        onOpenChange(false);
                      }
                    }}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="text-white bg-amber-500 hover:bg-amber-600"
                >
                  Guardar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </UIForm>
      </DialogContent>
    </Dialog>
  );
}
