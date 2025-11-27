// filepath: sae-frontend/lib/utils/api-error-handler.ts
import { getSession } from "next-auth/react";
import { logger } from "./logger";

export interface ApiErrorContext {
  service: string;
  method: string;
  params?: Record<string, any>;
  operation?: string;
}

export class ApiErrorHandler {
  static async withErrorHandling<T>(
    operation: () => Promise<T>,
    context: ApiErrorContext
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      // Obtener información del usuario actual
      const session = await getSession();
      const userId = session?.user?.id;

      // Log estructurado con contexto completo
      logger.error(`${context.service}.${context.method} failed`, {
        service: context.service,
        method: context.method,
        operation: context.operation,
        params: context.params,
        userId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      });

      // Re-throw con mensaje estandarizado
      throw this.standardizeError(error, context);
    }
  }

  private static standardizeError(
    error: unknown,
    context: ApiErrorContext
  ): Error {
    let message: string;

    if (error instanceof Error) {
      // Mantener el mensaje original pero agregar contexto estructurado
      message = `${context.service}.${context.method}: ${error.message}`;
    } else {
      // Para errores no-Error (strings, etc.)
      message = `${context.service}.${context.method}: ${String(error)}`;
    }

    const standardizedError = new Error(message);

    // Preservar la causa original para debugging
    if (error instanceof Error) {
      standardizedError.cause = error;
    }

    // Agregar metadatos al error
    (standardizedError as any).context = context;
    (standardizedError as any).timestamp = new Date().toISOString();

    return standardizedError;
  }

  // Método helper para operaciones comunes
  static async handleApiCall<T>(
    apiCall: () => Promise<T>,
    service: string,
    method: string,
    params?: Record<string, any>
  ): Promise<T> {
    return this.withErrorHandling(apiCall, {
      service,
      method,
      params,
      operation: "api_call",
    });
  }
}
