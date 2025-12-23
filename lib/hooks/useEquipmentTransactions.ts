// filepath: sae-frontend/lib/hooks/useEquipmentTransactions.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EquipmentTransactionsService } from "@/lib/api/equipments";
import {
  CreateEquipmentTransactionDto,
  EquipmentTransactionQueryDto,
} from "@/lib/types";

const equipmentTransactionsService = new EquipmentTransactionsService();

export function useEquipmentTransactions(query?: EquipmentTransactionQueryDto) {
  return useQuery({
    queryKey: ["equipment-transactions", query],
    queryFn: () => equipmentTransactionsService.findAll(query),
  });
}

export function useEquipmentTransactionsByEquipment(equipmentId: number) {
  return useQuery({
    queryKey: ["equipment-transactions", "by-equipment", equipmentId],
    queryFn: () => equipmentTransactionsService.findByEquipment(equipmentId),
    enabled: !!equipmentId,
  });
}

export function useCreateEquipmentTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEquipmentTransactionDto) =>
      equipmentTransactionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipment-transactions"] });
    },
  });
}

export function useEquipmentTransactionSummary(equipmentId?: number) {
  return useQuery({
    queryKey: ["equipment-transactions", "summary", equipmentId],
    queryFn: () => equipmentTransactionsService.getSummary(equipmentId),
    enabled: !!equipmentId,
  });
}
