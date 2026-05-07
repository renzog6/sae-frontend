/**
 * GraphQL Hooks Utilities
 *
 * Wrappers sobre los hooks generados por codegen para agregar:
 * - Manejo de errores consistente
 * - Invalidación automática de queries
 * - Notificaciones toast
 */

import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseQueryResult,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";

// Query client global (se inicializa lazy para evitar problemas de SSR)
let queryClient: QueryClient | null = null;

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // Server-side: retornar un cliente mock para build
    return {} as QueryClient;
  }
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutos
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return queryClient;
}

/**
 * Tipos de error GraphQL comunes
 */
export interface GraphQLError {
  message: string;
  extensions?: {
    code?: string;
    field?: string;
  };
}

/**
 * Maneja errores de GraphQL y muestra toast de error
 */
export function handleGraphQLError(
  error: unknown,
  defaultMessage = "Error en la operación",
): string {
  const errorMessage = error instanceof Error ? error.message : defaultMessage;

  // Log del error en desarrollo
  if (process.env.NODE_ENV === "development") {
    console.error("[GraphQL Error]:", error);
  }

  // Mostrar toast de error
  toast.error(errorMessage, {
    description:
      process.env.NODE_ENV === "development" ? errorMessage : undefined,
    duration: 5000,
  });

  return errorMessage;
}

/**
 * Opciones por defecto para queries
 */
export const defaultQueryOptions: Partial<UseQueryOptions> = {
  retry: 1,
  refetchOnWindowFocus: false,
};

/**
 * Hook wrapper para queries con manejo de errores y toast
 */
export function useGraphQLQuery<TData, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError, TData, QueryKey>({
    queryKey: queryKey as any,
    queryFn: async () => {
      try {
        return await queryFn();
      } catch (error) {
        handleGraphQLError(error);
        throw error;
      }
    },
    ...defaultQueryOptions,
    ...options,
  } as any);
}

/**
 * Hook wrapper para mutations con invalidación de queries y toast
 */
export function useGraphQLMutation<TData, TError, TVariables, TContext>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (
      data: TData,
      variables: TVariables,
      context?: TContext,
    ) => void;
    onError?: (
      error: TError,
      variables: TVariables,
      context?: TContext,
    ) => void;
    invalidateQueries?: QueryKey | QueryKey[];
    successMessage?: string;
    errorMessage?: string;
  },
) {
  const client = getQueryClient();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables) => {
      try {
        return await mutationFn(variables);
      } catch (error) {
        handleGraphQLError(error, options?.errorMessage);
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      // Mostrar toast de éxito
      if (options?.successMessage) {
        toast.success(options.successMessage);
      }

      // Invalidar queries si se especifica
      if (options?.invalidateQueries) {
        const queriesToInvalidate = Array.isArray(options.invalidateQueries)
          ? options.invalidateQueries
          : [options.invalidateQueries];
        queriesToInvalidate.forEach((qKey) => {
          client.invalidateQueries({ queryKey: qKey });
        });
      }

      // Callback personalizado
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
}

/**
 * Helper para crear keys de query basados en el nombre del hook
 */
export function createQueryKey(
  prefix: string,
  variables?: Record<string, unknown>,
): string[] {
  if (!variables) {
    return [prefix];
  }
  // Filtrar valores undefined y crear key simple
  const parts = [prefix];
  Object.entries(variables).forEach(([key, value]) => {
    if (value !== undefined) {
      parts.push(`${key}=${String(value)}`);
    }
  });
  return parts;
}

/**
 * Hook para obtener datos con suspense enabled
 */
export function useGraphQLQuerySuspense<TData, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery<TData, TError, TData, QueryKey>({
    queryKey,
    queryFn,
    ...options,
    suspense: true,
  } as any);
}

/**
 * Hook para mutations que requieren confirmación
 */
export function useGraphQLMutationWithConfirm<
  TData,
  TError,
  TVariables,
  TContext,
>({
  mutationFn,
  confirmMessage,
  ...options
}: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  confirmMessage: string;
  invalidateQueries?: QueryKey | QueryKey[];
  successMessage?: string;
}) {
  const mutation = useGraphQLMutation<TData, TError, TVariables, TContext>(
    mutationFn,
    {
      ...options,
      successMessage: options.successMessage || "Operación exitosa",
    },
  );

  const mutateWithConfirm = async (variables: TVariables) => {
    if (confirm(confirmMessage)) {
      return mutation.mutateAsync(variables);
    }
    return Promise.reject(new Error("Cancelled by user"));
  };

  return {
    ...mutation,
    mutate: mutateWithConfirm,
  };
}
