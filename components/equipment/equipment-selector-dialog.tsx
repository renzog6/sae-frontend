// filepath: sae-frontend/components/equipment/EquipmentSelectorDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Truck } from "lucide-react";
import type { Equipment } from "@/lib/types/domain/equipment";
import { useState } from "react";

interface EquipmentSelectorDialogProps {
  equipments: Equipment[];
  selectedEquipmentId: number | null;
  setSelectedEquipmentId: (id: number | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  children: React.ReactNode;
}

export function EquipmentSelectorDialog({
  equipments,
  selectedEquipmentId,
  setSelectedEquipmentId,
  searchTerm,
  setSearchTerm,
  children,
}: EquipmentSelectorDialogProps) {
  const [open, setOpen] = useState(false);

  // Filter only active equipment
  const activeEquipments = equipments.filter((eq) => eq.status === "ACTIVE");

  const filteredEquipments = activeEquipments.filter((equipment) =>
    `${equipment.name} ${equipment.model?.brand?.name} ${equipment.model?.name} ${equipment.year} ${equipment.licensePlate}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Seleccionar Equipo
          </DialogTitle>
          <DialogDescription>
            Busca y selecciona el equipo para gestionar sus neumáticos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar equipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {filteredEquipments.map((equipment) => (
                    <div
                      key={equipment.id}
                      className={`p-3 rounded-md cursor-pointer border transition-colors ${
                        selectedEquipmentId === equipment.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-muted border-border"
                      }`}
                      onClick={() => {
                        setSelectedEquipmentId(equipment.id);
                        setOpen(false);
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {equipment.name || "Sin nombre"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {equipment.model?.brand?.name || "Sin marca"}
                          {" - "}
                          {equipment.model?.name || "Sin modelo"}
                          {equipment.year && ` - ${equipment.year}`}
                          {equipment.licensePlate &&
                            ` - ${equipment.licensePlate}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
