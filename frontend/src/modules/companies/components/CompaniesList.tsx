import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ActionsMenu, IconButton } from '@/components/elements';
import { FlagCountry } from '@/components/elements/FlagCountry/FlagCountry';
import { createTableColumns, DataView } from '@/components/shared';
import { ContactModal } from '@/components/shared/ContactModal/ContactModal';
import { ContactData } from '@/components/shared/ContactModal/types';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { useCreateContractMutation } from '@/modules/contracts';
import { ONBOARDING_STATUS } from '@/modules/onboarding';
import { createFullNameFromUser } from '@/modules/users';
import { routes } from '@/router/routesList';
import { formatDate } from '@/utils/date';

import { useUpdatePhotoBoxStatusMutation } from '../api/updatePhotoBoxStatus';
import {
  CONTRACT_ACTIONS,
  CONTRACT_STATUS,
  PHOTOBOX_STATUS,
} from '../constants';
import { Company } from '../types';

import { CompaniesListFilters } from './CompaniesListFilters';
import { CompanyChip } from './CompanyChip';
import { CompanyDeleteConfirmModal } from './CompanyDeleteConfirmModal';
import {
  UpdateContractConfirmModal,
  UpdateContractConfirmModalProps,
} from './UpdateContractConfirmModal';

type Props = {
  hasPagination?: boolean;
};

export const CompaniesList: FC<Props> = ({ hasPagination }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const canViewCompany = usePermissions(PERMISSIONS.Companies_View);
  const canEditCompany = usePermissions(PERMISSIONS.Companies_Edit);
  const canDeleteCompany = usePermissions(PERMISSIONS.Companies_Delete);
  const canViewCompanyChildProfiles = usePermissions(
    PERMISSIONS.CompanyProfiles_View_ChildTenants,
  );
  const canViewCompanyProfile = usePermissions(
    PERMISSIONS.CompanyProfiles_View,
  );

  const isAdmin = !canViewCompanyChildProfiles;

  const [companyCard, setCompanyCard] = useState<ContactData>();
  const [deletedCompany, setDeletedCompany] = useState<Company>();
  const [updateContractType, setUpdateContractType] =
    useState<Pick<UpdateContractConfirmModalProps, 'type' | 'contractId'>>();

  const [updatePhotoBoxStatus, updatePhotoBoxStatusState] =
    useUpdatePhotoBoxStatusMutation();
  const [createContract, createContractState] = useCreateContractMutation({
    onCompleted: (res, clientOptions) => {
      const companyId = String(clientOptions?.variables?.input);

      navigate(routes.contractDetail(String(res.createContract.id), companyId));
    },
  });

  const columns = useMemo(
    () =>
      createTableColumns<Company>((ch) => [
        ch.accessor('country', {
          header: () => t('common.country'),
          cell: ({ row }) => <FlagCountry name={row.original.country?.name} />,
        }),
        ch.accessor('companyName', {
          header: () => t('companies.companyAndParent'),
          cell: ({ row }) => (
            <>
              <div className="text-sm font-medium	leading-4 text-secondary">
                {row.original.companyName || '- '}
              </div>
              <div className="text-sm font-medium">
                {row.original.parentEntity?.name || ''}
              </div>
            </>
          ),
        }),
        ch.accessor('companyNickname', {
          header: () => t('common.nickname'),
          cell: ({ row }) => row.original.companyNickname || '-',
        }),
        ch.accessor('companyOwner', {
          header: () => t('common.owner'),
          cell: ({ row }) => {
            const name = row.original.companyOwner?.name;
            const lastName = row.original.companyOwner?.lastName;

            return createFullNameFromUser(name, lastName, '-');
          },
        }),
        ch.accessor('teamStatus', {
          header: () => t('companies.teamStatus'),
          cell: ({ row }) =>
            row.original.teamStatus.map((el) => el.name).join(', '),
        }),
        ch.accessor('contactFirstName', {
          header: () => t('common.mainContact'),
          cell: ({ row }) => {
            if (
              !row.original.contactFirstName &&
              !row.original.contactLastName
            ) {
              return '-';
            }

            return (
              <div className="flex">
                <IconButton
                  iconClassName="text-electric"
                  name="info"
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    setCompanyCard({
                      title: createFullNameFromUser(
                        row.original.contactFirstName,
                        row.original.contactLastName,
                      ),
                      sections: [
                        {
                          icon: 'phone',
                          value: row.original.contactPhoneNumber,
                          label: row.original.contactPhoneNumber,
                        },
                        {
                          icon: 'envelope',
                          value: row.original.contactEmail,
                          label: row.original.contactEmail,
                        },
                      ],
                    })
                  }
                />
                <span className="ml-2 mt-1">
                  {createFullNameFromUser(
                    row.original.contactFirstName,
                    row.original.contactLastName,
                  )}
                </span>
              </div>
            );
          },
        }),
        ch.accessor('optiPix', {
          header: () => t('companies.optiPix'),
          cell: ({ row }) => <CompanyChip name={row.original.optiPix?.name} />,
        }),
        // ch.accessor('optiAds', {
        //   header: () => t('companies.optiAds'),
        //   cell: ({ row }) => <CompanyChip name={row.original.optiAds?.name} />,
        // }),
        // ch.accessor('optiLeads', {
        //   header: () => t('companies.optiLeads'),
        //   cell: ({ row }) => (
        //     <CompanyChip name={row.original.optiLeads?.name} />
        //   ),
        // }),
        ch.accessor('contractState', {
          header: () => t('common.contract'),
          cell: ({ row }) => (
            <CompanyChip name={row.original.contractState?.state} />
          ),
        }),
        ch.accessor('onboardingStatus', {
          header: () => t('common.onboarding'),
          cell: ({ row }) => {
            const { contractState, onboardingStatus } = row.original;

            if (contractState.state !== CONTRACT_STATUS.SIGNED) {
              return null;
            }

            return <CompanyChip name={onboardingStatus} />;
          },
        }),
        ch.accessor('photoBoxStatus', {
          header: () => t('common.photoBox'),
          cell: ({ row }) => {
            if (
              !row.original.onboardingStatus ||
              row.original.onboardingStatus === ONBOARDING_STATUS.TO_START
            ) {
              return null;
            }

            return <CompanyChip name={row.original.photoBoxStatus} />;
          },
        }),
        ch.accessor('lastUpdate', {
          header: () => t('common.date'),
          cell: ({ row }) =>
            row.original.lastUpdate
              ? formatDate(new Date(row.original.lastUpdate))
              : '-',
        }),
        ch.display({
          id: '_actions',
          header: () => t('common.actions'),
          cell: ({ row }) => {
            const contractId = row.original.contractState.id as number;

            return (
              <ActionsMenu
                items={[
                  {
                    label: t('common.detail'),
                    to: routes.companyDetail(row.original.id.toString()),
                    isShown: canViewCompany || canViewCompanyProfile,
                  },
                  {
                    label: t('contracts.createContract'),
                    onClick: () => {
                      const { id } = row.original;

                      createContract({
                        variables: { input: id },
                      });
                    },
                    isDisabled: createContractState.loading,
                    isShown:
                      row.original.contractState.state ===
                        CONTRACT_STATUS.NO_CONTRACT && canEditCompany,
                  },
                  {
                    label: t('common.contractSigned'),
                    onClick: () =>
                      setUpdateContractType({
                        contractId,
                        type: CONTRACT_ACTIONS.sign,
                      }),
                    isDisabled: !!updateContractType,
                    isShown:
                      row.original.contractState.state ===
                        CONTRACT_STATUS.SENT && canEditCompany,
                  },
                  {
                    label: t('common.contractRefused'),
                    onClick: () =>
                      setUpdateContractType({
                        contractId,
                        type: CONTRACT_ACTIONS.refuse,
                      }),
                    isDisabled: !!updateContractType,
                    isShown:
                      row.original.contractState.state ===
                        CONTRACT_STATUS.SENT && canEditCompany,
                  },
                  {
                    label: t('companies.markPhotoBoxReady'),
                    onClick: () =>
                      updatePhotoBoxStatus({
                        variables: {
                          input: {
                            id: row.original.id,
                            status: PHOTOBOX_STATUS.READY,
                          },
                        },
                      }),
                    isDisabled: updatePhotoBoxStatusState.loading,
                    isShown:
                      row.original.onboardingStatus ===
                        ONBOARDING_STATUS.COMPLETED &&
                      row.original.photoBoxStatus !== PHOTOBOX_STATUS.READY &&
                      canEditCompany,
                  },
                  {
                    label: (
                      <span className="text-cerise">
                        {t('common.deactivate')}
                      </span>
                    ),
                    onClick: () => setDeletedCompany(row.original),
                    isShown: canDeleteCompany,
                  },
                ]}
              />
            );
          },
        }),
      ]),
    [
      t,
      canViewCompany,
      canViewCompanyProfile,
      createContractState.loading,
      canEditCompany,
      updateContractType,
      updatePhotoBoxStatusState.loading,
      canDeleteCompany,
      createContract,
      updatePhotoBoxStatus,
    ],
  );

  return (
    <>
      <div className="mb-5 flex justify-between">
        <DataView.RecordsCount />
        {isAdmin && <DataView.FiltersToggle />}
      </div>
      {isAdmin && (
        <DataView.Filters hasToggle>
          <CompaniesListFilters />
        </DataView.Filters>
      )}
      <DataView.Table columns={columns} hasDataViewPagination={hasPagination} />
      <ContactModal
        data={companyCard}
        isOpen={!!companyCard}
        onClose={() => setCompanyCard(undefined)}
      />
      <CompanyDeleteConfirmModal
        company={deletedCompany}
        isOpen={!!deletedCompany}
        onClose={() => setDeletedCompany(undefined)}
      />
      <UpdateContractConfirmModal
        isOpen={!!updateContractType}
        onClose={() => setUpdateContractType(undefined)}
        {...updateContractType}
      />
    </>
  );
};
