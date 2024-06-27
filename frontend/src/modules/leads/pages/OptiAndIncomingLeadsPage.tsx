import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Modal } from '@/components/elements';
import {
  DataView,
  DataViewFiltersChangeHandler,
  Page,
  PaginationAdapter,
  QueryDataLoader,
} from '@/components/shared';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';

import { LeadsList } from '../components/LeadsList';

import {
  CreateLeadFormValues,
  LeadStateEnum,
  LeadsListFiltersType,
} from '../types/leadTypes';
import { useGetLeadsQuery } from '../api/getLeads';
import {
  LEADS_DATA_VIEW_ID,
  leadsListFiltersDefaultValues,
} from '../constants';
import { useCreateLeadMutation } from '../api/createLead';
import { LeadFormModal } from '../components/LeadFormModal';
import { useTenant } from '@/modules/tenants';
import { useDeleteLeadMutation } from '../api/deleteLeadById';
import { routes } from '@/router/routesList';
import IncomingLeadsList from '../components/IncomingLeadsList';

const getParameters = (status?: LeadStateEnum) => {
  return {
    pagingParameters: {
      pageIndex: 1, // Example page index
      pageSize: 10, // Example page size
    },
    filterParameters: {
      firstResponse: false, // Example filter
      leadState: status || LeadStateEnum.ToProcess, // Example lead state
    }
  }
};

export const OptiAndIncomingLeadsPage: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const createModal = useDisclosure();
  const deleteModal = useDisclosure();
  
  const isIncomingLeads = pathname === routes.incomingLeads();
  const tenant = useTenant().tenant;
  const tenantId = tenant?.id || '';

  const [selectedLeads, setSelectedLeads] = useState<any[]>([]);

  const leadsQuery = useGetLeadsQuery({
    variables: {
      inputParameters: getParameters((isIncomingLeads ? LeadStateEnum.ToProcess : '') as LeadStateEnum)
    }
  });

  const [createLead, createLeadState] = useCreateLeadMutation({
    onCompleted: createModal.onClose,
  });

  const [deleteLead, deleteLeadState] = useDeleteLeadMutation({
    onCompleted: () => {
      deleteModal.onClose();
      setSelectedLeads([]);
    },
  });

  const handleDeleteLeads = (id?: string) => {
    deleteLead({
      variables: {
        leadId: selectedLeads[0].id
      }
    })
  }

  const handleCreateLead = (values: CreateLeadFormValues) => {
    const { ...restValues } = values;
    const clientInformation = restValues.clientInformation;

    const leadValues = {
      ...restValues,
      clientInformation: { ...clientInformation, language: clientInformation.language?.toUpperCase() || '' },
      tenantId,
    };

    createLead({
      variables: {
        input: leadValues,
      },
    });
  };

  const handleChange: DataViewFiltersChangeHandler<LeadsListFiltersType> = (
    filters,
  ) => {
    // leadsQuery.refetch({ filters });
  };

  return (
    <>
      <Page
        actions={
          !isIncomingLeads && <Button onClick={createModal.onOpen}>{t('leads.addNew')}</Button>
        }
        title={`${t('leads.pageLabel')}: ${isIncomingLeads ? t('leads.incoming') : tenant?.name || ''}`}
      >
        <QueryDataLoader query={leadsQuery} keepPreviousData useCustomLoading>
          {({ data, isLoading, isRefetching }) => (
            <PaginationAdapter data={data?.leads || []} id={LEADS_DATA_VIEW_ID}>
              {(pageData) => (
                <DataView
                  filterDefaultValues={leadsListFiltersDefaultValues}
                  data={pageData}
                  id={LEADS_DATA_VIEW_ID}
                  isFetching={isRefetching}
                  isLoading={isLoading || isRefetching}
                  recordsCount={data?.leads?.length}
                  onFiltersChange={handleChange}
                >

                  {isIncomingLeads ? <IncomingLeadsList
                    selectedLeads={selectedLeads}
                    setSelectedLeads={setSelectedLeads}
                    deleteLeads={
                      () => deleteModal.onOpen()
                      // handleDeleteLeads
                    }
                  />


                    : <LeadsList
                      onTabChange={(status: LeadStateEnum) => {
                        leadsQuery.refetch({ inputParameters: getParameters(status) })
                      }}
                      selectedLeads={selectedLeads}
                      setSelectedLeads={setSelectedLeads}
                      deleteLeads={
                        () => deleteModal.onOpen()
                        // handleDeleteLeads
                      }
                    />}
                </DataView>
              )}
            </PaginationAdapter>
          )}
        </QueryDataLoader>
        {createModal.isOpen && <LeadFormModal
          isLoading={createLeadState.loading}
          isOpen={createModal.isOpen}
          title={t('leads.addNew')}
          onClose={createModal.onClose}
          onSubmit={handleCreateLead}
        />}
        <Modal
          actions={[
            <Button
              key="delete"
              className="min-w-[125px]"
              children={t('common.delete')}
              onClick={() => handleDeleteLeads()}
              disabled={deleteLeadState.loading}
            />,
            <Button
              key="cancel"
              className="min-w-[125px]"
              children={t('common.cancel')}
              onClick={() => deleteModal.onClose()}
              variant="secondary"
              disabled={deleteLeadState.loading}
            />
          ]}

          isOpen={deleteModal.isOpen}
          title={t('leads.deleteGroup')}
        >{null}</Modal>
      </Page>
    </>
  );
};
