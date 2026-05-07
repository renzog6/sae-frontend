import { useCallback, useRef, useState } from "react";

/**
 * Hook para manejar el estado de llamadas API (loading, error, data)
 * @param initialData - Estado inicial de los datos (opcional)
 * @returns Objeto con data, loading, error, y funciones para ejecutar y resetear
 */
export function useApiState<T = any>(initialData?: T) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Ref para almacenar la última función de ejecución (para refetch)
  const executeFnRef = useRef<(() => Promise<T>) | null>(null);

  const execute = useCallback(async (fn: () => Promise<T>) => {
    // Guardar la función para posible refetch
    executeFnRef.current = fn;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await fn();
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setLoading(false);
      throw err;
    }
  }, []);

  const refetch = useCallback(async () => {
    if (executeFnRef.current) {
      return execute(executeFnRef.current);
    }
    return Promise.reject(new Error("No function to refetch"));
  }, [execute]);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
    executeFnRef.current = null;
  }, [initialData]);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
    reset,
  };
}

export default useApiState;