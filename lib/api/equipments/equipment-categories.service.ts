//filepath: sae-frontend/lib/api/equipments/equipment-categories.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import {
  EquipmentCategory,
  CreateEquipmentCategoryDto,
  UpdateEquipmentCategoryDto,
} from "@/lib/types/domain/equipment";

class EquipmentCategoriesServiceClass extends BaseApiService<
  EquipmentCategory,
  CreateEquipmentCategoryDto,
  UpdateEquipmentCategoryDto
> {
  protected basePath = "/equipment-categories";
}

export const EquipmentCategoriesService = new EquipmentCategoriesServiceClass();
