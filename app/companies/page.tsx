"use client";

import { motion } from "framer-motion";
import { Building2, Tags, Layers, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const companySections = [
  {
    title: "Empresas",
    description: "Lista, crea y edita las empresas.",
    icon: Building2,
    href: "/companies/list",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverColor: "group-hover:text-blue-700",
    hoverBg: "group-hover:bg-blue-600",
  },
  {
    title: "Categorías de Empresas",
    description: "Administra las categorías de empresas.",
    icon: Tags,
    href: "/companies/business-categories",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    hoverColor: "group-hover:text-indigo-700",
    hoverBg: "group-hover:bg-indigo-600",
  },
  {
    title: "Subcategorías de Empresas",
    description: "Gestiona las subcategorías de empresas.",
    icon: Layers,
    href: "/companies/business-subcategories",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    hoverColor: "group-hover:text-purple-700",
    hoverBg: "group-hover:bg-purple-600",
  },
];

export default function CompaniesMainPage() {
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
            Gestión de Empresas
          </h1>
          <p className="text-zinc-500">
            Administra todas las empresas, categorías y subcategorías de tu
            sistema.
          </p>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companySections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link href={section.href} className="group block h-full">
              <Card className="h-full transition-all duration-300 border border-zinc-200 shadow-sm hover:shadow-lg hover:border-indigo-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${section.bgColor} ${section.color} ${section.hoverBg} group-hover:text-white transition-colors duration-300`}
                    >
                      <section.icon className="h-5 w-5" />
                    </div>
                    <CardTitle
                      className={`text-xl font-semibold text-zinc-800 ${section.hoverColor} transition-colors`}
                    >
                      {section.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-zinc-500 group-hover:text-zinc-600 transition-colors">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-zinc-500 group-hover:text-indigo-600 transition-colors">
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
