// filepath: sae-frontend/types/location.ts

export interface Country {
  id: number;
  name: string;
  code: string; // ISO code, e.g. 'AR'
}

export interface Province {
  id: number;
  name: string;
  code?: string;
  countryId: number;
  country?: Country;
}

export interface City {
  id: number;
  name: string;
  postalCode?: string;
  provinceId: number;
  province?: Province;
}

export interface Address {
  id: number;
  street?: string;
  number?: string;
  floor?: string;
  apartment?: string;
  cityId: number;
  city?: City;
  latitude?: number;
  longitude?: number;
  neighborhood?: string;
  reference?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  personId?: number | null;
  companyId?: number | null;
}

export interface CreateCountryDto {
  name: string;
  isoCode: string;
  code?: string;
}

export interface UpdateCountryDto extends Partial<CreateCountryDto> {}

export interface CreateProvinceDto {
  code: string;
  name: string;
  countryId: number;
}

export interface UpdateProvinceDto extends Partial<CreateProvinceDto> {}

export interface CreateCityDto {
  name: string;
  postalCode: string;
  provinceId: number;
}

export interface UpdateCityDto extends Partial<CreateCityDto> {}

export interface CreateAddressDto {
  street?: string;
  number?: string;
  floor?: string;
  apartment?: string;
  cityId: number;
  latitude?: number;
  longitude?: number;
  neighborhood?: string;
  reference?: string;
  isActive?: boolean;
  personId?: number;
  companyId?: number;
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> {}
