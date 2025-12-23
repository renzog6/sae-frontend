// filepath: sae-frontend/lib/utils/equipment-transaction.ts

import {
  EquipmentTransaction,
  EquipmentTransactionType,
  Currency,
} from "@/lib/types";

export const equipmentTransactionUtils = {
  formatType: (type: EquipmentTransactionType): string => {
    switch (type) {
      case EquipmentTransactionType.PURCHASE:
        return "Compra";
      case EquipmentTransactionType.SALE:
        return "Venta";
      default:
        return type;
    }
  },

  formatCurrency: (currency: Currency): string => {
    switch (currency) {
      case Currency.ARS:
        return "ARS";
      case Currency.USD:
        return "USD";
      case Currency.EUR:
        return "EUR";
      default:
        return currency;
    }
  },

  formatAmount: (amount: number, currency: Currency): string => {
    const formatter = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    });
    return formatter.format(amount);
  },

  formatTransactionDate: (date: string): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  },

  getTransactionIcon: (type: EquipmentTransactionType): string => {
    return type === EquipmentTransactionType.PURCHASE ? "📥" : "📤";
  },

  calculateTotalAmount: (
    transactions: EquipmentTransaction[],
    type?: EquipmentTransactionType
  ): number => {
    return transactions
      .filter((t) => !type || t.type === type)
      .reduce((total, transaction) => total + transaction.amount, 0);
  },

  groupByType: (
    transactions: EquipmentTransaction[]
  ): {
    purchases: EquipmentTransaction[];
    sales: EquipmentTransaction[];
  } => {
    return {
      purchases: transactions.filter(
        (t) => t.type === EquipmentTransactionType.PURCHASE
      ),
      sales: transactions.filter(
        (t) => t.type === EquipmentTransactionType.SALE
      ),
    };
  },
};
