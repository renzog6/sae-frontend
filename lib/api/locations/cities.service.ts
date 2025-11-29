// filepath: sae-frontend/lib/api/locations/cities.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import {
  City,
  CreateCityDto,
  UpdateCityDto,
} from "@/lib/types/shared/location";

class CitiesServiceClass extends BaseApiService<
  City,
  CreateCityDto,
  UpdateCityDto
> {
  protected basePath = "/locations/cities";
}

export const CitiesService = new CitiesServiceClass();
