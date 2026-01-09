//filepath: sae-frontend/components/hooks/useGraphQLDataTable.ts
"use client";

import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    PaginationState,
    ColumnFiltersState,
} from "@tanstack/react-table";
import { useState, useMemo, useEffect } from "react";

interface Meta {
    total: number;
}

interface PaginatedResult<TItem> {
    data: TItem[];
    meta: Meta;
}

interface UseQueryHookResult<TQueryData> {
    data?: TQueryData;
    isLoading: boolean;
    error?: any;
}

interface UseGraphQLDataTableProps<TQueryData, TItem> {
    useQueryHook: (variables: {
        skip: number;
        take: number;
        where?: string;
        orderBy?: string;
    }) => UseQueryHookResult<TQueryData>;
    dataAccessor: (data: TQueryData) => PaginatedResult<TItem> | undefined | null;
    columns: ColumnDef<TItem>[];
    additionalWhere?: Record<string, any>;
    defaultPageSize?: number;
    debounceDelay?: number;
}

export function useGraphQLDataTable<TQueryData, TItem>({
    useQueryHook,
    dataAccessor,
    columns,
    additionalWhere,
    defaultPageSize = 10,
    debounceDelay = 1000,
}: UseGraphQLDataTableProps<TQueryData, TItem>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: defaultPageSize,
    });
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<ColumnFiltersState>([]);

    // Debounce inputs
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedColumnFilters(columnFilters);
            setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset page on filter change
        }, debounceDelay);
        return () => clearTimeout(handler);
    }, [columnFilters, debounceDelay]);

    // Variables de GraphQL
    const skip = pagination.pageIndex * pagination.pageSize;
    const take = pagination.pageSize;

    const where = useMemo(() => {
        const whereObj: Record<string, any> = { ...additionalWhere };

        debouncedColumnFilters.forEach((filter) => {
            // Asumimos búsqueda 'contains' por defecto
            whereObj[filter.id] = { contains: filter.value };
        });

        if (Object.keys(whereObj).length === 0) return undefined;
        return JSON.stringify(whereObj);
    }, [debouncedColumnFilters, additionalWhere]);

    const orderBy = useMemo(() => {
        if (sorting.length === 0) return undefined;
        const sortObj: Record<string, string> = {};
        sorting.forEach((sort) => {
            sortObj[sort.id] = sort.desc ? "desc" : "asc";
        });
        return JSON.stringify(sortObj);
    }, [sorting]);

    // Llamada al hook
    const { data: queryData, isLoading, error } = useQueryHook({
        skip,
        take,
        where,
        orderBy
    });

    const result = queryData ? dataAccessor(queryData) : undefined;
    const data = result?.data ?? [];
    const totalItems = result?.meta?.total ?? 0;
    const pageCount = Math.ceil(totalItems / pagination.pageSize);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination,
            columnFilters,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        manualPagination: true,
        manualFiltering: true,
        pageCount: pageCount,
    });

    return {
        table,
        isLoading,
        error,
        totalItems,
    };
}
