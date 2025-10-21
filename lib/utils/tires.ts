//filepath: sae-frontend/lib/utils/tires.ts

/**
 * Mapping of tire statuses to their corresponding color classes.
 */

export const tireStatusColors: Record<string, string> = {
  IN_USE: "bg-green-500",
  IN_STOCK: "bg-blue-500",
  UNDER_REPAIR: "bg-yellow-500",
  RECAP: "bg-purple-500",
  DISCARDED: "bg-red-500",
  DEFAULT: "bg-gray-400",
};
