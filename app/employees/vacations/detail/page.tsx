// filepath: sae-frontend/app/employees/vacations/detail/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEmployeeDetail } from "@/lib/hooks/useEmployees";
import type { Employee, EmployeeVacation } from "@/types/employee";
import { VacationType } from "@/types/employee";
import { useDownloadVacationPdf } from "@/lib/hooks/useEmployeeVacations";
import { EmployeeVacationDialog } from "@/components/employees/employee-vacation-dialog";
import { EmployeeVacationDeleteDialog } from "@/components/employees/employee-vacation-delete-dialog";

function formatTenure(hireDateISO?: string | null): string {
  if (!hireDateISO) return "-";
  const start = new Date(hireDateISO);
  if (isNaN(start.getTime())) return "-";
  const now = new Date();
  let totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) totalMonths -= 1;
  if (totalMonths < 0) totalMonths = 0;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return `${years},${months}`;
}

function formatDate(iso?: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
}

function calcAge(birthDateISO?: string | null): number | string {
  if (!birthDateISO) return "-";
  const birth = new Date(birthDateISO);
  if (isNaN(birth.getTime())) return "-";
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

function exportVacationsToCSV(employee: Employee) {
  const rows: (string | number)[][] = [
    ["Fecha Liquidación", "Detalle", "Días", "Año", "Periodo", "Información"],
  ];
  const list = (employee.vacations ?? []).slice().sort((a, b) => {
    const da = new Date(a.settlementDate).getTime();
    const db = new Date(b.settlementDate).getTime();
    return db - da;
  });
  for (const v of list) {
    const periodo = `${formatDate(v.startDate)} - ${formatDate(v.endDate)}`;
    rows.push([
      formatDate(v.settlementDate),
      v.detail ?? "",
      typeof v.days === "number" ? v.days : "",
      typeof v.year === "number" ? v.year : "",
      periodo,
      String(v.type ?? ""),
    ]);
  }
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const name = `${employee.person?.lastName ?? "Empleado"}_${
    employee.person?.firstName ?? ""
  }_Vacaciones.csv`;
  a.href = url;
  a.download = name.replace(/\s+/g, "_");
  a.click();
  URL.revokeObjectURL(url);
}

export default function EmployeeVacationsDetailPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  const id = useMemo(() => {
    const asStr = sp.get("id");
    const n = asStr ? Number(asStr) : NaN;
    return Number.isNaN(n) ? undefined : n;
  }, [sp]);

  const {
    data: employee,
    isLoading,
    error,
    refetch,
  } = useEmployeeDetail(id, accessToken);

  const downloadPdfMutation = useDownloadVacationPdf(accessToken);

  // Dialog state
  const [openAssignAnnual, setOpenAssignAnnual] = useState(false); // ASSIGNED
  const [openAssignDays, setOpenAssignDays] = useState(false); // TAKEN
  const [openEdit, setOpenEdit] = useState(false);
  const [editVacation, setEditVacation] = useState<EmployeeVacation | null>(
    null
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteVacationSel, setDeleteVacationSel] =
    useState<EmployeeVacation | null>(null);

  const vacationsSorted = useMemo<EmployeeVacation[]>(() => {
    const v = employee?.vacations ?? [];
    return v
      .slice()
      .sort(
        (a, b) =>
          new Date(b.settlementDate).getTime() -
          new Date(a.settlementDate).getTime()
      );
  }, [employee?.vacations]);

  // Years with available remaining days: sum(ASSIGNED) - sum(TAKEN) per year > 0
  const availableYears = useMemo<number[]>(() => {
    const map = new Map<number, { assigned: number; taken: number }>();
    for (const v of employee?.vacations ?? []) {
      const y = typeof v.year === "number" ? v.year : 0;
      if (!map.has(y)) map.set(y, { assigned: 0, taken: 0 });
      const entry = map.get(y)!;
      const d = Number(v.days ?? 0) || 0;
      if (v.type === "ASSIGNED") entry.assigned += d;
      else if (v.type === "TAKEN") entry.taken += d;
    }
    const years: number[] = [];
    for (const [y, { assigned, taken }] of map.entries()) {
      if (assigned - taken > 0) years.push(y);
    }
    // Ensure current year present if no map entries
    if (years.length === 0) {
      const cy = new Date().getFullYear();
      years.push(cy);
    }
    years.sort((a, b) => b - a);
    return years;
  }, [employee?.vacations]);

  return (
    <div className="p-4 space-y-4">
      <Card>
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle className="text-slate-800">Vacaciones</CardTitle>
            <CardDescription className="text-slate-500">
              Detalle de vacaciones del empleado
            </CardDescription>
          </CardHeader>
          <div className="flex gap-2 p-4">
            <Button
              variant="outline"
              onClick={() => router.push("/employees/vacations")}
            >
              Volver
            </Button>
          </div>
        </div>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
              {(error as any)?.message ?? "Error al cargar"}
            </div>
          )}

          {/* Información */}
          {!isLoading && employee && (
            <section className="pt-4 border-t border-slate-200">
              <h2 className="mb-2 text-lg font-semibold text-slate-700">
                Información
              </h2>
              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-5">
                <div>
                  <div className="text-slate-500">Legajo</div>
                  <div className="font-medium">
                    {employee.employeeCode ?? "-"}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Apellido y Nombre</div>
                  <div className="font-medium">
                    {`${employee.person?.lastName ?? ""} ${
                      employee.person?.firstName ?? ""
                    }`.trim() || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Edad</div>
                  <div className="font-medium">
                    {calcAge(employee.person?.birthDate)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Fecha Ingreso</div>
                  <div className="font-medium">
                    {formatDate(employee.hireDate)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Antigüedad</div>
                  <div className="font-medium">
                    {formatTenure(employee.hireDate)}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Acciones */}
          <section className="pt-4 border-t border-slate-200">
            <h2 className="mb-2 text-lg font-semibold text-slate-700">
              Acciones
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button
                className="text-white bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setOpenAssignAnnual(true)}
              >
                Agregar Vacaciones Anuales
              </Button>
              <Button
                className="text-white bg-amber-500 hover:bg-amber-600"
                onClick={() => setOpenAssignDays(true)}
              >
                Asignar Días de Vacaciones
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (employee) exportVacationsToCSV(employee as Employee);
                }}
                disabled={!employee}
              >
                Exportar
              </Button>
            </div>
          </section>

          {/* Historial */}
          <section className="pt-4 border-t border-slate-200">
            <h2 className="mb-2 text-lg font-semibold text-slate-700">
              Historial
            </h2>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Detalle</TableHead>
                    <TableHead>Días</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Periodo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vacationsSorted.length ? (
                    vacationsSorted.map((v) => (
                      <TableRow key={v.id}>
                        <TableCell>{formatDate(v.settlementDate)}</TableCell>
                        <TableCell>{v.detail ?? "-"}</TableCell>
                        <TableCell>
                          {typeof v.days === "number" ? v.days : "-"}
                        </TableCell>
                        <TableCell>
                          {typeof v.year === "number" ? v.year : "-"}
                        </TableCell>
                        <TableCell>
                          {v.type !== "ASSIGNED"
                            ? `${formatDate(v.startDate)} - ${formatDate(
                                v.endDate
                              )}`
                            : "-"}
                        </TableCell>
                        <TableCell>{String(v.type ?? "-")}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditVacation(v);
                                setOpenEdit(true);
                              }}
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setDeleteVacationSel(v);
                                setOpenDelete(true);
                              }}
                            >
                              Eliminar
                            </Button>
                            {v.type !== "ASSIGNED" && employee && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadPdfMutation.mutate(v.id)}
                              >
                                PDF
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Sin registros
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Dialog: Agregar Vacaciones Anuales (ASSIGNED) */}
      {employee && (
        <EmployeeVacationDialog
          open={openAssignAnnual}
          onOpenChange={(o) => setOpenAssignAnnual(o)}
          accessToken={accessToken}
          employeeId={employee.id}
          mode="create"
          fixedType={VacationType.ASSIGNED}
          availableYears={availableYears}
          onSuccess={() => {
            refetch();
          }}
        />
      )}

      {/* Dialog: Asignar Días de Vacaciones (TAKEN) */}
      {employee && (
        <EmployeeVacationDialog
          open={openAssignDays}
          onOpenChange={(o) => setOpenAssignDays(o)}
          accessToken={accessToken}
          employeeId={employee.id}
          mode="create"
          fixedType={VacationType.TAKEN}
          availableYears={availableYears}
          onSuccess={() => {
            refetch();
          }}
        />
      )}

      {/* Dialog: Editar (ASSIGNED o TAKEN según registro) */}
      {employee && editVacation && (
        <EmployeeVacationDialog
          open={openEdit}
          onOpenChange={(o) => setOpenEdit(o)}
          accessToken={accessToken}
          employeeId={employee.id}
          mode="edit"
          fixedType={editVacation.type as VacationType}
          vacation={editVacation}
          availableYears={availableYears}
          onSuccess={() => {
            setEditVacation(null);
            refetch();
          }}
        />
      )}

      {/* Dialog: Eliminar */}
      {deleteVacationSel && (
        <EmployeeVacationDeleteDialog
          open={openDelete}
          onOpenChange={(o) => setOpenDelete(o)}
          accessToken={accessToken}
          vacation={deleteVacationSel}
          onSuccess={() => {
            setDeleteVacationSel(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}
