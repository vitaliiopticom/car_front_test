import { useMemo } from 'react';
import {
  getCoreRowModel,
  InitialTableState,
  useReactTable,
} from '@tanstack/react-table';

import { isDef } from '@/utils/common';

import { TableBody } from './elements/TableBody';
import { TableContainer } from './elements/TableContainer';
import { TableHead } from './elements/TableHead';
import { createSelectionColumn } from './columns';
import { TableColumn } from './types';

const defaultLoadingData = Array(10).fill({});

const getLoadingSkeletonRows = (count?: number) => {
  return isDef(count) ? Array(count).fill({}) : defaultLoadingData;
};

export type TableProps<D> = {
  data: D[];
  columns: TableColumn<D>[];
  initialState?: InitialTableState;
  hasRowSelection?: boolean;
  hasDataViewPagination?: boolean;
  isLoading?: boolean;
  loadingSkeletonRows?: number;
  onRowClick?: (row: D) => void;
};

export const Table = <D,>({
  data,
  initialState,
  columns,
  hasRowSelection,
  hasDataViewPagination,
  isLoading,
  loadingSkeletonRows,
  onRowClick,
}: TableProps<D>) => {
  const processedColumns = useMemo<TableColumn<D>[]>(() => {
    const baseColumns = [...columns];

    if (hasRowSelection) {
      baseColumns.unshift(createSelectionColumn());
    }

    return baseColumns;
  }, [columns, hasRowSelection]);

  const table = useReactTable<D>({
    initialState,
    data: isLoading ? getLoadingSkeletonRows(loadingSkeletonRows) : data,
    columns: processedColumns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 250,
    },
  });

  return (
    <TableContainer hasDataViewPagination={hasDataViewPagination} table={table}>
      <TableHead table={table} />
      <TableBody isLoading={isLoading} table={table} onRowClick={onRowClick} />
    </TableContainer>
  );
};
