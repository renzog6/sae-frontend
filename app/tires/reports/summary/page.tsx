// filepath: sae-frontend/app/tires/reports/summary/page.tsx
"use client";

import {
  useTires,
  useAverageLifeReport,
  useCostPerKmReport,
  useOverRecappedReport,
} from "@/lib/hooks/useTires";

export default function TireReportsSummaryPage() {
  const { data: tiresData } = useTires({ status: "IN_STOCK" });
  const { data: averageLifeData } = useAverageLifeReport();
  const { data: costPerKmData } = useCostPerKmReport();
  const { data: overRecappedData } = useOverRecappedReport();

  // Calcular KPIs dinámicos
  const tiresInStock = tiresData?.data?.length || 0;
  const averageLifeKm = averageLifeData?.averageKm
    ? `${Math.round(averageLifeData.averageKm).toLocaleString()} km`
    : "N/A";
  const averageCostPerKm =
    costPerKmData && costPerKmData.length > 0
      ? `$${
          costPerKmData.reduce((sum, item) => sum + (item.costPerKm || 0), 0) /
          costPerKmData.length
        }`
      : "$0.00";
  const recapPercentage =
    overRecappedData && tiresData?.data
      ? `${Math.round(
          (overRecappedData.length / tiresData.data.length) * 100
        )}%`
      : "0%";

  const kpis = [
    { label: "Neumáticos en stock", value: tiresInStock.toString() },
    { label: "Rotaciones este mes", value: "25" }, // TODO: Implementar endpoint para rotaciones
    { label: "Costo promedio por km", value: averageCostPerKm },
    { label: "Promedio de vida útil", value: averageLifeKm },
    { label: "Porcentaje recapado", value: recapPercentage },
  ];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Resumen General</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="p-4 bg-white border shadow-sm rounded-2xl"
          >
            <p className="text-sm text-gray-600">{kpi.label}</p>
            <p className="text-xl font-bold text-green-700">{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
