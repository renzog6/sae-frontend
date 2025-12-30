// filepath: sae-frontend/app/employees/[id]/edit/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EmployeesService } from "@/lib/api/employees";
import { useEmployees } from "@/lib/hooks/useEmployees";
import {
  useEmployeeCategories,
  useEmployeePositions,
} from "@/lib/hooks/useEmployees";
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
import { AddressDialog } from "@/components/addresses/address-dialog";
import { ContactDialog } from "@/components/contacts/contact-dialog";
import type { Address } from "@/lib/types/shared/location";
import { useAddresses } from "@/lib/hooks/useLocations";
import {
  useContactsByPerson,
  useCreateContact,
  useUpdateContact,
  useDeleteContact,
} from "@/lib/hooks/useContacts";
import {
  personToUpdateForm,
  updatePersonSchema,
  type UpdatePersonFormInput,
  type UpdatePersonFormData,
} from "@/lib/validations/person";
import { PersonsService } from "@/lib/api/persons/persons.service";
import { genderLabels, maritalLabels } from "@/lib/constants";
import { Plus, SquarePen } from "lucide-react";

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const id = useMemo(() => {
    const p = params?.id;
    const asStr = Array.isArray(p) ? p[0] : (p as string | undefined);
    const n = asStr ? Number(asStr) : NaN;
    return Number.isNaN(n) ? undefined : n;
  }, [params]);

  const {
    data: employee,
    isLoading,
    error: fetchError,
  } = useEmployees().useGetById(id ?? 0);
  const { useGetAll: useGetCategories } = useEmployeeCategories();
  const { data: categoriesData } = useGetCategories();

  const { useGetAll: useGetPositions } = useEmployeePositions();
  const { data: positionsData } = useGetPositions();

  const categories = categoriesData?.data ?? [];
  const positions = positionsData?.data ?? [];

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { useByPerson, useCreate, useUpdate, useDelete } = useAddresses();

  // Person-scoped lists and mutations
  const personId = employee?.personId;
  const personAddressesQuery = useByPerson(personId ?? 0);
  const { data: personAddresses = [] } = personAddressesQuery;
  // Use address from employee data if available, otherwise from query
  const displayAddresses = employee?.person?.address
    ? [employee.person.address]
    : personAddresses;
  const { data: personContacts = [] } = useContactsByPerson(personId ?? 0);
  const createAddressMut = useCreate();
  const updateAddressMut = useUpdate();
  const deleteAddressMut = useDelete();
  const createContactMut = useCreateContact();
  const updateContactMut = useUpdateContact();
  const deleteContactMut = useDeleteContact();

  const [addressOpen, setAddressOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | undefined>(
    undefined
  );
  const [contactOpen, setContactOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any | undefined>(
    undefined
  );

  const defaultValues = useMemo(() => {
    if (!employee) return undefined;
    const base = employeeToUpdateForm(employee as Employee);
    // Ensure default companyId if absent (creation contexts), here kept for safety
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

  // useForm aligned to schema; using output type is fine for update (all optional)
  // IMPORTANT: use input type to match zodResolver expectations
  const form = useForm<UpdateEmployeeFormInput>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: defaultValues,
    values: defaultValues, // keep in sync when employee loads
  });
  async function handleSubmit(data: UpdateEmployeeFormInput) {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      await EmployeesService.update(
        id,
        data as unknown as UpdateEmployeeFormData
      );
      // refresh caches
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employees", id] });
      router.back();
    } catch (e: any) {
      setError(e?.message || "Error al guardar cambios del empleado");
    } finally {
      setSaving(false);
    }
  }

  // ============ Person form (Datos Personales) ============
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
    if (!personId) return;
    setSaving(true);
    setError(null);
    try {
      await PersonsService.update(
        personId,
        data as unknown as UpdatePersonFormData
      );
      queryClient.invalidateQueries({ queryKey: ["persons", personId] });
      queryClient.invalidateQueries({ queryKey: ["employees", id] });
    } catch (e: any) {
      setError(e?.message || "Error al guardar datos personales");
    } finally {
      setSaving(false);
      router.back();
    }
  }

  return (
    <>
      <Card>
        <CardContent className="space-y-8">
          {(error || fetchError) && (
            <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
              {error || (fetchError as any)?.message}
            </div>
          )}

          {/* Datos Personales (Editable) */}
          {!isLoading && employee && (
            <section className="pt-4 border-t border-slate-200">
              <h2 className="mb-2 text-lg font-semibold text-slate-700">
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
                            <Input
                              placeholder="Nombre"
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
                      control={personForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Apellido"
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
                      control={personForm.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de Nacimiento</FormLabel>
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
                    <FormField
                      control={personForm.control}
                      name="dni"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>DNI</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="DNI"
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
                    <div>
                      <label className="text-sm text-slate-600">CUIL</label>
                      <Input value={employee.person?.cuil ?? ""} readOnly />
                    </div>
                    <FormField
                      control={personForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Género</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-10 px-2 border rounded border-slate-200 text-slate-700"
                              value={field.value ?? Gender.OTHER}
                              onChange={(e) =>
                                field.onChange(e.target.value as Gender)
                              }
                            >
                              {Object.values(Gender).map((g) => (
                                <option key={g} value={g}>
                                  {genderLabels[g]}
                                </option>
                              ))}
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
                            <select
                              className="w-full h-10 px-2 border rounded border-slate-200 text-slate-700"
                              value={field.value ?? MaritalStatus.SINGLE}
                              onChange={(e) =>
                                field.onChange(e.target.value as MaritalStatus)
                              }
                            >
                              {Object.values(MaritalStatus).map((m) => (
                                <option key={m} value={m}>
                                  {maritalLabels[m]}
                                </option>
                              ))}
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
                            <Textarea
                              placeholder="Notas"
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
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="submit"
                      className="text-white bg-emerald-600 hover:bg-emerald-700"
                      disabled={saving}
                    >
                      {saving ? "Guardando..." : "Guardar Datos Personales"}
                    </Button>
                  </div>
                </form>
              </Form>
            </section>
          )}

          {/* Direcciones (Persona) */}
          <section className="pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="w-24 text-lg font-semibold text-slate-700">
                Direcciones
              </h2>
              <Button
                size="sm"
                variant="outline"
                className="text-white bg-emerald-600 hover:emerald-800"
                onClick={() => setAddressOpen(true)}
                disabled={!personId}
              >
                <Plus />
              </Button>
            </div>
            <div className="space-y-2">
              {displayAddresses?.length ? (
                displayAddresses.map((addr: Address) => (
                  <div
                    key={
                      addr.id ?? `${addr.street}-${addr.number}-${addr.cityId}`
                    }
                    className="flex items-center justify-between p-3 border rounded-lg border-slate-200 bg-slate-50"
                  >
                    <span className="text-slate-700">
                      {addr.reference ? `${addr.reference} : ` : ""}
                      {addr.street ?? ""} {addr.number ?? ""}
                      {addr.floor ? `, ${addr.floor}` : ""}
                      {addr.apartment ? ` ${addr.apartment}` : ""}
                      {addr.city?.name ? ` - ${addr.city.name}` : ""}
                      {addr.city?.postalCode
                        ? ` (${addr.city.postalCode})`
                        : ""}
                      {addr.city?.province?.name
                        ? ` - ${addr.city.province.name}`
                        : ""}
                    </span>
                    <Button
                      size="sm"
                      className="text-white bg-emerald-600 hover:emerald-800"
                      onClick={() => {
                        setEditingAddress(addr as any);
                        setAddressOpen(true);
                      }}
                    >
                      <SquarePen />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">Sin direcciones</div>
              )}
            </div>
          </section>

          {/* Contactos (Persona) */}
          <section className="pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="w-24 text-lg font-semibold text-slate-700">
                Contactos
              </h2>
              <Button
                size="sm"
                variant="outline"
                className="text-white bg-emerald-600 hover:emerald-800"
                onClick={() => setContactOpen(true)}
                disabled={!personId}
              >
                <Plus />
              </Button>
            </div>
            <div className="space-y-2">
              {personContacts?.length ? (
                personContacts.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 border rounded-lg border-slate-200 bg-slate-50"
                  >
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="font-medium">{c.type}</span>
                      <span>{c.label ?? "Sin etiqueta"}</span>
                      <span className="text-slate-400">·</span>
                      <span className="font-mono">{c.value}</span>
                      {c.information && (
                        <span className="text-slate-500">
                          — {c.information}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="text-white bg-emerald-600 hover:emerald-800"
                      onClick={() => {
                        setEditingContact(c as any);
                        setContactOpen(true);
                      }}
                    >
                      <SquarePen />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">Sin contactos</div>
              )}
            </div>
          </section>

          {/* Datos Laborales */}
          {!isLoading && employee && (
            <section className="pt-4 border-t border-slate-200">
              <h2 className="mb-2 text-lg font-semibold text-slate-700">
                Datos Laborales
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="employeeCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código Empleado</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Legajo interno"
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
                    <div>
                      <label className="text-sm text-slate-600">
                        CUIL (desde Persona)
                      </label>
                      <Input value={employee.person?.cuil ?? ""} readOnly />
                    </div>
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-10 px-2 border rounded border-slate-200 text-slate-700"
                              value={field.value ?? EmployeeStatus.ACTIVE}
                              onChange={(e) =>
                                field.onChange(e.target.value as EmployeeStatus)
                              }
                            >
                              {Object.values(EmployeeStatus).map((s) => (
                                <option key={s} value={s}>
                                  {s}
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
                      name="hireDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de Ingreso</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              value={
                                field.value ? field.value.substring(0, 10) : ""
                              }
                              onChange={(e) =>
                                field.onChange(
                                  new Date(e.target.value).toISOString()
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* endDate eliminado según requerimiento */}
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoría</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-10 px-2 border rounded border-slate-200 text-slate-700"
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                                )
                              }
                            >
                              <option value="">Seleccione</option>
                              {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.name}
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
                      name="positionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Posición</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-10 px-2 border rounded border-slate-200 text-slate-700"
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                                )
                              }
                            >
                              <option value="">Seleccione</option>
                              {positions.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.name}
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
                      name="information"
                      render={({ field }) => (
                        <FormItem className="md:col-span-3">
                          <FormLabel>Información</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Notas opcionales..."
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
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="submit"
                      className="text-white bg-emerald-600 hover:bg-emerald-700"
                      disabled={saving}
                    >
                      {saving ? "Guardando..." : "Guardar Datos Laborales"}
                    </Button>
                  </div>
                </form>
              </Form>
            </section>
          )}
          {isLoading && (
            <div className="text-sm text-slate-500">
              Cargando datos del empleado...
            </div>
          )}

          {/* Modales Persona */}
          <AddressDialog
            open={addressOpen}
            onOpenChange={(v) => {
              if (!v) setEditingAddress(undefined);
              setAddressOpen(v);
            }}
            initial={
              editingAddress
                ? {
                  street: editingAddress.street,
                  number: editingAddress.number,
                  floor: editingAddress.floor,
                  apartment: editingAddress.apartment,
                  neighborhood: editingAddress.neighborhood,
                  reference: editingAddress.reference,
                  cityId: editingAddress.cityId,
                  personId: editingAddress.personId ?? personId,
                }
                : personId
                  ? { cityId: 1, personId }
                  : undefined
            }
            onDelete={
              editingAddress?.id
                ? () =>
                  deleteAddressMut.mutate(editingAddress.id!, {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["addresses", "byPerson", personId],
                      });
                    },
                  })
                : undefined
            }
            onSave={(data) => {
              if (!personId) return;
              if (editingAddress?.id) {
                updateAddressMut.mutate(
                  { id: editingAddress.id, dto: data },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["addresses", "byPerson", personId],
                      });
                    },
                  }
                );
              } else {
                createAddressMut.mutate(
                  { ...data, personId },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["addresses", "byPerson", personId],
                      });
                    },
                  }
                );
              }
            }}
          />

          <ContactDialog
            open={contactOpen}
            onOpenChange={(v) => {
              if (!v) setEditingContact(undefined);
              setContactOpen(v);
            }}
            initial={
              editingContact
                ? {
                  type: editingContact.type,
                  value: editingContact.value,
                  label: editingContact.label ?? undefined,
                  information: editingContact.information ?? undefined,
                }
                : undefined
            }
            onDelete={
              editingContact?.id
                ? () => deleteContactMut.mutate(editingContact.id!)
                : undefined
            }
            onSave={(data) => {
              if (editingContact?.id) {
                updateContactMut.mutate({ id: editingContact.id, data });
              } else if (personId) {
                createContactMut.mutate({ ...data, personId });
              }
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
