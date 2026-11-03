// filepath: sae-frontend/components/forms/equipment-transaction-form.tsx
"use client";

import { ChangeEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";

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

import {
  EquipmentTransactionType,
  Currency,
} from "@/lib/types";
import { Equipment } from "@/lib/types/domain/equipment";
import { Company } from "@/lib/types";
import { useState } from "react";

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

interface EquipmentTransactionFormProps {
  transactionType: EquipmentTransactionType;
  equipments: Equipment[];
  companies: Company[];
  isPending: boolean;
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel: () => void;
}

export function EquipmentTransactionForm({
  transactionType,
  equipments,
  companies,
  isPending,
  onSubmit,
  onCancel,
}: EquipmentTransactionFormProps) {
  const [openEquipments, setOpenEquipments] = useState(false);
  const [openCompanies, setOpenCompanies] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: transactionType,
      date: new Date(),
      currency: Currency.ARS,
      amount: 0,
      equipmentId: 0,
      companyId: 0,
      exchangeRate: null,
      observation: "",
    },
  });

  // Keep type in sync if parent changes it
  useEffect(() => {
    form.setValue("type", transactionType);
    form.setValue("equipmentId", 0);
  }, [transactionType]);

  // Auto-set exchangeRate to 1 when ARS
  useEffect(() => {
    const currency = form.watch("currency");
    if (currency === Currency.ARS) form.setValue("exchangeRate", 1);
  }, [form.watch("currency")]);

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    await onSubmit(data);
  };

  function formatEquipmentDisplay(equipment: Equipment): string {
    const parts = [
      equipment.name || equipment.internalCode || "Sin nombre",
      equipment.type?.name || equipment.category?.name || "",
      equipment.model?.brand?.name || "",
      equipment.model?.name || "",
    ].filter(Boolean);
    return parts.join(" - ");
  }

  function getEquipmentSearchValue(equipment: Equipment): string {
    return [
      equipment.name,
      equipment.internalCode,
      equipment.type?.name,
      equipment.category?.name,
      equipment.model?.brand?.name,
      equipment.model?.name,
    ].filter(Boolean).join(" ");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const date = new Date(e.target.value);
                    if (!isNaN(date.getTime())) field.onChange(date);
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
              <Popover open={openEquipments} onOpenChange={setOpenEquipments}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
                      {field.value
                        ? formatEquipmentDisplay(equipments.find((e) => e.id === field.value)!)
                        : "Seleccione un equipo"}
                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar equipo..." />
                    <CommandList>
                      <CommandEmpty>No se encontraron equipos.</CommandEmpty>
                      <CommandGroup>
                        {equipments.map((equipment) => (
                          <CommandItem
                            value={getEquipmentSearchValue(equipment)}
                            key={equipment.id}
                            onSelect={() => { form.setValue("equipmentId", equipment.id); setOpenEquipments(false); }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", equipment.id === field.value ? "opacity-100" : "opacity-0")} />
                            {formatEquipmentDisplay(equipment)}
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
              <FormLabel>{transactionType === EquipmentTransactionType.PURCHASE ? "Proveedor" : "Cliente"}</FormLabel>
              <Popover open={openCompanies} onOpenChange={setOpenCompanies}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
                      {field.value ? companies.find((c) => c.id === field.value)?.name : "Seleccione una empresa"}
                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar empresa..." />
                    <CommandList>
                      <CommandEmpty>No se encontraron empresas.</CommandEmpty>
                      <CommandGroup>
                        {companies.map((company) => (
                          <CommandItem value={company.name} key={company.id} onSelect={() => { form.setValue("companyId", company.id); setOpenCompanies(false); }}>
                            <Check className={cn("mr-2 h-4 w-4", company.id === field.value ? "opacity-100" : "opacity-0")} />
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" value={field.value.toString()} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
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
                <Select onValueChange={(val) => field.onChange(val as Currency)} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Seleccione moneda" /></SelectTrigger>
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

        {form.watch("currency") !== Currency.ARS && (
          <FormField
            control={form.control}
            name="exchangeRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Cambio</FormLabel>
                <FormControl>
                  <Input type="number" step="0.000001" value={field.value?.toString() || ""} onChange={(e) => field.onChange(e.target.value === "" ? null : parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="observation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observación</FormLabel>
              <FormControl>
                <Textarea placeholder="Detalles adicionales..." className="resize-none" value={field.value ?? ""} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Guardando..." : "Guardar Transacción"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
