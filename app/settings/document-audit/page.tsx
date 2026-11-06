"use client";

import { useSession } from "next-auth/react";
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
import { useServerFiles } from "@/lib/hooks/useServerFiles";
import { formatDate } from "@/lib/utils/date";

export default function DocumentAuditPage() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const {
    data: auditLogs = [],
    isLoading,
    error,
  } = useServerFiles().useAuditLog(isAdmin);

  if (status === "loading" || (isAdmin && isLoading)) {
    return <p className="text-muted-foreground">Cargando auditoría...</p>;
  }

  if (!isAdmin) {
    return <p role="alert">Solo los administradores pueden consultar esta sección.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Auditoría de documentos</CardTitle>
        <CardDescription>
          Registro de eliminaciones lógicas. Los archivos físicos se conservan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <p role="alert" className="text-destructive">
            No se pudo cargar la auditoría: {error.message}
          </p>
        ) : auditLogs.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            Todavía no hay operaciones registradas.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Operación</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Titular</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{formatDate(entry.eventDate)}</TableCell>
                    <TableCell>Eliminación lógica</TableCell>
                    <TableCell>
                      <div>{entry.filename}</div>
                      <div className="text-xs text-muted-foreground">
                        ID #{entry.serverFileId} · {entry.size} bytes
                      </div>
                      {entry.description && (
                        <div className="text-xs text-muted-foreground">
                          {entry.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{entry.mimetype}</TableCell>
                    <TableCell>
                      {entry.employeeId != null
                        ? `Empleado #${entry.employeeId}`
                        : entry.companyId != null
                          ? `Empresa #${entry.companyId}`
                          : "Sin titular"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
