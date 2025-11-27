// filepath: sae-frontend/app/tires/reports/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Filter, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTireEvents } from "@/lib/hooks/useTires";
import { TireEventType } from "@/lib/types/shared/enums";

export default function TireReportsEventsPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState("");
  const [eventType, setEventType] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  // Debounce query
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, eventType, fromDate, toDate, limit]);

  const {
    data: eventsData,
    isLoading,
    error,
  } = useTireEvents({
    page,
    limit,
    q: debouncedQuery || undefined,
    eventType: eventType === "ALL" ? undefined : eventType || undefined,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  const events = Array.isArray(eventsData)
    ? eventsData
    : (eventsData as any)?.data ?? [];
  const totalPages = (eventsData as any)?.meta?.totalPages ?? 1;

  const eventsList = Array.isArray(eventsData)
    ? eventsData
    : (eventsData as any)?.data ?? [];

  const getEventTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      ASSIGNMENT: "Asignación",
      UNASSIGNMENT: "Desasignación",
      ROTATION: "Rotación",
      INSPECTION: "Inspección",
      RECAP: "Recapado",
      DISCARD: "Descartado",
      OTHER: "Otro",
    };
    return labels[type] || type;
  };

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      ASSIGNMENT: "text-blue-700",
      UNASSIGNMENT: "text-orange-700",
      ROTATION: "text-purple-700",
      INSPECTION: "text-green-700",
      RECAP: "text-red-700",
      DISCARD: "text-gray-700",
      OTHER: "text-gray-600",
    };
    return colors[type] || "text-gray-600";
  };

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">
              Historial de Eventos de Neumáticos
            </CardTitle>
          </div>
          <CardDescription>
            Timeline completo de todos los eventos registrados en el sistema de
            neumáticos
          </CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4">
            {/* Search by tire */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Input
                  placeholder="🔍 Buscar por número de serie o medida del neumático..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                {/* Page size selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[120px] justify-between"
                    >
                      <span className="mr-2">📊</span> {limit}/pág
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={() => {
                        setPage(1);
                        setLimit(10);
                      }}
                    >
                      10
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setPage(1);
                        setLimit(50);
                      }}
                    >
                      50
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setPage(1);
                        setLimit(100);
                      }}
                    >
                      100
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Event type and date filters */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar por tipo de evento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Todos los eventos</SelectItem>
                    <SelectItem value="ASSIGNMENT">Asignaciones</SelectItem>
                    <SelectItem value="UNASSIGNMENT">
                      Desasignaciones
                    </SelectItem>
                    <SelectItem value="ROTATION">Rotaciones</SelectItem>
                    <SelectItem value="INSPECTION">Inspecciones</SelectItem>
                    <SelectItem value="RECAP">Recapados</SelectItem>
                    <SelectItem value="DISCARD">Descartes</SelectItem>
                    <SelectItem value="OTHER">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="date"
                    placeholder="Desde"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="date"
                    placeholder="Hasta"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando eventos...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : eventsList.length === 0 ? (
            <p className="text-gray-500">
              No se encontraron eventos con los filtros aplicados.
            </p>
          ) : (
            <>
              <div className="space-y-4">
                {eventsList.map((event: any) => (
                  <div
                    key={event.id}
                    className="p-4 bg-white border shadow-sm rounded-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {new Date(event.eventDate).toLocaleDateString(
                              "es-AR",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                        <p
                          className={`font-semibold mb-1 ${getEventTypeColor(
                            event.eventType
                          )}`}
                        >
                          {getEventTypeLabel(event.eventType)}
                        </p>
                        <p className="mb-1 text-sm text-gray-700">
                          Neumático:{" "}
                          <span className="font-mono font-semibold">
                            #{event.tire?.serialNumber || "N/A"}
                          </span>
                          {event.tire?.model && (
                            <span className="ml-2 text-gray-500">
                              ({event.tire.model.brand?.name}{" "}
                              {event.tire.model.name})
                            </span>
                          )}
                        </p>
                        {event.description && (
                          <p className="text-sm text-gray-600">
                            {event.description}
                          </p>
                        )}
                        {event.metadata && (
                          <div className="mt-2 text-xs text-gray-500">
                            <details>
                              <summary className="cursor-pointer hover:text-gray-700">
                                Detalles técnicos
                              </summary>
                              <pre className="p-2 mt-1 overflow-x-auto text-xs rounded bg-gray-50">
                                {JSON.stringify(
                                  JSON.parse(event.metadata),
                                  null,
                                  2
                                )}
                              </pre>
                            </details>
                          </div>
                        )}
                      </div>
                      {event.userId && (
                        <div className="text-xs text-gray-400">
                          Usuario: {event.userId}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Página {page} de {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= totalPages}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
