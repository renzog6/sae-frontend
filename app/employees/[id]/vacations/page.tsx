// filepath: sae-frontend/app/employees/[id]/vacations/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown, FilePenLine } from "lucide-react";
import type { EmployeeVacation } from "@/lib/types/domain/employee";
import { VacationType, AvailableYear } from "@/lib/types/domain/employee";
import { useEmployeeDetail } from "@/lib/hooks/useEmployees";
import { vacationTypeLabels } from "@/lib/constants";
import { useEmployeeVacations } from "@/lib/hooks/useEmployeeVacations";
import { EmployeeVacationDialog } from "@/components/employees/employee-vacation-dialog";
import { formatDate } from "@/lib/utils/date";
import { sumVacationDays } from "@/lib/utils/employee";

export default function EmployeeVacationsDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = useMemo(() => {
    const p = params?.id;
    const asStr = Array.isArray(p) ? p[0] : (p as string | undefined);
    const n = asStr ? Number(asStr) : NaN;
    return Number.isNaN(n) ? undefined : n;
  }, [params]);

  const { data: employee, isLoading, error, refetch } = useEmployeeDetail(id);

  const downloadPdfMutation = useEmployeeVacations().useDownloadPdf();

  // Dialog state
  const [openAssignAnnual, setOpenAssignAnnual] = useState(false); // ASSIGNED
  const [openAssignDays, setOpenAssignDays] = useState(false); // TAKEN
  const [openEdit, setOpenEdit] = useState(false);
  const [editVacation, setEditVacation] = useState<EmployeeVacation | null>(
    null
  );

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
  const availableYears = useMemo<AvailableYear[]>(() => {
    const map = new Map<number, { assigned: number; taken: number }>();

    for (const v of employee?.vacations ?? []) {
      const y = typeof v.year === "number" ? v.year : 0;
      if (!map.has(y)) map.set(y, { assigned: 0, taken: 0 });
      const entry = map.get(y)!;
      const d = Number(v.days ?? 0) || 0;
      if (v.type === "ASSIGNED") entry.assigned += d;
      else if (v.type === "TAKEN") entry.taken += d;
    }

    const years: AvailableYear[] = [];
    for (const [y, { assigned, taken }] of map.entries()) {
      const available = assigned - taken;
      if (available > 0) {
        years.push({ year: y, available, assigned, taken });
      }
    }

    years.sort((a, b) => b.year - a.year);
    return years;
  }, [employee?.vacations]);

  return (
    <>
      <Card className="shadow-lg">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">
              Vacaciones
            </CardTitle>
            <CardDescription className="text-slate-500">
              Detalle de vacaciones del empleado
            </CardDescription>
          </CardHeader>
          <div className="flex gap-2 p-6">
            <div className="p-3 border rounded-lg bg-emerald-50 border-emerald-200">
              <div className="flex items-center gap-1 text-emerald-600">
                Dias Disponibles:{" "}
                <p className="text-lg font-bold text-emerald-800">
                  {sumVacationDays(employee?.vacations)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="space-y-8">
          {error && (
            <div className="flex items-center gap-2 p-4 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
              <span className="text-red-500">⚠️</span>
              {(error as any)?.message ?? "Error al cargar"}
            </div>
          )}

          {/* Acciones */}
          <section className="pt-6 border-t border-slate-200">
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-slate-700">
              <span>⚡</span> Acciones
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button
                className="text-white shadow-md bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setOpenAssignAnnual(true)}
              >
                <span className="mr-2">📅</span> Agregar Vacaciones Anuales
              </Button>
              <Button
                className="text-white shadow-md bg-amber-500 hover:bg-amber-600"
                onClick={() => setOpenAssignDays(true)}
              >
                <span className="mr-2">🏖️</span> Asignar Días de Vacaciones
              </Button>
            </div>
          </section>

          {/* Historial */}
          <section className="pt-6 border-t border-slate-200">
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-slate-700">
              <span>📋</span> Historial
            </h2>
            <div className="overflow-hidden border rounded-lg shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Días</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Periodo</TableHead>
                    <TableHead>Detalle</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vacationsSorted.length ? (
                    vacationsSorted.map((v) => (
                      <TableRow
                        key={v.id}
                        className="transition-colors hover:bg-slate-50"
                      >
                        <TableCell>{formatDate(v.settlementDate)}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                              v.type === "ASSIGNED"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {vacationTypeLabels[v.type]}
                          </span>
                        </TableCell>
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
                        <TableCell>{v.detail ?? "-"}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            {v.type !== "ASSIGNED" && employee && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadPdfMutation.mutate(v.id)}
                                className="bg-blue-100 hover:bg-blue-200"
                              >
                                <FileDown className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditVacation(v);
                                setOpenEdit(true);
                              }}
                              className="bg-amber-100 hover:bg-amber-200"
                            >
                              <FilePenLine className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center text-slate-500"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-2xl">📭</span>
                          No hay registros de vacaciones aún
                        </div>
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
    </>
  );
}
