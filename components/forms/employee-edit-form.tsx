// filepath: sae-frontend/components/forms/employee-edit-form.tsx
"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, SquarePen } from "lucide-react";

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
import { AddressDialog } from "@/components/addresses/address-dialog";
import { ContactDialog } from "@/components/contacts/contact-dialog";

import { useUpdateEmployeeApplication } from "@/lib/application/employee-application.hooks";
import {
  Employee,
  EmployeeStatus,
  Gender,
  MaritalStatus,
} from "@/lib/types/domain/employee";
import {
  employeeToUpdateForm,
  updateEmployeeSchema,
  type UpdateEmployeeFormData,
  type UpdateEmployeeFormInput,
} from "@/lib/validations/employee";
import {
  personToUpdateForm,
  updatePersonSchema,
  type UpdatePersonFormInput,
  type UpdatePersonFormData,
} from "@/lib/validations/person";
import { useAddresses } from "@/lib/hooks/useLocations";
import { useContacts } from "@/lib/hooks/useContacts";
import type { Address } from "@/lib/types/shared/location";
import type { Contact } from "@/lib/types/domain/contact";
import { genderLabels, maritalLabels } from "@/lib/constants";

interface EmployeeEditFormProps {
  employee: Employee;
  employeeId: number;
  categories: { id: number; name: string }[];
  positions: { id: number; name: string }[];
  isLoading?: boolean;
  fetchError?: Error | null;
}

const selectClass =
  "w-full h-10 px-2 border rounded border-input text-foreground bg-background";

export function EmployeeEditForm({
  employee,
  employeeId,
  categories,
  positions,
  isLoading,
  fetchError,
}: EmployeeEditFormProps) {
  const queryClient = useQueryClient();
  const updateEmployeeApplicationMutation = useUpdateEmployeeApplication();
  const [error, setError] = useState<string | null>(null);

  const personId = employee?.personId;

  // ─── Address hooks ────────────────────────────────────────────────────────
  const {
    useByPerson: useAddressesByPerson,
    useCreate: useCreateAddress,
    useUpdate: useUpdateAddress,
    useDelete: useDeleteAddress,
  } = useAddresses();
  const { data: personAddresses } = useAddressesByPerson(personId ?? 0);
  const createAddressMut = useCreateAddress();
  const updateAddressMut = useUpdateAddress();
  const deleteAddressMut = useDeleteAddress();

  const [addressOpen, setAddressOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | undefined>(undefined);

  // ─── Contact hooks ────────────────────────────────────────────────────────
  const {
    useByPerson: useContactsByPerson,
    useCreate: useCreateContact,
    useUpdate: useUpdateContact,
    useDelete: useDeleteContact,
  } = useContacts();
  const { data: personContacts } = useContactsByPerson(personId);
  const createContactMut = useCreateContact();
  const updateContactMut = useUpdateContact();
  const deleteContactMut = useDeleteContact();

  const [contactOpen, setContactOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any | undefined>(undefined);

  const displayAddresses = employee?.person?.address
    ? [employee.person.address]
    : personAddresses ?? [];

  // ─── Employee (Datos Laborales) form ─────────────────────────────────────
  const employeeDefaults = useMemo(() => {
    if (!employee) return undefined;
    const base = employeeToUpdateForm(employee as Employee);
    return {
      companyId: base.companyId ?? 1,
      employeeCode: base.employeeCode,
      information: base.information,
      status: base.status ?? EmployeeStatus.ACTIVE,
      hireDate: base.hireDate,
      categoryId: base.categoryId,
      positionId: base.positionId,
      personId: base.personId,
    } as UpdateEmployeeFormData;
  }, [employee]);

  const form = useForm<UpdateEmployeeFormInput>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: employeeDefaults,
    values: employeeDefaults,
  });

  async function handleSubmit(data: UpdateEmployeeFormInput) {
    setError(null);
    try {
      await updateEmployeeApplicationMutation.mutateAsync({
        id: employeeId,
        data: {
          personData: {},
          employeeData: data as unknown as UpdateEmployeeFormData,
        },
      });
    } catch (e: any) {
      setError((e as Error)?.message || "Error al guardar datos laborales");
    }
  }

  // ─── Person (Datos Personales) form ──────────────────────────────────────
  const personDefaults = useMemo(() => {
    if (!employee?.person) return undefined;
    return personToUpdateForm(employee.person);
  }, [employee?.person]);

  const personForm = useForm<UpdatePersonFormInput>({
    resolver: zodResolver(updatePersonSchema),
    defaultValues: personDefaults,
    values: personDefaults,
  });

  async function handlePersonSubmit(data: UpdatePersonFormInput) {
    setError(null);
    try {
      await updateEmployeeApplicationMutation.mutateAsync({
        id: employeeId,
        data: {
          personData: data as unknown as UpdatePersonFormData,
          employeeData: {},
        },
      });
    } catch (e: any) {
      setError((e as Error)?.message || "Error al guardar datos personales");
    }
  }

  return (
    <div className="space-y-8">
      {(error || fetchError) && (
        <div className="p-3 text-sm text-destructive border border-destructive/30 rounded-md bg-destructive/10">
          {error || (fetchError as any)?.message}
        </div>
      )}

      {/* Datos Personales */}
      {!isLoading && employee && (
        <section className="pt-4 border-t border-border">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Datos Personales
          </h2>
          <Form {...personForm}>
            <form
              onSubmit={personForm.handleSubmit(handlePersonSubmit)}
              className="space-y-3"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <FormField
                  control={personForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre" value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellido" value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personForm.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Nacimiento</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? (field.value as string).substring(0, 10) : ""}
                          onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personForm.control}
                  name="dni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI</FormLabel>
                      <FormControl>
                        <Input placeholder="DNI" value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <label className="text-sm text-muted-foreground">CUIL</label>
                  <Input value={employee.person?.cuil ?? ""} readOnly className="bg-muted" />
                </div>
                <FormField
                  control={personForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Género</FormLabel>
                      <FormControl>
                        <select className={selectClass} value={field.value ?? Gender.OTHER} onChange={(e) => field.onChange(e.target.value as Gender)}>
                          {Object.values(Gender).map((g) => (<option key={g} value={g}>{genderLabels[g]}</option>))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personForm.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado Civil</FormLabel>
                      <FormControl>
                        <select className={selectClass} value={field.value ?? MaritalStatus.SINGLE} onChange={(e) => field.onChange(e.target.value as MaritalStatus)}>
                          {Object.values(MaritalStatus).map((m) => (<option key={m} value={m}>{maritalLabels[m]}</option>))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personForm.control}
                  name="information"
                  render={({ field }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel>Información</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Notas" value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="submit" disabled={updateEmployeeApplicationMutation.isPending}>
                  {updateEmployeeApplicationMutation.isPending ? "Guardando..." : "Guardar Datos Personales"}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      )}

      {/* Direcciones */}
      <section className="pt-4 border-t border-border">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="w-24 text-lg font-semibold text-foreground">Direcciones</h2>
          <Button size="sm" variant="outline" onClick={() => setAddressOpen(true)} disabled={!personId}>
            <Plus />
          </Button>
        </div>
        <div className="space-y-2">
          {displayAddresses?.length ? (
            displayAddresses.map((addr: Address) => (
              <div key={addr.id ?? `${addr.street}-${addr.number}-${addr.cityId}`} className="flex items-center justify-between p-3 border rounded-lg border-border bg-muted/30">
                <span className="text-foreground">
                  {addr.reference ? `${addr.reference} : ` : ""}
                  {addr.street ?? ""} {addr.number ?? ""}
                  {addr.floor ? `, ${addr.floor}` : ""}
                  {addr.apartment ? ` ${addr.apartment}` : ""}
                  {addr.city?.name ? ` - ${addr.city.name}` : ""}
                  {addr.city?.postalCode ? ` (${addr.city.postalCode})` : ""}
                  {addr.city?.province?.name ? ` - ${addr.city.province.name}` : ""}
                </span>
                <Button size="sm" variant="outline" onClick={() => { setEditingAddress(addr as any); setAddressOpen(true); }}>
                  <SquarePen />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">Sin direcciones</div>
          )}
        </div>
      </section>

      {/* Contactos */}
      <section className="pt-4 border-t border-border">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="w-24 text-lg font-semibold text-foreground">Contactos</h2>
          <Button size="sm" variant="outline" onClick={() => setContactOpen(true)} disabled={!personId}>
            <Plus />
          </Button>
        </div>
        <div className="space-y-2">
          {personContacts?.length ? (
            personContacts.map((c: Contact) => (
              <div key={c.id} className="flex items-center justify-between p-3 border rounded-lg border-border bg-muted/30">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="font-medium">{c.type}</span>
                  <span>{c.label ?? "Sin etiqueta"}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="font-mono">{c.value}</span>
                  {c.information && <span className="text-muted-foreground">— {c.information}</span>}
                </div>
                <Button size="sm" variant="outline" onClick={() => { setEditingContact(c as any); setContactOpen(true); }}>
                  <SquarePen />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">Sin contactos</div>
          )}
        </div>
      </section>

      {/* Datos Laborales */}
      {!isLoading && employee && (
        <section className="pt-4 border-t border-border">
          <h2 className="mb-2 text-lg font-semibold text-foreground">Datos Laborales</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="employeeCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código Empleado</FormLabel>
                      <FormControl>
                        <Input placeholder="Legajo interno" value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <label className="text-sm text-muted-foreground">CUIL (desde Persona)</label>
                  <Input value={employee.person?.cuil ?? ""} readOnly className="bg-muted" />
                </div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <select className={selectClass} value={field.value ?? EmployeeStatus.ACTIVE} onChange={(e) => field.onChange(e.target.value as EmployeeStatus)}>
                          {Object.values(EmployeeStatus).map((s) => (<option key={s} value={s}>{s}</option>))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hireDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Ingreso</FormLabel>
                      <FormControl>
                        <Input type="date" value={field.value ? field.value.substring(0, 10) : ""} onChange={(e) => field.onChange(new Date(e.target.value).toISOString())} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <select className={selectClass} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}>
                          <option value="">Seleccione</option>
                          {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="positionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Posición</FormLabel>
                      <FormControl>
                        <select className={selectClass} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}>
                          <option value="">Seleccione</option>
                          {positions.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="information"
                  render={({ field }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel>Información</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Notas opcionales..." value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="submit" disabled={updateEmployeeApplicationMutation.isPending}>
                  {updateEmployeeApplicationMutation.isPending ? "Guardando..." : "Guardar Datos Laborales"}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      )}

      {isLoading && (
        <div className="text-sm text-muted-foreground">Cargando datos del empleado...</div>
      )}

      {/* Address Dialog */}
      <AddressDialog
        open={addressOpen}
        onOpenChange={(v) => { if (!v) setEditingAddress(undefined); setAddressOpen(v); }}
        initial={
          editingAddress
            ? { street: editingAddress.street, number: editingAddress.number, floor: editingAddress.floor, apartment: editingAddress.apartment, neighborhood: editingAddress.neighborhood, reference: editingAddress.reference, cityId: editingAddress.cityId, personId: editingAddress.personId ?? personId }
            : personId ? { cityId: 1, personId } : undefined
        }
        onDelete={editingAddress?.id ? () => deleteAddressMut.mutate(editingAddress.id!, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses", "byPerson", personId] }) }) : undefined}
        onSave={(data) => {
          if (!personId) return;
          if (editingAddress?.id) {
            updateAddressMut.mutate({ id: editingAddress.id, dto: data }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses", "byPerson", personId] }) });
          } else {
            createAddressMut.mutate({ ...data, personId }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses", "byPerson", personId] }) });
          }
        }}
      />

      {/* Contact Dialog */}
      <ContactDialog
        open={contactOpen}
        onOpenChange={(v) => { if (!v) setEditingContact(undefined); setContactOpen(v); }}
        initial={editingContact ? { type: editingContact.type, value: editingContact.value, label: editingContact.label ?? undefined, information: editingContact.information ?? undefined } : undefined}
        onDelete={editingContact?.id ? () => deleteContactMut.mutate(editingContact.id!, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts", "byPerson", personId] }) }) : undefined}
        onSave={(data) => {
          if (editingContact?.id) {
            updateContactMut.mutate({ id: editingContact.id, dto: data }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts", "byPerson", personId] }) });
          } else if (personId) {
            createContactMut.mutate({ ...data, personId }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts", "byPerson", personId] }) });
          }
        }}
      />
    </div>
  );
}
