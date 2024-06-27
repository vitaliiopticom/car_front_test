import { useMemo } from 'react';
import { useTranslation } from '@/i18n';

import { getStringWithSeparator } from '@/utils/array';
import { formatDate } from '@/utils/date';

import { DataView, createTableColumns } from '@/components/shared';
import { VehicleDetails } from '../types/vehicleTypes';

import { Checkbox, Text } from '@/components/elements';

type Props = {
  selectedVehicles: VehicleDetails[];
  onVehiclesAdd: (vehicle: VehicleDetails) => void;
  isLoading: boolean;
}

export const AddProposedVehicleList = ({ onVehiclesAdd, isLoading, selectedVehicles }: Props) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () =>
      createTableColumns<VehicleDetails>((ch) => [
        ch.accessor('id', {
          header: () => <div><Checkbox
            checked={false}
            onChange={() => { }}
            disabled
          /></div>,
          cell: ({ row }) => (
            <div
              className="text-sm font-medium"
            >
              <Checkbox
                checked={!!selectedVehicles.find(v => v.id === row.original.id)}
                onChange={() => { }}
              />
            </div>
          ),
        }),
        ch.accessor('unitDetails', {
          id: 'vin',
          header: () => t('lead.vin'),
          cell: ({ row }) => (
            <div
              className="text-sm font-normal"
            >
              {row.original.unitDetails[0].vIN}
            </div>
          ),
        }),
        ch.accessor('model', {
          header: () => t('lead.model'),
          cell: ({ row }) => (
            <div className="flex h-full w-full flex-col">
              <Text size="sm" className='text-ellipsis overflow-hidden'>
                {getStringWithSeparator([
                  row.original?.make,
                  row.original?.model,
                  row.original?.fuel,
                ])}
              </Text>
            </div>
          ),
        }),
        ch.accessor('name', {
          header: () => t('lead.finition'),
          cell: ({ row }) => {
            return <div className="text-sm font-normal text-ellipsis overflow-hidden">
              {row.original.name}
            </div>
          },
        }),
        ch.accessor('unitDetails', {
          id: 'color',
          header: () => t('lead.color'),
          cell: ({ row }) => (
            <div className="text-sm font-normal">
              {row.original.unitDetails[0].colorName}
            </div>
          ),
        }),

        ch.accessor('unitDetails', {
          id: 'km',
          header: () => t('lead.km'),
          cell: ({ row }) => {
            return <div className="text-sm font-normal">
              {row.original.unitDetails[0].kilometers}
            </div>
          },
        }),

        ch.accessor('unitDetails', {
          id: 'ref',
          header: () => t('lead.ref'),
          cell: ({ row }) => {
            return <div className="text-sm font-normal">
              {row.original.unitDetails[0].referenceForAd}
            </div>
          },
        }),

        ch.accessor('price', {
          header: () => t('lead.price'),
          cell: ({ row }) => {
            return <div className="text-sm font-normal">
              {row.original.price.netPrice}
            </div>
          },
        }),
        ch.accessor('unitDetails', {
          id: 'dataAvailable',
          header: () => t('lead.dateAvailable'),
          cell: ({ row }) => (
            <div className="text-sm font-normal">
              {!row.original.unitDetails[0].availableFromDate
                ? formatDate(new Date(row.original.unitDetails[0].availableFromDate))
                : ""}
            </div>
          ),
        }),
        // ch.display({
        //   id: '_actions',
        //   header: () => t('common.actions'),
        //   cell: ({ row }) => (
        //     <div onClick={(e) => e.stopPropagation()}>
        //       <Button onClick={() => onVehicleAdd(row.original)}>Add</Button>
        //     </div>
        //   ),
        // }),
      ]),
    [t, selectedVehicles],
  );

  return <div className="flex flex-col gap-5">
    <DataView.Table columns={columns} onRowClick={onVehiclesAdd} />
  </div>
};
