// filepath: sae-frontend/app/tires/page.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ListChecks,
  PlusCircle,
  Boxes,
  Ruler,
  Truck,
  Repeat,
  RefreshCcw,
  Wrench,
  FileBarChart,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { routes } from "@/lib/routes";

// Config data for the cards to make the JSX cleaner
const tiresSections = [
  {
    title: "Listado",
    description: "Consulta todos los neumáticos registrados.",
    icon: ListChecks,
    href: routes.tires.list,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverColor: "group-hover:text-blue-700",
    hoverBg: "group-hover:bg-blue-600",
  },
  {
    title: "Nuevo neumático",
    description: "Registra un neumático en el sistema.",
    icon: PlusCircle,
    href: routes.tires.new,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    hoverColor: "group-hover:text-orange-700",
    hoverBg: "group-hover:bg-orange-600",
  },
  {
    title: "Stock",
    description: "Visualiza el estado actual del stock.",
    icon: Boxes,
    href: routes.tires.stock,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    hoverColor: "group-hover:text-emerald-700",
    hoverBg: "group-hover:bg-emerald-600",
  },
  {
    title: "Tamaños",
    description: "Administra las medidas de neumáticos.",
    icon: Ruler,
    href: routes.tires.sizes,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    hoverColor: "group-hover:text-purple-700",
    hoverBg: "group-hover:bg-purple-600",
  },
  {
    title: "Modelos",
    description: "Administra los modelos de neumáticos.",
    icon: Ruler,
    href: routes.tires.models,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    hoverColor: "group-hover:text-indigo-700",
    hoverBg: "group-hover:bg-indigo-600",
  },
  {
    title: "Configurador de Ejes",
    description: "Crea ejes completos con posiciones automáticamente.",
    icon: Settings,
    href: routes.equipments.list,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    hoverColor: "group-hover:text-slate-700",
    hoverBg: "group-hover:bg-slate-600",
  },
  {
    title: "Asignaciones",
    description: "Asigna neumáticos a los equipos.",
    icon: Truck,
    href: routes.tires.assignments,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverColor: "group-hover:text-blue-700",
    hoverBg: "group-hover:bg-blue-600",
  },
  {
    title: "Rotaciones",
    description: "Registra las rotaciones realizadas.",
    icon: Repeat,
    href: routes.tires.rotations,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    hoverColor: "group-hover:text-orange-700",
    hoverBg: "group-hover:bg-orange-600",
  },
  {
    title: "Recapados",
    description: "Gestiona los procesos de recapado.",
    icon: RefreshCcw,
    href: routes.tires.recaps,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    hoverColor: "group-hover:text-emerald-700",
    hoverBg: "group-hover:bg-emerald-600",
  },
  {
    title: "Inspecciones",
    description: "Controla el estado de los neumáticos.",
    icon: Wrench,
    href: routes.tires.inspections,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    hoverColor: "group-hover:text-purple-700",
    hoverBg: "group-hover:bg-purple-600",
  },
  {
    title: "Reportes",
    description: "Accede a KPIs, métricas y eventos.",
    icon: FileBarChart,
    href: routes.tires.reports.root,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    hoverColor: "group-hover:text-indigo-700",
    hoverBg: "group-hover:bg-indigo-600",
  },
];

export default function TiresPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Gestión de Neumáticos
          </h1>
          <p className="text-zinc-500">
            Administra todo el ciclo de vida de los neumáticos de tu flota.
          </p>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tiresSections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              href={section.href}
              className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
            >
              <Card className="h-full transition-all duration-300 border shadow-sm border-zinc-200 hover:shadow-lg hover:border-teal-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${section.bgColor} ${section.color} ${section.hoverBg} group-hover:text-white transition-colors duration-300`}
                    >
                      <section.icon className="w-5 h-5" />
                    </div>
                    <CardTitle
                      className={`text-xl font-semibold text-zinc-800 ${section.hoverColor} transition-colors`}
                    >
                      {section.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="transition-colors text-zinc-500 group-hover:text-zinc-600">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium transition-colors text-zinc-500 group-hover:text-teal-600">
                    Abrir sección
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
