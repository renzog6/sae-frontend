// filepath: sae-frontend/app/settings/page.tsx
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Tags, Ruler } from "lucide-react";

export default function SettingsPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
            Administra Configuración
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Gestiona las entidades base del sistema de forma simple y organizada.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card: Ciudades */}
          <Link
            href="/settings/locations"
            aria-label="Ir a configuración de ciudades"
            aria-describedby="desc-locations"
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl"
            >
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-slate-300 dark:border-t-slate-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-200/20 dark:text-slate-300">
                      <Building2 className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">Ciudades</CardTitle>
                  </div>
                  <CardDescription id="desc-locations" className="text-sm">
                    Define y administra las ubicaciones disponibles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 text-slate-700 group-hover:text-slate-800 transition-colors">
                    <span className="text-sm font-medium">Abrir</span>
                    <svg
                      className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Card: Marcas */}
          <Link
            href="/settings/brands"
            aria-label="Ir a configuración de marcas"
            aria-describedby="desc-brands"
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl"
            >
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-slate-300 dark:border-t-slate-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-200/20 dark:text-slate-300">
                      <Tags className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">Marcas</CardTitle>
                  </div>
                  <CardDescription id="desc-brands" className="text-sm">
                    Gestiona las marcas para clasificar tus productos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 text-slate-700 group-hover:text-slate-800 transition-colors">
                    <span className="text-sm font-medium">Abrir</span>
                    <svg
                      className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Card: Unidades */}
          <Link
            href="/settings/units"
            aria-label="Ir a configuración de unidades"
            aria-describedby="desc-units"
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl"
            >
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-emerald-300 dark:border-t-emerald-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-200/20 dark:text-emerald-300">
                      <Ruler className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">Unidades</CardTitle>
                  </div>
                  <CardDescription id="desc-units" className="text-sm">
                    Configura unidades de medida para tus operaciones.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 text-emerald-700 group-hover:text-emerald-800 transition-colors">
                    <span className="text-sm font-medium">Abrir</span>
                    <svg
                      className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
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
