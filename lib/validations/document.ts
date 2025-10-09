// filepath: sae-frontend/lib/validations/document.ts

import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const uploadDocumentSchema = z.object({
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
});

export const validateFileSize = (file: File | null): boolean => {
  if (!file) return false;
  return file.size <= MAX_FILE_SIZE;
};

export const getFileSizeError = (file: File | null): string | null => {
  if (!file) return null;
  if (file.size > MAX_FILE_SIZE) {
    return `El archivo es demasiado grande. Tamaño máximo permitido: ${formatFileSize(
      MAX_FILE_SIZE
    )}`;
  }
  return null;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export type UploadDocumentFormData = z.infer<typeof uploadDocumentSchema>;
