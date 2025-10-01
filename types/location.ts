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
  personId?: number | null;
  companyId?: number | null;
}
