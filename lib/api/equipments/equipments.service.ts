//filepath: sae-frontend/lib/api/equipments/equipments.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
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
