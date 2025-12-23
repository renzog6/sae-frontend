// filepath: sae-frontend/lib/types/domain/equipment-transaction.ts

export interface EquipmentTransaction {
  id: number;
  equipmentId: number;
  companyId: number;
  type: EquipmentTransactionType;
  transactionDate: string;
  amount: number;
  currency: Currency;
  exchangeRate?: number;
  observation?: string;
  createdAt: string;
  updatedAt: string;
  equipment?: {
    id: number;
    name?: string;
    internalCode?: string;
  };
  company?: {
    id: number;
    name: string;
    businessName?: string;
  };
}

export interface CreateEquipmentTransactionDto {
  equipmentId: number;
  companyId: number;
  type: EquipmentTransactionType;
  date: string;
  amount: number;
  currency: string;
  exchangeRate?: number;
  observation?: string;
}

export interface EquipmentTransactionQueryDto {
  equipmentId?: number;
  companyId?: number;
  type?: EquipmentTransactionType;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export enum EquipmentTransactionType {
  PURCHASE = "PURCHASE",
  SALE = "SALE",
}

export enum Currency {
  ARS = "ARS",
  USD = "USD",
  EUR = "EUR",
}

export interface EquipmentTransactionSummary {
  totalTransactions: number;
  totalAmount: number;
  totalPurchases: number;
  totalSales: number;
  totalAmountPurchases: number;
  totalAmountSales: number;
}
