import { FC, useMemo } from 'react';

import { createTableColumns, DataView } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { ProductListFilters } from './ProductListFilters';
import StatusCell from './Cells/StatusCell';
import ClonedCell from './Cells/ClonedCell';

/**
 *  Renders the product list.
 * @returns The product list component.
 */
export const ProductList: FC = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () =>
      createTableColumns<any>((ch) => [
        ch.accessor('clon', {
          header: () => t('common.clon'),
          cell: ({ row }) => <ClonedCell isCloned={row.original.clon} />,
        }),
        ch.accessor('status', {
          header: () => t('common.status'),
          cell: ({ row }) => <StatusCell status={row.original.status} />,
        }),
        ch.accessor('vin', {
          header: () => t('common.vin'),
        }),
        ch.accessor('brand', {
          header: () => t('common.brand'),
        }),
        ch.accessor('model', {
          header: () => t('common.model'),
        }),
        ch.accessor('finition', {
          header: () => t('common.finition'),
        }),
        ch.accessor('color', {
          header: () => t('common.color'),
        }),
        ch.accessor('km', {
          header: () => t('common.km'),
        }),
        ch.accessor('ref', {
          header: () => t('common.ref'),
        }),
        ch.accessor('price', {
          header: () => t('common.price'),
        }),
        ch.accessor('dateAvailable', {
          header: () => t('common.dateAvailable'),
        }),
        ch.accessor('localization', {
          header: () => t('common.localization'),
        }),
        ch.accessor('localization', {
          header: () => t('common.localization'),
        }),
        ch.accessor('dateMatriculation', {
          header: () => t('common.dateMatriculation'),
        }),
        ch.accessor('images', {
          header: () => t('common.images'),
        }),
      ]),
    [t],
  );

  return (
    <section title="dataview-content">
      <div className="mb-5 flex justify-between">
        <DataView.RecordsCount />
        <DataView.FiltersToggle />
      </div>
      <DataView.Filters hasToggle>
        <ProductListFilters />
      </DataView.Filters>
      <DataView.Table columns={columns} />
    </section>
  );
};
