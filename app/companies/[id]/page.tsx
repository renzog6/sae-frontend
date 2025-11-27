// filepath: sae-frontend/app/companies/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompanyForm } from "@/components/companies/company-form";
import type { Company } from "@/lib/types/domain/company";
import type {
  CompanyFormData,
  UpdateCompanyFormData,
} from "@/lib/validations/company";
import { CompaniesService } from "@/lib/api/companies";
import { Button } from "@/components/ui/button";
import type { Address } from "@/lib/types/shared/location";
import type { Contact } from "@/lib/types/shared/contact";
import { useBusinessCategories } from "@/lib/hooks/useCompanies";
import { AddressDialog } from "@/components/addresses/address-dialog";
import { ContactDialog } from "@/components/contacts/contact-dialog";
import {
  useAddressesByCompany,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
} from "@/lib/hooks/useLocations";
import {
  useContactsByCompany,
  useCreateContact,
  useUpdateContact,
  useDeleteContact,
} from "@/lib/hooks/useContacts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const queryClient = useQueryClient();

  const id = useMemo(() => {
    const p = params?.id;
    const asStr = Array.isArray(p) ? p[0] : (p as string | undefined);
    const n = asStr ? Number(asStr) : NaN;
    return Number.isNaN(n) ? undefined : n;
  }, [params]);

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(
    undefined
  );
  const [contactOpen, setContactOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>(
    undefined
  );

  // Data via hooks
  const { data: addresses = [] } = useAddressesByCompany(id ?? 0);
  const { data: companyContacts = [] } = useContactsByCompany(id ?? 0);

  // Mutations
  const createAddressMut = useCreateAddress();
  const updateAddressMut = useUpdateAddress();
  const deleteAddressMut = useDeleteAddress();
  const createContactMut = useCreateContact();
  const updateContactMut = useUpdateContact();
  const deleteContactMut = useDeleteContact();

  useEffect(() => {
    let ignore = false;
    async function load() {
      if (!accessToken || !id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await CompaniesService.getById(id);
        if (!ignore) setCompany(data);
      } catch (e: any) {
        if (!ignore) setError(e?.message || "Error al cargar la empresa");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [accessToken, id]);

  async function handleSubmit(data: UpdateCompanyFormData) {
    if (!accessToken || !id) return;
    setSaving(true);
    setError(null);
    try {
      await CompaniesService.update(id, data);
      // Ensure companies list reflects latest data
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      router.push("/companies/list");
    } catch (e: any) {
      setError(e?.message || "Error al guardar cambios");
    } finally {
      setSaving(false);
    }
  }
  // Asegura la compatibilidad de tipos con CompanyForm (CompanyFormData)
  const handleFormSubmit = (data: CompanyFormData) => handleSubmit(data);

  const defaultValues = useMemo(() => {
    if (!company) return undefined;
    const firstAddress = addresses?.[0];
    return {
      cuit: company.cuit,
      name: company.name,
      businessName: company.businessName ?? undefined,
      information: company.information ?? undefined,
      businessCategoryId: company.businessCategoryId ?? undefined,
      address: firstAddress
        ? {
            id: firstAddress.id,
            street: firstAddress.street,
            number: firstAddress.number,
            floor: firstAddress.floor,
            apartment: firstAddress.apartment,
            neighborhood: firstAddress.neighborhood,
            reference: firstAddress.reference,
            cityId: firstAddress.cityId,
          }
        : undefined,
    } as UpdateCompanyFormData;
  }, [company, addresses]);

  // ================= Subcomponents =================
  function CategoryList({
    companyId,
    accessToken,
    currentCategoryId,
    onUpdated,
  }: {
    companyId: number;
    accessToken: string;
    currentCategoryId?: number | null;
    onUpdated?: (newId: number | undefined) => void;
  }) {
    const { data: categoriesResponse, isLoading } = useBusinessCategories();
    const categories = categoriesResponse || [];
    const [adding, setAdding] = useState(false);
    const [savingCat, setSavingCat] = useState(false);
    const [selectedId, setSelectedId] = useState<number | "">(
      currentCategoryId ?? ""
    );
    const [confirmOpen, setConfirmOpen] = useState(false);
    const queryClient = useQueryClient();

    async function handleSave() {
      if (!accessToken) return;
      setSavingCat(true);
      try {
        const payload: UpdateCompanyFormData = {
          businessCategoryId:
            selectedId === "" ? undefined : Number(selectedId),
        };
        await CompaniesService.update(companyId, payload);
        onUpdated?.(payload.businessCategoryId);
        // Refresh companies list page caches
        queryClient.invalidateQueries({ queryKey: ["companies"] });
        setAdding(false);
        // Reset selection so the control shows clean state
        setSelectedId(payload.businessCategoryId ?? "");
      } finally {
        setSavingCat(false);
      }
    }

    const current = categories.find((c) => c.id === currentCategoryId);

    return (
      <section className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-700">Categorías</h2>
          <Button
            variant="outline"
            className="border-amber-500 text-amber-600 hover:bg-amber-50"
            onClick={() => setAdding((v) => !v)}
            disabled={isLoading}
          >
            {adding ? "Cancelar" : "+ Agregar"}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentCategoryId ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              <span>{current?.name ?? `Categoría #${currentCategoryId}`}</span>
              <button
                className="text-amber-600 hover:text-amber-800"
                onClick={() => setConfirmOpen(true)}
                title="Quitar"
              >
                ✕
              </button>
            </div>
          ) : (
            <span className="text-slate-500">Sin categoría</span>
          )}
        </div>

        {adding && (
          <div className="flex items-center gap-2 mt-3">
            <select
              className="w-64 h-10 px-2 border rounded border-slate-200 text-slate-700"
              value={selectedId}
              onChange={(e) =>
                setSelectedId(e.target.value ? Number(e.target.value) : "")
              }
            >
              <option value="">Sin categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <Button
              className="text-white bg-amber-500 hover:bg-amber-600"
              disabled={savingCat}
              onClick={handleSave}
            >
              {savingCat ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        )}

        {/* Confirmación para eliminar categoría */}
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Quitar categoría</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Seguro que deseas quitar la categoría actual de la empresa?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="text-white bg-red-500 hover:bg-red-600"
                onClick={async () => {
                  // Ejecutar eliminación
                  setSelectedId("");
                  await CompaniesService.update(companyId, {
                    businessCategoryId: undefined,
                  });
                  onUpdated?.(undefined);
                  // Refresh companies list page caches
                  queryClient.invalidateQueries({ queryKey: ["companies"] });
                  setConfirmOpen(false);
                }}
              >
                Quitar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    );
  }

  function AddressList({
    addresses,
    onAdd,
    onEdit,
  }: {
    addresses?: Address[];
    onAdd: () => void;
    onEdit: (addr: Address) => void;
  }) {
    if (!addresses?.length) {
      return (
        <section className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-slate-700">
              Direcciones
            </h2>
            <Button
              variant="outline"
              className="border-amber-500 text-amber-600 hover:bg-amber-50"
              onClick={onAdd}
            >
              + Agregar
            </Button>
          </div>
          <div className="text-sm text-slate-500">Sin direcciones</div>
        </section>
      );
    }
    return (
      <section className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-700">Direcciones</h2>
          <Button
            variant="outline"
            className="border-amber-500 text-amber-600 hover:bg-amber-50"
            onClick={onAdd}
          >
            + Agregar
          </Button>
        </div>
        <div className="space-y-2">
          {addresses.map((addr) => (
            <div
              key={addr.id ?? `${addr.street}-${addr.number}-${addr.cityId}`}
              className="flex items-center justify-between p-3 border rounded-lg border-slate-200 bg-slate-50"
            >
              <span className="text-slate-700">
                {addr.reference ? `${addr.reference} : ` : ""}
                {addr.street ?? ""} {addr.number ?? ""}
                {addr.floor ? `, ${addr.floor}` : ""}
                {addr.apartment ? ` ${addr.apartment}` : ""}
                {addr.city?.name ? ` - ${addr.city.name}` : ""}
                {addr.city?.postalCode ? ` (${addr.city.postalCode})` : ""}
                {addr.city?.province?.name
                  ? ` - ${addr.city.province.name}`
                  : ""}
              </span>
              <Button
                size="sm"
                className="text-white bg-amber-500 hover:bg-amber-600"
                onClick={() => onEdit(addr)}
              >
                Editar
              </Button>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function ContactList({
    contacts,
    onAdd,
    onEdit,
  }: {
    contacts?: Contact[];
    onAdd: () => void;
    onEdit: (c: Contact) => void;
  }) {
    return (
      <section className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-700">Contactos</h2>
          <Button
            variant="outline"
            className="border-amber-500 text-amber-600 hover:bg-amber-50"
            onClick={onAdd}
          >
            + Agregar
          </Button>
        </div>
        <div className="space-y-2">
          {contacts?.length ? (
            contacts.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 border rounded-lg border-slate-200 bg-slate-50"
              >
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-medium">
                    {/* Placeholder ícono según tipo */}
                    {c.type}
                  </span>
                  <span>{c.label ?? "Sin etiqueta"}</span>
                  <span className="text-slate-400">·</span>
                  <span className="font-mono">{c.value}</span>
                  {c.information && (
                    <span className="text-slate-500">— {c.information}</span>
                  )}
                </div>
                <Button
                  size="sm"
                  className="text-white bg-amber-500 hover:bg-amber-600"
                  onClick={() => onEdit(c)}
                >
                  Editar
                </Button>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-500">Sin contactos</div>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle className="text-slate-800">Detalle y edición</CardTitle>
            <CardDescription className="text-slate-500">
              Visualiza y edita la información de la empresa
            </CardDescription>
          </CardHeader>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Volver
            </Button>
          </div>
        </div>
        <CardContent className="space-y-8">
          {error && (
            <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
              {error}
            </div>
          )}

          {/* Formulario base */}
          {!loading && company && (
            <CompanyForm
              onSubmit={handleFormSubmit}
              isLoading={saving}
              defaultValues={defaultValues}
              isEdit
              onCancel={() => router.back()}
              error={error}
            />
          )}

          {loading && (
            <div className="text-sm text-slate-500">
              Cargando datos de la empresa...
            </div>
          )}

          {/* Categorías (rubros) */}
          {!loading && company && id && (
            <CategoryList
              companyId={id}
              accessToken={accessToken}
              currentCategoryId={company.businessCategoryId}
              onUpdated={(newId) =>
                setCompany((prev) =>
                  prev
                    ? { ...prev, businessCategoryId: newId ?? undefined }
                    : prev
                )
              }
            />
          )}

          {/* Direcciones */}
          <AddressList
            addresses={addresses}
            onAdd={() => setAddressOpen(true)}
            onEdit={(addr) => {
              setEditingAddress(addr as Address);
              setAddressOpen(true);
            }}
          />

          {/* Contactos */}
          <ContactList
            contacts={companyContacts}
            onAdd={() => setContactOpen(true)}
            onEdit={(c) => {
              setEditingContact(c);
              setContactOpen(true);
            }}
          />
        </CardContent>
      </Card>

      {/* Modales */}
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
                personId: editingAddress.personId ?? undefined,
                companyId: editingAddress.companyId ?? undefined,
              }
            : undefined
        }
        accessToken={accessToken}
        onDelete={
          editingAddress?.id
            ? () => deleteAddressMut.mutate(editingAddress.id!)
            : undefined
        }
        onSave={(data) => {
          if (!id) return;
          if (editingAddress?.id) {
            updateAddressMut.mutate({ id: editingAddress.id, data });
          } else {
            createAddressMut.mutate({ ...data, companyId: id });
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
          } else if (id) {
            createContactMut.mutate({ ...data, companyId: id });
          }
        }}
      />
    </div>
  );
}
