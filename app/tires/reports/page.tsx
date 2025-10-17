import Link from "next/link";
import { routes } from "@/lib/routes"; // ajusta el path según tu estructura

export default function TireReportsPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="mt-2 text-gray-600">
          Visualiza métricas, historial de eventos y rendimiento de los
          neumáticos de la flota.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href={routes.tires.reports.summary}
          className="p-6 transition bg-white border shadow-sm rounded-2xl hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-green-700">
            Resumen general
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            KPIs, rendimiento y métricas clave de neumáticos.
          </p>
        </Link>

        <Link
          href={routes.tires.reports.events}
          className="p-6 transition bg-white border shadow-sm rounded-2xl hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-green-700">
            Historial de eventos
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Consulta las rotaciones, inspecciones, recapados y descartes
            registrados.
          </p>
        </Link>
      </section>
    </div>
  );
}
