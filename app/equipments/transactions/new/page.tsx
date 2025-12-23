//filepath: app/equipments/transactions/new/page.tsx
"use client";

import { useState, ChangeEvent, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Check,
  ChevronLeft,
  ChevronsUpDown,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useCreateEquipmentTransaction } from "@/lib/hooks/useEquipmentTransactions";
import { useEquipments } from "@/lib/hooks/useEquipments";
import { useCompanies } from "@/lib/hooks/useCompanies";
import {
  EquipmentTransactionType,
  Currency,
  EquipmentStatus,
  Equipment,
  Company,
} from "@/lib/types";
import { routes } from "@/lib/routes";
import { toast } from "sonner";

// Schema definition
const formSchema = z.object({
  type: z.nativeEnum(EquipmentTransactionType),
  date: z.date(),
  equipmentId: z.number().min(1, "Seleccione un equipo"),
  companyId: z.number().min(1, "Seleccione una empresa"),
  amount: z.number().min(0.01, "El monto debe ser mayor a 0"),
  currency: z.nativeEnum(Currency),
  exchangeRate: z.number().optional().nullable(),
  observation: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewTransactionPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] =
    useState<EquipmentTransactionType | null>(null);
  const [openEquipments, setOpenEquipments] = useState(false);
  const [openCompanies, setOpenCompanies] = useState(false);

  // Hooks
  const { mutateAsync: createTransaction, isPending } =
    useCreateEquipmentTransaction();

  const { useGetAll: useGetAllEquipments } = useEquipments();
  const { data: equipmentsResponse } = useGetAllEquipments({
    limit: 0,
  });

  const rawEquipments: Equipment[] = equipmentsResponse?.data ?? [];
  const equipments = useMemo(() => {
    if (selectedType === EquipmentTransactionType.SALE) {
      return rawEquipments.filter(
        (e: Equipment) => e.status === EquipmentStatus.ACTIVE
      );
    }
    return rawEquipments.filter(
      (e: Equipment) => e.status !== EquipmentStatus.ACTIVE
    );
  }, [rawEquipments, selectedType]);

  const { data: companies } = useCompanies({ limit: 0 });
  const companiesList: Company[] = companies ?? [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: EquipmentTransactionType.PURCHASE,
      date: new Date(),
      currency: Currency.ARS,
      amount: 0,
      equipmentId: 0,
      companyId: 0,
      exchangeRate: null,
      observation: "",
    },
  });

  // Set exchangeRate to 1 when currency is ARS
  useEffect(() => {
    const currency = form.watch("currency");
    if (currency === Currency.ARS) {
      form.setValue("exchangeRate", 1);
    }
  }, [form.watch("currency")]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await createTransaction({
        equipmentId: data.equipmentId,
        companyId: data.companyId,
        type: data.type,
        date: data.date.toISOString(),
        amount: data.amount,
        currency: data.currency,
        exchangeRate: data.exchangeRate ?? undefined,
        observation: data.observation ?? undefined,
      });
      toast.success("Transacción creada exitosamente");
      router.push(routes.equipments.transactions.root);
    } catch (error: any) {
      console.error(error);
      toast.error("Error al crear la transacción");
    }
  };

  const handleTypeSelect = (type: EquipmentTransactionType) => {
    setSelectedType(type);
    form.setValue("type", type);
    form.setValue("equipmentId", 0);
    // If it's a purchase, ARS is common, if it's a sale too.
    // But let's reset to ensure clean state
  };

  if (!selectedType) {
    return (
      <div className="container max-w-4xl py-10 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Nueva Transacción
            </h2>
            <p className="text-muted-foreground">
              Seleccione el tipo de operación que desea registrar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            className="transition-colors cursor-pointer hover:border-primary hover:bg-muted/50"
            onClick={() => handleTypeSelect(EquipmentTransactionType.PURCHASE)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
                Compra
              </CardTitle>
              <CardDescription>
                Registrar compra o ingreso de un equipo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-balance">
                Seleccione esta opción para registrar la adquisición de un nuevo
                equipo. Listará equipos que no están activos actualmente.
              </p>
            </CardContent>
          </Card>

          <Card
            className="transition-colors cursor-pointer hover:border-primary hover:bg-muted/50"
            onClick={() => handleTypeSelect(EquipmentTransactionType.SALE)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-green-500" />
                Venta
              </CardTitle>
              <CardDescription>
                Registrar venta o salida de un equipo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-balance">
                Seleccione esta opción para registrar la venta de un equipo de
                la flota. Solo mostrará equipos que están actualmente activos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {selectedType === EquipmentTransactionType.PURCHASE
              ? "Registrar Compra"
              : "Registrar Venta"}
          </h2>
          <p className="text-muted-foreground">
            Complete los datos de la transacción
          </p>
        </div>
        <Button variant="ghost" onClick={() => setSelectedType(null)}>
          Cambiar tipo
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const date = new Date(e.target.value);
                          if (!isNaN(date.getTime())) {
                            field.onChange(date);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipmentId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Equipo</FormLabel>
                    <Popover
                      open={openEquipments}
                      onOpenChange={setOpenEquipments}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? (equipments.find(
                                  (e: Equipment) => e.id === field.value
                                )?.type?.name || "EQUIP-???") +
                                " - " +
                                (equipments.find(
                                  (e: Equipment) => e.id === field.value
                                )?.name || "Sin nombre")
                              : "Seleccione un equipo"}
                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Buscar equipo..." />
                          <CommandList>
                            <CommandEmpty>
                              No se encontraron equipos.
                            </CommandEmpty>
                            <CommandGroup>
                              {equipments.map((equipment: Equipment) => (
                                <CommandItem
                                  value={
                                    (equipment.name ?? "") +
                                    " " +
                                    (equipment.internalCode ?? "")
                                  }
                                  key={equipment.id}
                                  onSelect={() => {
                                    form.setValue("equipmentId", equipment.id);
                                    setOpenEquipments(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      equipment.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {equipment.internalCode} - {equipment.name}
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

              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      {selectedType === EquipmentTransactionType.PURCHASE
                        ? "Proveedor"
                        : "Cliente"}
                    </FormLabel>
                    <Popover
                      open={openCompanies}
                      onOpenChange={setOpenCompanies}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? companiesList.find((c) => c.id === field.value)
                                  ?.name
                              : "Seleccione una empresa"}
                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Buscar empresa..." />
                          <CommandList>
                            <CommandEmpty>
                              No se encontraron empresas.
                            </CommandEmpty>
                            <CommandGroup>
                              {companiesList.map((company: Company) => (
                                <CommandItem
                                  value={company.name}
                                  key={company.id}
                                  onSelect={() => {
                                    form.setValue("companyId", company.id);
                                    setOpenCompanies(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      company.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {company.name}
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

              {/* Amount & Currency */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monto</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          value={field.value.toString()}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Moneda</FormLabel>
                      <Select
                        onValueChange={(val: string) =>
                          field.onChange(val as Currency)
                        }
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione moneda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={Currency.ARS}>ARS</SelectItem>
                          <SelectItem value={Currency.USD}>USD</SelectItem>
                          <SelectItem value={Currency.EUR}>EUR</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Exchange Rate (Conditional) */}
              {form.watch("currency") !== Currency.ARS && (
                <FormField
                  control={form.control}
                  name="exchangeRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Cambio</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.000001"
                          value={field.value?.toString() || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : parseFloat(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Observation */}
              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observación</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detalles adicionales..."
                        className="resize-none"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Guardando..." : "Guardar Transacción"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
