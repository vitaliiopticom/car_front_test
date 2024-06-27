import { FC, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { debounce } from 'lodash';

import { ActionsMenu, Button } from '@/components/elements';
import { FormModal, Page, Tabs } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { routes } from '@/router/routesList';

import CountdownTimer from '../components/CountdownTimer';
import { useGetLeadByIdQuery } from '../api/getLeadById';

import { LeadState } from '../components/LeadState';
import { BusinessState } from '../components/BusinessState';
import LeadOverview from './tabs/LeadOverview';
import LeadCommunication from './tabs/LeadCommunication';
import { UserDetailSkeleton } from '@/modules/users/components/UserDetailSkeleton';
import { useUpdateLeadMutation } from '../api/updateLead';
import {
  UpdateLeadFormValues,
  LeadStateEnum,
  BusinessStateEnum,
  LeadFormValuesBase
} from '../types/leadTypes';

export const LeadDetailPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, loading, refetch } = useGetLeadByIdQuery({
    variables: { id: id || '' },
  });

  const [updateLead, updateLeadState] = useUpdateLeadMutation({
    onCompleted: () => {
      refetch();
    }
  });

  const onSubmit = () => {
    console.log('lead closed');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  const openTimerModal = () => setIsTimerModalOpen(true);
  const closeTimerModal = () => {
    setIsTimerModalOpen(false);
  };
  const navigateToOtherPage = () => navigate('/leads');

  const debouncedUpdate = useRef(
    debounce(async (updatedValue) => {
      updateLead({
        variables: {
          input: updatedValue,
        },
      });
    }, 700)
  ).current;


  const handleUpdateLead = (values: UpdateLeadFormValues) => {
    debouncedUpdate(values);
  };

  const onStatusChange = (s: any, isBusinessState: boolean) => {
    const { leadById } = data!;
    if (!leadById?.id) {
      return
    }

    const d = {
      id: leadById.id,
      clientInformation: {
        ...leadById.clientInfo,
      },
      rating: leadById.rating || 0,
      leadState: !isBusinessState ? s : (leadById.leadState || LeadStateEnum.ToProcess),
      businessState: isBusinessState ? s : (leadById.businessState || BusinessStateEnum.Caropticom),
    }
    handleUpdateLead(d as LeadFormValuesBase);
  }

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);



  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isTimerModalOpen) {
      timeoutId = setTimeout(() => {
        navigateToOtherPage();
      }, 10000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isTimerModalOpen]);

  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [
    {
      title: t('lead.overview'),
      content: loading ? (
        <UserDetailSkeleton />
      ) : (
        <LeadOverview
          data={data!}
          onChange={(values: any) => {
            // @ts-ignore
            const { clientInformation: { __typename, ...restClientInfo }, ...restValues } = values;
            const { leadById } = data!;
            const leadValues = {
              ...restValues,
              clientInformation: { ...restClientInfo, language: restClientInfo.language?.toUpperCase() || '' },
              leadState: leadById?.leadState || LeadStateEnum.ToProcess,
              businessState: leadById?.businessState || BusinessStateEnum.Caropticom,
            };

            handleUpdateLead(leadValues);
          }}
          isSaving={updateLeadState.loading}
        />
      ),
    },
    {
      title: t('lead.communication'),
      content: <LeadCommunication />,
      disabled: true,
    },
    // {
    //   title: t('lead.vehicle'),
    //   content: <div>{t('common.soon')}</div>,
    //   locked: true,
    // },
    // {
    //   title: t('lead.documents'),
    //   content: <div>{t('common.soon')}</div>,
    //   locked: true,
    // },
    // {
    //   title: t('lead.history'),
    //   content: <div>{t('common.soon')}</div>,
    //   locked: true,
    // },
    {
      title: t('lead.information'),
      content: <div>{t('common.soon')}</div>,
      locked: true,
      disabled: true
    },
  ];

  return (
    <Page
      actions={
        <>
          <div className="flex flex-col items-center justify-start gap-3 sm:flex-row">
            <div className="w-full sm:w-4/5">
              <CountdownTimer
                initialTimeInMinutes={10}
                currentTimeInMinutes={10}
                onTimeUp={openTimerModal}
              />
            </div>
            <div className="flex  flex-row items-center">
              <LeadState onChange={(s: string) => {
                onStatusChange(s, false);
              }}
              value={data?.leadById?.leadState}
              />
            </div>
            <div className="flex  flex-row items-center">
              <BusinessState onChange={(s: string) => {
                onStatusChange(s, true);
              }}
              value={data?.leadById?.businessState}
              />
            </div>

            <div className=" flex  flex-row items-center">
              <Button
                variant="secondary"
                onClick={() => navigate(routes.leads())}
              >
                {t('common.back')}
              </Button>
            </div>
            <div className=" flex  flex-row items-center">
              <Button
                disabled={loading}
                isLoading={loading}
                onClick={openModal}
              >
                {t('common.close')}
              </Button>
            </div>
            {/* <div className=" flex  flex-row items-center">
              <ActionsMenu
                items={[
                  {
                    label: t('lead.history'),
                    to: routes.leads(),
                  },
                  {
                    label: t('common.lost'),
                    to: routes.leads(),
                  },
                  {
                    label: t('common.delete'),
                    to: routes.leads(),
                  },
                ]}
              />
            </div> */}
          </div>
        </>
      }
      backButton={true}
      title={
        <div className="flex items-center">
          <span>{t('leads.detailPageLabel')}</span>
          {/* <span className="mx-3 text-3xl">| {'DEALERSHIP'}</span> */}
        </div>
      }
    >
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <FormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formId="close-lead-form"
        title={t('lead.close')}
        submitLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        onSubmit={onSubmit}
      >
        <LeadState onChange={(s: string) => {
          onStatusChange(s, false);
        }} value={data?.leadById?.leadState}
        />
      </FormModal>
      <FormModal
        isOpen={isTimerModalOpen}
        onClose={closeTimerModal}
        formId="timer-modal"
        title={t('common.TimesUp')}
        submitLabel={t('common.exit')}
        cancelLabel={t('common.continue')}
        onSubmit={navigateToOtherPage}
      >
        <p>{t('common.timerFinished')}</p>
      </FormModal>
    </Page>
  );
};
