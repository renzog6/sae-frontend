//filepath: sae-frontend/lib/api/equipments/equipments.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import {
  Equipment,
  CreateEquipmentDto,
  UpdateEquipmentDto,
} from "@/lib/types/domain/equipment";

class EquipmentsServiceClass extends BaseApiService<
  Equipment,
  CreateEquipmentDto,
  UpdateEquipmentDto
> {
  protected basePath = "/equipments";
}

export const EquipmentsService = new EquipmentsServiceClass();

// Export hooks for consistent usage
export const {
  useGetAll: useEquipments,
  useGetById: useEquipmentById,
  useCreate: useCreateEquipment,
  useUpdate: useUpdateEquipment,
  useDelete: useDeleteEquipment,
} = createApiHooks(EquipmentsService, "equipments");
