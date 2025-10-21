// filepath: sae-frontend/app/settings/units/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Unit } from "@/lib/types/catalog";
import {
  useUnits,
  useCreateUnit,
  useUpdateUnit,
  useDeleteUnit,
} from "@/lib/hooks/useCatalogs";
import { DataTable } from "@/components/data-table";
import { getUnitColumns } from "./columns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UnitSchema, type UnitFormData } from "@/lib/validations/catalog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/toaster";
import { UnitDialog } from "@/components/units/unit-dialog";

export default function UnitsPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const { toast } = useToast();

  const { data: units = [], isLoading, error } = useUnits(accessToken);
  const { mutate: createUnit, isPending: creating } =
    useCreateUnit(accessToken);
  const { mutate: updateUnit, isPending: updating } =
    useUpdateUnit(accessToken);
  const { mutate: deleteUnit, isPending: deleting } =
    useDeleteUnit(accessToken);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const form = useForm<UnitFormData>({
    resolver: zodResolver(UnitSchema),
    defaultValues: { name: "", abbreviation: "" },
  });

  const columns = useMemo(
    () =>
      getUnitColumns({
        onEdit: (unit) => {
          setSelectedUnit(unit);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onDelete: (unit) => {
          setSelectedUnit(unit);
          setConfirmOpen(true);
        },
      }),
    [deleteUnit]
  );

  useEffect(() => {
    if (dialogMode === "edit" && selectedUnit) {
      form.reset({
        name: selectedUnit.name,
        abbreviation: selectedUnit.abbreviation,
      });
    } else if (dialogMode === "create") {
      form.reset({ name: "", abbreviation: "" });
    }
  }, [dialogMode, selectedUnit]);

  const onCreate = (data: UnitFormData) => {
    createUnit(
      { name: data.name, abbreviation: data.abbreviation },
      {
        onSuccess: () => {
          form.reset({ name: "", abbreviation: "" });
          setDialogOpen(false);
          toast({
            title: "Unidad creada",
            description: `"${data.name}" creada correctamente.`,
            variant: "success",
          });
        },
        onError: (e: any) => {
          toast({
            title: "Error al crear unidad",
            description: e?.message || "Intenta nuevamente.",
            variant: "error",
          });
        },
      }
    );
  };

  const onUpdate = (data: UnitFormData) => {
    if (!selectedUnit) return;
    updateUnit(
      {
        id: selectedUnit.id,
        data: { name: data.name, abbreviation: data.abbreviation },
      },
      {
        onSuccess: () => {
          setSelectedUnit(null);
          form.reset({ name: "", abbreviation: "" });
          setDialogOpen(false);
          toast({
            title: "Unidad actualizada",
            description: `"${data.name}" guardada correctamente.`,
            variant: "success",
          });
        },
        onError: (e: any) => {
          toast({
            title: "Error al actualizar unidad",
            description: e?.message || "Intenta nuevamente.",
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Unidades</h1>
        <Button
          onClick={() => {
            setDialogMode("create");
            setSelectedUnit(null);
            form.reset({ name: "", abbreviation: "" });
            setDialogOpen(true);
          }}
        >
          Nueva unidad
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>Gestión de unidades activas</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={units}
            searchableColumn={"name"}
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>

      <UnitDialog
        accessToken={accessToken}
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelectedUnit(null);
        }}
        mode={dialogMode}
        unit={selectedUnit}
      />

      {/* Confirm delete dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas eliminar la unidad "{selectedUnit?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedUnit) {
                  deleteUnit(selectedUnit.id, {
                    onSuccess: () => {
                      toast({
                        title: "Unidad eliminada",
                        description: `"${selectedUnit.name}" eliminada.`,
                        variant: "success",
                      });
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar unidad",
                        description: e?.message || "Intenta nuevamente.",
                        variant: "error",
                      });
                    },
                    onSettled: () => {
                      setConfirmOpen(false);
                      setSelectedUnit(null);
                    },
                  });
                }
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
