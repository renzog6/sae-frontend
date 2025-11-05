// filepath: sae-frontend/app/settings/page.tsx
"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Tags, Ruler, Users, ChevronRight } from "lucide-react";
import { routes } from "@/lib/routes";

export default function SettingsPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <div className="w-full max-w-5xl px-4 py-8 mx-auto">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: "easeOut" }
          }
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
            Administra Configuración
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Gestiona las entidades base del sistema de forma simple y
            organizada.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card: Ciudades */}
          <Link
            href={routes.settings.locations}
            aria-label="Ir a configuración de ciudades"
            aria-describedby="desc-locations"
            className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 20 }
              }
              className="rounded-2xl"
            >
              <Card className="transition-shadow border-t-4 shadow-md rounded-2xl hover:shadow-lg border-t-slate-300 dark:border-t-slate-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-200/20 dark:text-slate-300">
                      <Building2 className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      Ciudades
                    </CardTitle>
                  </div>
                  <CardDescription id="desc-locations" className="text-sm">
                    Define y administra las ubicaciones disponibles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 transition-colors text-slate-700 group-hover:text-slate-800">
                    <span className="text-sm font-medium">Abrir</span>
                    <ChevronRight className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Card: Marcas */}
          <Link
            href={routes.settings.brands}
            aria-label="Ir a configuración de marcas"
            aria-describedby="desc-brands"
            className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 20 }
              }
              className="rounded-2xl"
            >
              <Card className="transition-shadow border-t-4 shadow-md rounded-2xl hover:shadow-lg border-t-slate-300 dark:border-t-slate-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-200/20 dark:text-slate-300">
                      <Tags className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      Marcas
                    </CardTitle>
                  </div>
                  <CardDescription id="desc-brands" className="text-sm">
                    Gestiona las marcas para clasificar tus productos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 transition-colors text-slate-700 group-hover:text-slate-800">
                    <span className="text-sm font-medium">Abrir</span>
                    <ChevronRight className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Card: Unidades */}
          <Link
            href={routes.settings.units}
            aria-label="Ir a configuración de unidades"
            aria-describedby="desc-units"
            className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 20 }
              }
              className="rounded-2xl"
            >
              <Card className="transition-shadow border-t-4 shadow-md rounded-2xl hover:shadow-lg border-t-emerald-300 dark:border-t-emerald-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-200/20 dark:text-emerald-300">
                      <Ruler className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      Unidades
                    </CardTitle>
                  </div>
                  <CardDescription id="desc-units" className="text-sm">
                    Configura unidades de medida para tus operaciones.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 transition-colors text-emerald-700 group-hover:text-emerald-800">
                    <span className="text-sm font-medium">Abrir</span>
                    <ChevronRight className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Card: Usuarios */}
          <Link
            href={routes.users.root}
            aria-label="Ir a configuración de usuarios"
            aria-describedby="desc-users"
            className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 20 }
              }
              className="rounded-2xl"
            >
              <Card className="transition-shadow border-t-4 shadow-md rounded-2xl hover:shadow-lg border-t-emerald-300 dark:border-t-emerald-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-200/20 dark:text-emerald-300">
                      <Users className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      Usuarios
                    </CardTitle>
                  </div>
                  <CardDescription id="desc-users" className="text-sm">
                    Gestiona los usuarios del sistema.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 transition-colors text-emerald-700 group-hover:text-emerald-800">
                    <span className="text-sm font-medium">Abrir</span>
                    <ChevronRight className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </div>
      </div>
    </>
  );
}
