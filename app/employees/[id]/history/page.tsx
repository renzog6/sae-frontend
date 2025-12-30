// filepath: sae-frontend/app/employees/[id]/history/page.tsx

"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmployeeIncidentDialog } from "@/components/employees/employee-incident-dialog";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { useToast } from "@/components/ui/toaster";
import { useEmployees } from "@/lib/hooks/useEmployees";
import {
  useEmployeeHistory,
  useDeleteEmployeeIncident,
} from "@/lib/hooks/useHistory";
import {
  EmployeeIncident,
  HistoryLog,
  SeverityLevel,
} from "@/lib/types/domain/history";
import {
  employeeIncidentTypeLabels,
  historyTypeLabels,
  severityLevelLabels,
} from "@/lib/constants";
import { formatDate } from "@/lib/utils/date";
import {
  AlertTriangle,
  FileText,
  Info,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

type HistoryItem =
  | (EmployeeIncident & { itemType: "incident" })
  | (HistoryLog & { itemType: "log" });

function getSeverityIcon(severity: SeverityLevel) {
  switch (severity) {
    case SeverityLevel.INFO:
      return <Info className="w-4 h-4 text-blue-500" />;
    case SeverityLevel.WARNING:
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case SeverityLevel.CRITICAL:
      return <XCircle className="w-4 h-4 text-red-500" />;
    case SeverityLevel.SUCCESS:
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    default:
      return <Info className="w-4 h-4 text-gray-500" />;
  }
}

function getSeverityBadgeVariant(severity: SeverityLevel) {
  switch (severity) {
    case SeverityLevel.INFO:
      return "default";
    case SeverityLevel.WARNING:
      return "secondary";
    case SeverityLevel.CRITICAL:
      return "destructive";
    case SeverityLevel.SUCCESS:
      return "default";
    default:
      return "outline";
  }
}

export default function EmployeeHistoryPage() {
  const params = useParams();
  const id = Number(params.id);

  const { toast } = useToast();

  const { data: employee, isLoading: employeeLoading } = useEmployees().useGetById(id);
  const {
    data: historyData,
    isLoading: historyLoading,
    refetch,
  } = useEmployeeHistory(id);

  const deleteIncidentMutation = useDeleteEmployeeIncident();

  // Dialog states
  const [incidentDialogOpen, setIncidentDialogOpen] = useState(false);
  const [editingIncident, setEditingIncident] =
    useState<EmployeeIncident | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingIncident, setDeletingIncident] =
    useState<EmployeeIncident | null>(null);

  const handleCreateIncident = () => {
    setEditingIncident(null);
    setIncidentDialogOpen(true);
  };

  const handleEditIncident = (incident: EmployeeIncident) => {
    setEditingIncident(incident);
    setIncidentDialogOpen(true);
  };

  const handleDeleteIncident = (incident: EmployeeIncident) => {
    setDeletingIncident(incident);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingIncident) return;
    try {
      await deleteIncidentMutation.mutateAsync(deletingIncident.id);
      toast({
        title: "Incidente eliminado",
        description: "El incidente fue eliminado correctamente.",
        variant: "success",
      });
      setDeleteDialogOpen(false);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error al eliminar incidente",
        description: error?.message || "Intenta nuevamente.",
        variant: "error",
      });
    }
  };

  const deleteDescription = `¿Seguro que quieres eliminar el incidente "${deletingIncident
    ? employeeIncidentTypeLabels[deletingIncident.type]
    : "Sin tipo"
    }"? Esta acción no se puede deshacer.`;

  const handleIncidentSuccess = () => {
    refetch();
  };

  const incidents: EmployeeIncident[] = historyData?.incidents ?? [];
  const logs: HistoryLog[] = historyData?.logs ?? [];

  // Combine and sort all history items by date
  const allHistoryItems = useMemo(() => {
    const items: HistoryItem[] = [
      ...incidents.map((incident) => ({
        ...incident,
        itemType: "incident" as const,
      })),
      ...logs.map((log) => ({ ...log, itemType: "log" as const })),
    ];

    return items.sort((a, b) => {
      const dateA = new Date(
        a.createdAt || (a.itemType === "log" ? (a as HistoryLog).eventDate : "")
      ).getTime();
      const dateB = new Date(
        b.createdAt || (b.itemType === "log" ? (b as HistoryLog).eventDate : "")
      ).getTime();
      return dateB - dateA; // Most recent first
    });
  }, [incidents, logs]);

  if (employeeLoading || historyLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="w-1/4 h-6 rounded animate-pulse bg-muted"></div>
            <div className="w-1/2 h-4 rounded animate-pulse bg-muted"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 animate-pulse">
              <div className="w-full h-4 rounded bg-muted"></div>
              <div className="w-3/4 h-4 rounded bg-muted"></div>
            </div>
          </CardContent>
        </Card>

        {/* Dialog para crear/editar incidentes */}
        <EmployeeIncidentDialog
          open={incidentDialogOpen}
          onOpenChange={setIncidentDialogOpen}
          employeeId={id}
          mode={editingIncident ? "edit" : "create"}
          incident={editingIncident}
          onSuccess={handleIncidentSuccess}
        />

        {/* Dialog para eliminar incidentes */}
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Eliminar incidente"
          description={deleteDescription}
          onConfirm={handleDeleteConfirm}
          isLoading={deleteIncidentMutation.isPending}
        />
      </div>
    );
  }

  if (!employee) {
    return <div>Empleado no encontrado</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Historial</CardTitle>
          <CardDescription>
            Historial completo del empleado: {employee.person?.firstName}{" "}
            {employee.person?.lastName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Acciones */}
          <div className="flex items-center justify-between mb-6">
            <div></div>
            <Button
              onClick={handleCreateIncident}
              className="text-white bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Incidente
            </Button>
          </div>

          {allHistoryItems.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium text-muted-foreground">
                No hay registros históricos
              </h3>
              <p className="text-sm text-muted-foreground">
                El historial del empleado aparecerá aquí cuando haya incidentes
                o eventos registrados.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden border rounded-lg shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Detalles</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allHistoryItems.map((item) => {
                    if (item.itemType === "incident") {
                      const incident = item as EmployeeIncident & {
                        itemType: "incident";
                      };
                      return (
                        <TableRow
                          key={`incident-${incident.id}`}
                          className="transition-colors hover:bg-slate-50"
                        >
                          <TableCell>
                            {formatDate(incident.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="destructive">Incidente</Badge>
                          </TableCell>
                          <TableCell>
                            {employeeIncidentTypeLabels[incident.type]}
                          </TableCell>
                          <TableCell>{incident.description}</TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              {incident.startDate && (
                                <div>
                                  Inicio: {formatDate(incident.startDate)}
                                </div>
                              )}
                              {incident.endDate && (
                                <div>Fin: {formatDate(incident.endDate)}</div>
                              )}
                              {incident.doctorNote && (
                                <div className="text-green-600">
                                  ✓ Certificado médico
                                </div>
                              )}
                              {incident.paidLeave && (
                                <div className="text-blue-600">
                                  ✓ Licencia paga
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditIncident(incident)}
                                className="bg-amber-100 hover:bg-amber-200"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteIncident(incident)}
                                className="text-red-600 bg-red-100 hover:bg-red-200 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    } else {
                      const log = item as HistoryLog & { itemType: "log" };
                      return (
                        <TableRow
                          key={`log-${log.id}`}
                          className="transition-colors hover:bg-slate-50"
                        >
                          <TableCell>{formatDate(log.eventDate)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">Evento</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSeverityIcon(log.severity)}
                              {historyTypeLabels[log.type]}
                            </div>
                          </TableCell>
                          <TableCell>{log.title}</TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {log.description && (
                                <div className="mb-1">{log.description}</div>
                              )}
                              <Badge
                                variant={getSeverityBadgeVariant(log.severity)}
                                className="text-xs"
                              >
                                {severityLevelLabels[log.severity]}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog para crear/editar incidentes */}
      <EmployeeIncidentDialog
        open={incidentDialogOpen}
        onOpenChange={setIncidentDialogOpen}
        employeeId={id}
        mode={editingIncident ? "edit" : "create"}
        incident={editingIncident}
        onSuccess={handleIncidentSuccess}
      />

      {/* Dialog para eliminar incidentes */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Eliminar incidente"
        description={deleteDescription}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteIncidentMutation.isPending}
      />
    </div>
  );
}
