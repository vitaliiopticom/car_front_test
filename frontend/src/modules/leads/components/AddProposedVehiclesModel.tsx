import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  DataView,
  // DataViewChangeHandler,
  QueryDataLoader,
} from '@/components/shared';

import { useTranslation } from '@/i18n';
// import { endOfTheDay, formatDateToAPI } from '@/utils/date';
import { Button, ButtonProps, Modal } from '@/components/elements';

import { useGetVehiclesQuery } from '../api/getVehicles';
import { useAddVehiclesToLeadMutation } from '../api/addVehicleToLead';
import {
  OPTICONTENT_DATA_VIEW_ID,
  // VEHICLES_FILTER_DEFAULT,
  // VEHICLES_PAGINATION_DEFAULT,
} from '../../content/constants';
// import { FilterValues } from '../../content/types';
import { AddProposedVehicleList } from './AddProposedVehicleList';
import { LeadVehicles } from '../types/leadTypes';


type ButtonConfig = ButtonProps & { key: string };

type Props = {
  isLoading: any;
  refetch: any;
  closeModal: () => void;
  isOpen: boolean;
  leadVehicles: LeadVehicles[] | undefined;
}

export const AddProposedVehicleModel = ({ isLoading, refetch, closeModal, isOpen, leadVehicles }: Props) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [selectedVehicles, setSelectedVehicles] = useState<any[]>([])
  // const filterUsed = useRef(false);


  const handleClose = () => {
    refetch();
  };
  const [addVehiclesToLead, addVehiclesToLeadState] = useAddVehiclesToLeadMutation({
      onCompleted: handleClose,
    });

  const handleCreate = () => {
    addVehiclesToLead({
      variables: {
        input: {
          leadId: id || "",
          vehicles: selectedVehicles.map((v: any) => ({
            referenceForAd: '',
            vehicleId: v.id,
            vIN: v.unitDetails[0].vIN,
          }))
        }
      },
    });
  };


  const vehiclesQuery = useGetVehiclesQuery({
    variables: {
      inputParameters: {
        clientId: "5e313eeac0bcae2488c9cded",
        vIN: "",
        referenceForAd: ""
      },
    },
  });

  // const handlePaginationAndFilterChange: DataViewChangeHandler<
  //   FilterValues
  // > = ({ pagination, filters }) => {
  //   filterUsed.current = true;
  //   // const { page, pageSize } = pagination;
  //   const { dateFrom, dateTo, ...restFilters } = filters;

  //   // vehiclesQuery.refetch({
  //   //   inputParameters: {
  //   //     pagingParameters: { pageIndex: page - 1, pageSize },
  //   //     filterParameters: {
  //   //       dateFrom: dateFrom ? formatDateToAPI(new Date(dateFrom)) : null,
  //   //       dateTo: dateTo
  //   //         ? formatDateToAPI(endOfTheDay(new Date(dateTo)))
  //   //         : null,
  //   //       ...restFilters,
  //   //     },
  //   //   },
  //   // });
  // };


  const actionsConfig: ButtonConfig[] = [
    {
      disabled: isLoading,
      variant: 'secondary',
      children: t('common.cancel'),
      key: 'cancelButton',
      onClick: () => closeModal(),
    },
    {
      disabled: isLoading || !selectedVehicles?.length,
      isLoading: isLoading,
      type: 'submit',
      children: `${t('common.create')} ${selectedVehicles?.length ? '(' + selectedVehicles.length + ')' : ''}`,
      key: 'confirmButton',
      onClick: handleCreate
    },
  ];

  const actions = (
    <div className={`flex w-full justify-end gap-4`}>
      {actionsConfig.map((buttonProps) => (
        <Button className="min-w-[125px]" {...buttonProps} />
      ))}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={t('lead.addBusiness')}
      actions={actions}
      className="container mx-auto p-4 w-11/12 max-w-screen-2xl"
    >
      <QueryDataLoader query={vehiclesQuery} keepPreviousData useCustomLoading>
        
        {({ data, isLoading, isRefetching }) => {
          if (!data || isLoading) {
            return <div>Loading...</div>; // or any other fallback UI
          }

          const vehicles = data.vehiclesByFilter?.filter((v: any) => {
            return !leadVehicles?.find((lv: LeadVehicles) => v.id === lv.vehicleId)
          });

          // return <PaginationAdapter data={items || []} id="vehicles_to_add">
          //   {(pageData) => (
          return <DataView
              data={vehicles}
              // filterDefaultValues={VEHICLES_FILTER_DEFAULT}
              id={OPTICONTENT_DATA_VIEW_ID}
              isFetching={isRefetching}
              isLoading={isLoading}
              // recordsCount={5}
              // onChange={handlePaginationAndFilterChange}
              hidePagination
            >
            <AddProposedVehicleList onVehiclesAdd={(vehicle: any) => {
              if (!selectedVehicles.find(v => v.id === vehicle.id)) {
                setSelectedVehicles(([...selectedVehicles, vehicle]));
                  } else {
                setSelectedVehicles(selectedVehicles.filter((v) => v.id !== vehicle.id));
                  }
                }}
                selectedVehicles={selectedVehicles}
                isLoading={isLoading}
              />
            </DataView>
          //   )}
          // </PaginationAdapter>
        }}
      </QueryDataLoader>
    </Modal>
  );
};
