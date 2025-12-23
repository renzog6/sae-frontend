// filepath: sae-frontend/app/equipments/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Tags,
  Layers,
  Ruler,
  Wrench,
  Settings,
  Receipt,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/lib/routes";

const equipmentSections = [
  {
    title: "Equipos",
    description: "Lista, crea y edita los equipos.",
    icon: Truck,
    href: "/equipments/list",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverColor: "group-hover:text-blue-700",
    hoverBg: "group-hover:bg-blue-600",
  },
  {
    title: "Tipos de Equipos",
    description: "Administra los tipos de equipos.",
    icon: Tags,
    href: "/equipments/types",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    hoverColor: "group-hover:text-indigo-700",
    hoverBg: "group-hover:bg-indigo-600",
  },
  {
    title: "Categorías",
    description: "Gestiona las categorías de equipos.",
    icon: Layers,
    href: "/equipments/categories",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    hoverColor: "group-hover:text-purple-700",
    hoverBg: "group-hover:bg-purple-600",
  },
  {
    title: "Modelos",
    description: "Lista, crea y edita los modelos.",
    icon: Ruler,
    href: "/equipments/models",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    hoverColor: "group-hover:text-orange-700",
    hoverBg: "group-hover:bg-orange-600",
  },
  {
    title: "Transacciones",
    description: "Gestiona compras y ventas de equipos.",
    icon: Receipt,
    href: "/equipments/transactions",
    color: "text-green-600",
    bgColor: "bg-green-50",
    hoverColor: "group-hover:text-green-700",
    hoverBg: "group-hover:bg-green-600",
  },
  {
    title: "Configurador de Ejes",
    description: "Crea ejes completos con posiciones.",
    icon: Settings,
    href: routes.equipments?.list ?? "/equipments/list", // Fallback if route not defined
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    hoverColor: "group-hover:text-slate-700",
    hoverBg: "group-hover:bg-slate-600",
  },
  {
    title: "Neumáticos",
    description: "Accede al módulo completo de neumáticos.",
    icon: Wrench,
    href: routes.tires?.root ?? "/tires", // Fallback
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    hoverColor: "group-hover:text-emerald-700",
    hoverBg: "group-hover:bg-emerald-600",
  },
];

export default function EquipmentsPage() {
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
            Gestión de Equipos
          </h1>
          <p className="text-zinc-500">
            Administra todos los equipos, categorías y modelos de tu flota.
          </p>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {equipmentSections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link href={section.href} className="block h-full group">
              <Card className="h-full transition-all duration-300 border shadow-sm border-zinc-200 hover:shadow-lg hover:border-indigo-200">
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
                  <div className="flex items-center text-sm font-medium transition-colors text-zinc-500 group-hover:text-indigo-600">
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
