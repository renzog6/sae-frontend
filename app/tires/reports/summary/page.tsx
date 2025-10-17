// filepath: sae-frontend/app/tires/reports/summary/page.tsx

export default function TireReportsSummaryPage() {
  const kpis = [
    { label: "Neumáticos en stock", value: 42 },
    { label: "Rotaciones este mes", value: 25 },
    { label: "Costo promedio por km", value: "$0.85" },
    { label: "Promedio de vida útil", value: "75.000 km" },
    { label: "Porcentaje recapado", value: "18%" },
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
