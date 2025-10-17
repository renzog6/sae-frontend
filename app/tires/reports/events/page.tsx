// filepath: sae-frontend/app/tires/reports/events/page.tsx

export default function TireReportsEventsPage() {
  const events = [
    {
      date: "2025-10-10",
      type: "Rotación",
      tire: "SN12345",
      notes: "De DI a DD en equipo 23",
    },
    {
      date: "2025-09-21",
      type: "Inspección",
      tire: "SN98765",
      notes: "Presión baja - 22 PSI",
    },
    {
      date: "2025-09-01",
      type: "Recapado",
      tire: "SN45678",
      notes: "Proveedor RecapAR",
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Historial de Eventos</h2>
      <ul className="space-y-3">
        {events.map((e, i) => (
          <li key={i} className="p-3 bg-white border shadow-sm rounded-xl">
            <p className="text-sm text-gray-500">{e.date}</p>
            <p className="font-semibold text-green-700">{e.type}</p>
            <p className="text-sm text-gray-700">
              Neumático: <span className="font-mono">{e.tire}</span>
            </p>
            <p className="text-sm text-gray-600">{e.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
