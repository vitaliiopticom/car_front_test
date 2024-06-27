import { flexRender, Table } from '@tanstack/react-table';

import { Skeleton } from '@/components/elements';
import { cx } from '@/utils/classNames';

type Props<D> = {
  table: Table<D>;
  isLoading?: boolean;
  onRowClick?: (row: D) => void;
};

export const TableBody = <D,>({ table, isLoading, onRowClick }: Props<D>) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className={cx(
            'cursor-pointer border-b border-gray-40 bg-white last:border-none hover:bg-gray-100 hover:opacity-95',
            row.getIsSelected() && 'bg-primary-tint-90',
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="truncate p-4 py-3 text-start text-secondary"
              style={{
                maxWidth: cell.column.getSize(),
              }}
              onClick={() => {
                if (onRowClick) {
                  onRowClick(row.original);
                }
              }}
            >
              {isLoading ? (
                <Skeleton className="h-4" />
              ) : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
