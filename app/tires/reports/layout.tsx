// filepath: sae-frontend/app/tires/reports/layout.tsx

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold text-green-700">
        Reportes de Neumáticos
      </h1>
      <nav className="flex gap-4 pb-2 mb-6 text-sm text-gray-600 border-b">
        <a href="/tires/reports/summary" className="hover:text-green-700">
          Resumen
        </a>
        <a href="/tires/reports/events" className="hover:text-green-700">
          Eventos
        </a>
      </nav>
      {children}
    </div>
  );
}
