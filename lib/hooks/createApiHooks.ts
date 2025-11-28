// filepath: sae-frontend/lib/hooks/createApiHooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseApiService } from "@/lib/api/base-api.service";

export function createApiHooks<
  TEntity,
  TCreateDto,
  TUpdateDto,
  TQuery extends object = {}
>(service: BaseApiService<TEntity, TCreateDto, TUpdateDto>, keyPrefix: string) {
  const useGetAll = (query?: TQuery) =>
    useQuery({
      queryKey: [keyPrefix, "list", query],
      queryFn: () => service.getAll(query as any),
    });

  const useGetById = (id: number) =>
    useQuery({
      queryKey: [keyPrefix, "detail", id],
      queryFn: () => service.getById(id),
      enabled: !!id,
    });

  const useCreate = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (dto: TCreateDto) => service.create(dto),
      onSuccess: () => qc.invalidateQueries({ queryKey: [keyPrefix, "list"] }),
    });
  };

  const useUpdate = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (data: { id: number; dto: TUpdateDto }) =>
        service.update(data.id, data.dto),
      onSuccess: (_, { id }) => {
        qc.invalidateQueries({ queryKey: [keyPrefix, "detail", id] });
        qc.invalidateQueries({ queryKey: [keyPrefix, "list"] });
      },
    });
  };

  const useDelete = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id: number) => service.delete(id),
      onSuccess: () => qc.invalidateQueries({ queryKey: [keyPrefix, "list"] }),
    });
  };

  return {
    useGetAll,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
  };
}
