// file: sae-frontend/types/catalog.ts

export interface Brand {
  id: number;
  name: string;
  code: string;
  information?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Unit {
  id: number;
  name: string;
  abbreviation: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}