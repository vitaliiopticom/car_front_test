import { FC, useMemo, useState } from 'react';

import { Avatar, Text } from '@/components/elements';
import { FlagCountry } from '@/components/elements/FlagCountry/FlagCountry';
import { createTableColumns, DataView } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { QUESTIONNAIRE_TYPE } from '../constants';
import { Audit, AuditHistoryModalInput } from '../types';
import { joinAvatars } from '../utils';

import { AuditHistoryModal } from './AuditHistoryModal';
import { AuditListActionMenu } from './AuditListActionMenu';
import { AuditListFilters } from './AuditListFilters';
import { AuditsOptiStatusWithTooltip } from './AuditsOptiStatusWithTooltip';
import { SelectTemplateAudit } from './SelectTemplateModal';

type Props = {
  onStartPreAudit: (audit: SelectTemplateAudit) => void;
};

export const AuditsListForAdmin: FC<Props> = ({ onStartPreAudit }) => {
  const [historyModalInput, setHistoryModalInput] =
    useState<AuditHistoryModalInput>();

  const { t } = useTranslation();

  const columns = useMemo(
    () =>
      createTableColumns<Audit>((ch) => [
        ch.accessor('companyCountryName', {
          header: () => t('common.country'),
          cell: ({ row }) => (
            <FlagCountry name={row.original?.companyCountryName} />
          ),
        }),
        ch.display({
          id: 'companyName-parentEntity',
          header: () => `${t('common.dealer')}/${t('companies.parentEntity')}`,
          cell: ({ row }) => {
            const { companyName, parentEntity } = row.original;

            if (!companyName && !parentEntity) return '-';

            return (
              <>
                <Text className="text-secondary" variant="bold">
                  {companyName || '-'}
                </Text>
                <Text className="text-secondary-tint-40" size="xs">
                  {parentEntity || '-'}
                </Text>
              </>
            );
          },
        }),
        ch.display({
          id: 'companyNickname',
          header: () => t('companies.nickName'),
          cell: ({ row }) => (
            <Text className="text-secondary-tint-40">
              {row?.original?.companyNickname || '-'}
            </Text>
          ),
        }),
        ch.accessor('preAuditOptiPix', {
          header: () => t('audit.type.OPTI_PIX'),
          cell: ({ row }) => {
            const preAudit = row.original.preAuditOptiPix;

            if (!preAudit) return null;

            return (
              <AuditsOptiStatusWithTooltip
                companyId={row.original.companyId}
                dealerName={row.original.companyName}
                row={row.original.preAuditOptiPix}
                setHistoryModalInput={setHistoryModalInput}
                templateType={QUESTIONNAIRE_TYPE.OPTI_PIX}
                onStartPreAudit={onStartPreAudit}
              />
            );
          },
        }),
        ch.accessor('preAuditOptiAds', {
          header: () => t('audit.type.OPTI_ADS'),
          cell: ({ row }) => {
            const preAudit = row.original.preAuditOptiAds;

            if (!preAudit) return null;

            return (
              <AuditsOptiStatusWithTooltip
                companyId={row.original.companyId}
                dealerName={row.original.companyName}
                row={row.original.preAuditOptiAds}
                setHistoryModalInput={setHistoryModalInput}
                templateType={QUESTIONNAIRE_TYPE.OPTI_ADS}
                onStartPreAudit={onStartPreAudit}
              />
            );
          },
        }),
        // ch.accessor('preAuditOptiLeads', {
        //   header: () => t('audit.type.OPTI_LEADS'),
        //   cell: ({ row }) => {
        //     const preAudit = row.original.preAuditOptiLeads;
        //
        //     if (!preAudit) return null;
        //
        //     return (
        //       <AuditsOptiStatusWithTooltip
        //         companyId={row.original.companyId}
        //         dealerName={row.original.companyName}
        //         row={row.original.preAuditOptiLeads}
        //         setHistoryModalInput={setHistoryModalInput}
        //         templateType={QUESTIONNAIRE_TYPE.OPTI_LEADS}
        //         onStartPreAudit={onStartPreAudit}
        //       />
        //     );
        //   },
        // }),
        // ch.accessor('rating', {  TODO temp hidden
        //   header: () => t('common.rating'),
        //   cell: ({ row }) => (F
        //     <>
        //       <span className="text-semibold ml-3 mr-1 text-secondary">
        //         {`${row.original.rating || '-'}`}
        //       </span>
        //       <span>/ 5</span>
        //     </>
        //   ),
        // }),
        ch.display({
          id: 'commercial',
          header: () => t('common.commercial'),
          size: 70,
          cell: ({ row }) => {
            const avatars = joinAvatars([
              row.original.commercialUser,
              row.original.commercialAssistantUser,
            ]);

            if (!avatars.length) return null;

            return (
              <span className="flex gap-4">
                {avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    alt={avatar.name ?? ''}
                    imgUrl={avatar.imgUrl}
                    name={avatar.name}
                    size="sm"
                    tooltip={avatar.name}
                  />
                ))}
              </span>
            );
          },
        }),
        ch.display({
          id: '_actions',
          header: () => t('common.actions'),
          size: 50,
          cell: ({ row }) => {
            return (
              <AuditListActionMenu
                audit={row.original}
                onStartPreAudit={onStartPreAudit}
              />
            );
          },
        }),
      ]),
    [t, onStartPreAudit],
  );

  return (
    <>
      <div className="mb-5 flex justify-between">
        <DataView.RecordsCount />
        <DataView.FiltersToggle />
      </div>
      <DataView.Filters hasToggle>
        <AuditListFilters isAdmin />
      </DataView.Filters>
      <DataView.Table columns={columns} />
      {historyModalInput && (
        <AuditHistoryModal
          input={historyModalInput}
          onClose={() => setHistoryModalInput(undefined)}
        />
      )}
    </>
  );
};
