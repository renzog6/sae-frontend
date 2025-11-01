// filepath: sae-frontend/app/tires/stock/page.tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTires } from "@/lib/hooks/useTires";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Package2 } from "lucide-react";

const ITEMS_PER_PAGE = 5;

export default function TireStockPage() {
  const { data: tiresData, isLoading } = useTires({
    status: "IN_STOCK",
    page: 1,
    limit: 1000,
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 🧠 Agrupación de datos
  const stockData = useMemo(() => {
    if (!tiresData) return [];

    const tires = Array.isArray(tiresData)
      ? tiresData
      : (tiresData as any)?.data ?? [];

    const sizeGroups = tires.reduce((acc: any, tire: any) => {
      const sizeCode = tire.model?.size?.mainCode || "Sin medida";
      const brandName = tire.model?.brand?.name || "Sin marca";
      const modelName = tire.model?.name || "Sin modelo";

      if (!acc[sizeCode]) {
        acc[sizeCode] = { size: sizeCode, total: 0, brands: {} };
      }
      if (!acc[sizeCode].brands[brandName]) {
        acc[sizeCode].brands[brandName] = {
          name: brandName,
          total: 0,
          models: {},
        };
      }
      if (!acc[sizeCode].brands[brandName].models[modelName]) {
        acc[sizeCode].brands[brandName].models[modelName] = {
          model: modelName,
          count: 0,
        };
      }

      acc[sizeCode].brands[brandName].models[modelName].count++;
      acc[sizeCode].brands[brandName].total++;
      acc[sizeCode].total++;
      return acc;
    }, {});

    return Object.values(sizeGroups).map((size: any) => ({
      ...size,
      brands: Object.values(size.brands).map((brand: any) => ({
        ...brand,
        models: Object.values(brand.models),
      })),
    }));
  }, [tiresData]);

  // 🔍 Filtro
  const filteredData = useMemo(() => {
    const lower = search.toLowerCase();
    return stockData.filter(
      (s: any) =>
        s.size.toLowerCase().includes(lower) ||
        s.brands.some(
          (b: any) =>
            b.name.toLowerCase().includes(lower) ||
            b.models.some((m: any) => m.model.toLowerCase().includes(lower))
        )
    );
  }, [stockData, search]);

  // 📄 Paginación
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // 💀 Skeleton durante carga
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              Cargando Stock de Neumáticos...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-1/3 h-6" />
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-2/3 h-4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
            <Package2 className="w-6 h-6 text-primary" />
            Stock de Neumáticos
          </CardTitle>
          <div className="relative mt-4">
            <Input
              placeholder="Buscar por medida, marca o modelo..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="max-w-md"
            />
          </div>
        </CardHeader>

        <CardContent>
          {filteredData.length === 0 ? (
            <p className="py-6 text-center text-muted-foreground">
              No se encontraron resultados.
            </p>
          ) : (
            <Accordion type="single" collapsible>
              {paginatedData.map((size: any, i: number) => (
                <AccordionItem key={i} value={`size-${i}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {size.size}
                    <Badge variant="outline" className="ml-2">
                      {size.total} unidades
                    </Badge>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 space-y-4">
                      {size.brands.map((brand: any, j: number) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: j * 0.05 }}
                          className="p-3 border rounded-lg bg-muted/40"
                        >
                          <Accordion type="single" collapsible>
                            <AccordionItem value={`brand-${i}-${j}`}>
                              <AccordionTrigger className="text-base">
                                {brand.name}
                                <Badge className="ml-2">{brand.total}</Badge>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pl-4 space-y-2">
                                  {brand.models.map((m: any, k: number) => (
                                    <motion.div
                                      key={k}
                                      className="flex items-center justify-between pb-1 border-b last:border-0"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: k * 0.05 }}
                                    >
                                      <span className="text-sm text-muted-foreground">
                                        {m.model}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <Progress
                                          value={(m.count / brand.total) * 100}
                                          className="w-24 h-2"
                                        />
                                        <Badge variant="secondary">
                                          {m.count}
                                        </Badge>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {/* 📑 Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={handlePrev}
              >
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={handleNext}
              >
                Siguiente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
