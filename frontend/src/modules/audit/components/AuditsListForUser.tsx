import { FC, useMemo, useState } from 'react';

import { Button, IconButton, Text, Tooltip } from '@/components/elements';
import { FlagCountry } from '@/components/elements/FlagCountry/FlagCountry';
import { createTableColumns, DataView } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { formatDateTime } from '@/utils/date';

import { AuditHistoryModal } from '../components/AuditHistoryModal';
import { AuditForUser, AuditHistoryModalInput } from '../types';

import { AuditListFilters } from './AuditListFilters';
import { GenerateReportPopover } from './GenerateReportPopover';

export const AuditsListForUser: FC = () => {
  const { t } = useTranslation();

  const [historyModalInput, setHistoryModalInput] =
    useState<AuditHistoryModalInput>();

  const columns = useMemo(
    () =>
      createTableColumns<AuditForUser>((ch) => [
        ch.accessor('companyCountryName', {
          header: () => t('common.country'),
          cell: ({ row }) => (
            <FlagCountry name={row.original?.companyCountryName} />
          ),
        }),
        ch.accessor('auditType', {
          header: () => t('common.type'),
          cell: ({ row }) => (
            <div className="inline-flex items-center">
              {t(`audit.type.${row.original.auditType}`)}
              {row.original.hasHistory && (
                <Tooltip content={t('common.seeHistory')} placement="bottom">
                  <IconButton
                    className="text-primary"
                    name="clock"
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setHistoryModalInput({
                        auditType: row.original.auditType,
                        companyId: row.original.companyId,
                        dealerName: row.original.companyName,
                      })
                    }
                  />
                </Tooltip>
              )}
            </div>
          ),
        }),
        ch.accessor('companyName', {
          header: () => t('common.dealer'),
          cell: ({ row }) => (
            <p className="font-semibold text-secondary">
              {row.original.companyName || '-'}
            </p>
          ),
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
        ch.accessor('rating', {
          header: () => t('common.rating'),
          cell: ({ row }) => (
            <>
              <span className="ml-3 mr-1 font-semibold text-secondary">
                {`${row.original.rating || '-'}`}
              </span>
              <span>/ 5</span>
            </>
          ),
        }),
        ch.accessor('createdBy', {
          header: () => t('common.createdBy'),
          cell: ({ row }) => row.original.createdBy || '-',
        }),
        ch.accessor('dateCreated', {
          header: () => t('common.dateCreated'),
          cell: ({ row }) =>
            row.original.dateCreated
              ? formatDateTime(new Date(row.original.dateCreated))
              : '-',
        }),
        ch.display({
          id: 'relatedReport',
          header: () => t('common.report'),
          cell: ({ row }) => (
            <GenerateReportPopover questionnaireId={row.original.relatedReport}>
              <Button size="sm" variant="secondary">
                {t('common.view')}
              </Button>
            </GenerateReportPopover>
          ),
        }),
      ]),
    [t],
  );

  return (
    <>
      <div className="mb-5 flex justify-between">
        <DataView.RecordsCount />
        <DataView.FiltersToggle />
      </div>
      <DataView.Filters hasToggle>
        <AuditListFilters />
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
