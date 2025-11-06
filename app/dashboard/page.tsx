//filepath: sae-frontend/app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { LinkAsBadge } from "@/components/link/badge-as-link";
import { routes } from "@/lib/routes";

// 🔹 Config centralizada para las secciones
const sections = [
  {
    title: "Empresas",
    description: "Administración de compañías registradas.",
    links: [
      {
        title: "Listado de Empresas",
        href: routes.companies?.list ?? "/companies/list",
      },
      {
        title: "Nueva Empresa",
        href: routes.companies?.new ?? "/companies/new",
      },
    ],
  },
  {
    title: "Empleados",
    description: "Gestión del personal y sus registros.",
    links: [
      { title: "Listado de Empleados", href: routes.employees.list },
      { title: "Nuevo Empleado", href: routes.employees.new },
      { title: "Vacaciones", href: "/employees/vacations" },
    ],
  },
  {
    title: "Equipos",
    description: "Gestión de equipos, tipos y modelos.",
    links: [
      { title: "Listado de Equipos", href: routes.equipments.list },
      { title: "Nuevo Equipo", href: routes.equipments.new },
      { title: "Categorías", href: routes.equipments.categories },
      { title: "Modelos", href: routes.equipments.models },
    ],
  },
  {
    title: "Neumáticos",
    description: "Administración integral del ciclo de vida de los neumáticos.",
    links: [
      { title: "Listado de Neumáticos", href: routes.tires.list },
      { title: "Stock", href: routes.tires.stock },
      { title: "Inspecciones", href: routes.tires.inspections },
      { title: "Reportes y Métricas", href: routes.tires.reports.root },
    ],
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Bienvenida */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-sm col-span-full border-laurel-200 bg-linear-to-r from-laurel-50 to-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-laurel-900">
                ¡Bienvenido al Sistema!
              </CardTitle>
              <CardDescription className="text-base text-laurel-600">
                Has iniciado sesión exitosamente. Desde aquí puedes acceder a
                todas las funcionalidades principales del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-laurel-500"></span>
                <span className="text-sm text-laurel-600">
                  Sistema operativo SAE
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Secciones principales */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <Card className="transition-all duration-200 border-laurel-200 hover:shadow-md hover:border-laurel-300">
                <CardHeader>
                  <CardTitle className="text-xl font-medium text-laurel-800">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-laurel-600">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.links.map((link) => (
                    <LinkAsBadge
                      key={link.title}
                      icon={ChevronRight}
                      href={link.href}
                      title={link.title}
                    />
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
