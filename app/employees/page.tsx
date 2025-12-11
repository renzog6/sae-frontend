"use client";

import { motion } from "framer-motion";
import {
  Users,
  CalendarCheck,
  Ruler, // Using Ruler as a placeholder for "Positions" or similar if needed, or stick to existing icons
  Briefcase,
  Tags,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkAsBadge } from "@/components/link/badge-as-link"; // Using consistent link component if applicable, or keeping card links
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Config data for the cards to make the JSX cleaner
const employeeSections = [
  {
    title: "Empleados",
    description: "Lista, crea y edita los empleados.",
    icon: Users,
    href: "/employees/list",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverColor: "group-hover:text-blue-700",
    hoverBg: "group-hover:bg-blue-600",
  },
  {
    title: "Vacaciones",
    description: "Gestiona las vacaciones de los empleados.",
    icon: CalendarCheck, // Better icon for vacations
    href: "/employees/vacations",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    hoverColor: "group-hover:text-orange-700",
    hoverBg: "group-hover:bg-orange-600",
  },
  {
    title: "Categorías",
    description: "Gestiona las categorías de los empleados.",
    icon: Tags,
    href: "/employees/categories",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    hoverColor: "group-hover:text-emerald-700",
    hoverBg: "group-hover:bg-emerald-600",
  },
  {
    title: "Puestos",
    description: "Gestiona los puestos de los empleados.",
    icon: Briefcase,
    href: "/employees/positions",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    hoverColor: "group-hover:text-purple-700",
    hoverBg: "group-hover:bg-purple-600",
  },
];

export default function EmployeesPage() {
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
            Administración de Empleados
          </h1>
          <p className="text-zinc-500">
            Gestión integral del personal, vacaciones y configuraciones.
          </p>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employeeSections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link href={section.href} className="group block h-full">
              <Card className="h-full transition-all duration-300 border border-zinc-200 shadow-sm hover:shadow-lg hover:border-teal-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${section.bgColor} ${section.color} ${section.hoverBg} group-hover:text-white transition-colors duration-300`}
                    >
                      <section.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className={`text-xl font-semibold text-zinc-800 ${section.hoverColor} transition-colors`}>
                      {section.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-zinc-500 group-hover:text-zinc-600 transition-colors">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-zinc-500 group-hover:text-teal-600 transition-colors">
                    Abrir sección
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
