// filepath: sae-frontend/lib/hooks/createApiHooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseApiService } from "@/lib/api/base-api.service";

export function createApiHooks<
  TEntity,
  TCreateDto,
  TUpdateDto,
  TQuery extends object = {}
>(
  service: BaseApiService<TEntity, TCreateDto, TUpdateDto>,
  keyPrefix: string,
  options?: {
    onCreateSuccess?: (queryClient: ReturnType<typeof useQueryClient>) => void;
    onUpdateSuccess?: (queryClient: ReturnType<typeof useQueryClient>, id: number) => void;
    onDeleteSuccess?: (queryClient: ReturnType<typeof useQueryClient>) => void;
  }
) {
  const useGetAll = (query?: TQuery) =>
    useQuery({
      queryKey: [keyPrefix, "list", query],
      queryFn: () => service.getAll(query as any),
    });

  const useGetAllNoLimit = () =>
    useQuery({
      queryKey: [keyPrefix, "list", "all"],
      queryFn: () => service.getAllNoLimit(),
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
      onSuccess: () => {
        if (options?.onCreateSuccess) {
          options.onCreateSuccess(qc);
        } else {
          qc.invalidateQueries({ queryKey: [keyPrefix, "list"] });
        }
      },
    });
  };

  const useUpdate = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (data: { id: number; dto: TUpdateDto }) =>
        service.update(data.id, data.dto),
      onSuccess: (_, { id }) => {
        if (options?.onUpdateSuccess) {
          options.onUpdateSuccess(qc, id);
        } else {
          qc.invalidateQueries({ queryKey: [keyPrefix, "detail", id] });
          qc.invalidateQueries({ queryKey: [keyPrefix, "list"] });
        }
      },
    });
  };

  const useDelete = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id: number) => service.delete(id),
      onSuccess: () => {
        if (options?.onDeleteSuccess) {
          options.onDeleteSuccess(qc);
        } else {
          qc.invalidateQueries({ queryKey: [keyPrefix, "list"] });
        }
      },
    });
  };

  return { useGetAll, useGetAllNoLimit, useGetById, useCreate, useUpdate, useDelete };
}
