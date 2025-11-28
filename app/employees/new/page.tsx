// filepath: sae-frontend/app/employees/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  EmployeeStatus,
  Gender,
  MaritalStatus,
} from "@/lib/types/domain/employee";
import {
  createPersonSchema,
  type CreatePersonFormInput,
  type CreatePersonFormData,
  createPersonDefaultValues,
} from "@/lib/validations/person";
import { PersonsService } from "@/lib/api/persons/persons.service";
import { genderLabels, maritalLabels } from "@/lib/constants";

export default function EmployeeNewPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const personForm = useForm<CreatePersonFormInput>({
    resolver: zodResolver(createPersonSchema),
    defaultValues: createPersonDefaultValues,
  });

  async function handleSubmit(data: CreatePersonFormInput) {
    setSaving(true);
    setError(null);
    try {
      console.log("Creating person with data:", data);

      // Create person first
      const person = await PersonsService.create(data as CreatePersonFormData);

      console.log("Person created:", person);

      // Handle both direct response and wrapped response
      const personData =
        person && typeof person === "object" && "data" in person
          ? person.data
          : person;

      console.log("Person data extracted:", personData);

      if (!personData || !(personData as any).id) {
        throw new Error("Failed to create person - no ID returned");
      }

      const personId = (personData as any).id;

      // Then create employee
      const employeeData = {
        personId: personId,
        companyId: 1,
        employeeCode: "00000",
        information: "",
        hireDate: new Date().toISOString(),
        endDate: undefined,
        categoryId: 4,
        positionId: 9,
        status: EmployeeStatus.ACTIVE,
      };

      console.log("Creating employee with data:", employeeData);

      const employee = await EmployeesService.create(employeeData);

      console.log("Employee created:", employee);

      queryClient.invalidateQueries({ queryKey: ["employees"] });
      router.push(`/employees/${employee.id}/edit`);
    } catch (e: any) {
      console.error("Error creating employee:", e);
      setError(e?.message || "Error al crear empleado");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-800">Nuevo Empleado</CardTitle>
          <CardDescription className="text-slate-500">
            Agregar nuevo empleado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {error && (
            <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
              {error}
            </div>
          )}

          {/* Datos Personales (Editable) */}
          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-700">
              Datos Personales
            </h2>
            <Form {...personForm}>
              <form
                onSubmit={personForm.handleSubmit(handleSubmit)}
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
                  <FormField
                    control={personForm.control}
                    name="cuil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CUIL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="CUIL"
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
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={saving}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="text-white bg-emerald-600 hover:bg-emerald-700"
                    disabled={saving}
                  >
                    {saving ? "Guardando..." : "Guardar"}
                  </Button>
                </div>
              </form>
            </Form>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
