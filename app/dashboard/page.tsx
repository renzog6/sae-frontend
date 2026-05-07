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
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Panel de Control
            </h1>
            <p className="text-muted-foreground">
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
              <Card className="transition-shadow shadow-sm border-border hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon
                    className={`h-4 w-4 ${
                      stat.alert ? "text-destructive" : "text-primary"
                    }`}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    {stat.trend === "up" && (
                      <TrendingUp className="w-3 h-3 mr-1 text-primary" />
                    )}
                    <span
                      className={
                        stat.trend === "up"
                          ? "text-primary font-medium"
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
          <h2 className="mb-4 text-xl font-semibold text-foreground">
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
                <Card className="h-full transition-all duration-300 border shadow-sm border-border hover:shadow-lg hover:border-primary/50 group">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 text-primary transition-colors duration-300 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground">
                        <section.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl font-semibold transition-colors text-card-foreground group-hover:text-primary">
                        {section.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground">
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
                        className="justify-start w-full transition-colors hover:bg-muted hover:text-primary"
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
