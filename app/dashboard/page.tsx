//filepath: sae-frontend/app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Briefcase,
  Users,
  Truck,
  Disc,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
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
    icon: Briefcase,
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
    icon: Users,
    links: [
      { title: "Listado de Empleados", href: routes.employees.list },
      { title: "Nuevo Empleado", href: routes.employees.new },
      { title: "Vacaciones", href: "/employees/vacations" },
    ],
  },
  {
    title: "Equipos",
    description: "Gestión de equipos, tipos y modelos.",
    icon: Truck,
    links: [
      { title: "Listado de Equipos", href: routes.equipments.list },
      { title: "Nuevo Equipo", href: routes.equipments.new },
      { title: "Categorías", href: routes.equipments.categories },
      { title: "Modelos", href: routes.equipments.models },
    ],
  },
  {
    title: "Neumáticos",
    description: "Administración integral del ciclo de vida.",
    icon: Disc,
    links: [
      { title: "Listado de Neumáticos", href: routes.tires.list },
      { title: "Stock", href: routes.tires.stock },
      { title: "Inspecciones", href: routes.tires.inspections },
      { title: "Reportes y Métricas", href: routes.tires.reports.root },
    ],
  },
];

const stats = [
  {
    title: "Total Empleados",
    value: "1,240",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Equipos Activos",
    value: "845",
    change: "+5.2%",
    trend: "up",
    icon: Truck,
  },
  {
    title: "Empresas",
    value: "32",
    change: "0%",
    trend: "neutral",
    icon: Briefcase,
  },
  {
    title: "Alertas Pendientes",
    value: "05",
    change: "-2",
    trend: "down",
    icon: AlertTriangle,
    alert: true,
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              Panel de Control
            </h1>
            <p className="text-zinc-500">
              Bienvenido de nuevo al Sistema de Administración Empresarial.
            </p>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="transition-shadow shadow-sm border-zinc-200 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-zinc-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon
                    className={`h-4 w-4 ${
                      stat.alert ? "text-amber-500" : "text-teal-600"
                    }`}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-zinc-900">
                    {stat.value}
                  </div>
                  <div className="flex items-center mt-1 text-xs text-zinc-500">
                    {stat.trend === "up" && (
                      <TrendingUp className="w-3 h-3 mr-1 text-emerald-500" />
                    )}
                    <span
                      className={
                        stat.trend === "up"
                          ? "text-emerald-500 font-medium"
                          : ""
                      }
                    >
                      {stat.change}
                    </span>
                    <span className="ml-1">desde el mes pasado</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Access Sections */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            Accesos Directos
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                <Card className="h-full transition-all duration-300 border shadow-sm border-zinc-200 hover:shadow-lg hover:border-teal-200 group">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 text-teal-600 transition-colors duration-300 rounded-lg bg-teal-50 group-hover:bg-teal-600 group-hover:text-white">
                        <section.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl font-semibold transition-colors text-zinc-800 group-hover:text-teal-700">
                        {section.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-zinc-500">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {section.links.map((link) => (
                      <LinkAsBadge
                        key={link.title}
                        icon={ChevronRight}
                        href={link.href}
                        title={link.title}
                        className="justify-start w-full transition-colors hover:bg-teal-50 hover:text-teal-700"
                        variant="outline"
                      />
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
