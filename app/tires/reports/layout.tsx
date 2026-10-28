// filepath: sae-frontend/app/tires/reports/layout.tsx
import Link from "next/link";

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
        <Link href="/tires/reports/summary" className="hover:text-green-700">
          Resumen
        </Link>
        <Link href="/tires/reports/events" className="hover:text-green-700">
          Eventos
        </Link>
      </nav>
      {children}
    </div>
  );
}
