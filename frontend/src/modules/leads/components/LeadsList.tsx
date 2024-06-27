import { FC, useMemo, useState } from 'react';
import { DataView, Tabs, createTableColumns, useDataViewContext } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { routes } from '@/router/routesList';
import { ActionsMenu, Avatar, Button, Checkbox } from '@/components/elements';
import { Lead } from '../types/interface';
import LanguageFlag from '@/components/elements/FlagLanguage/FlagLanguage';
import IconPlatform from '@/components/elements/IconPlatform/IconPlatform';
import { LeadsListFilters } from './LeadsListFilters';
import { getLeadStatusOptions } from '../utils/leadUtils';
import { LeadStateEnum } from '../types/leadTypes';


type Props = {
  onTabChange: (l: LeadStateEnum) => void;
  selectedLeads: any[];
  setSelectedLeads: (leads: any[]) => void;
  deleteLeads: (id?: string) => void;
}
/**
 * Renders a list of leads.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Lead[]} props.leadsData - The array of leads data.
 * @returns {JSX.Element} - The rendered LeadsList component.
 */

export const LeadsList: FC<Props> = ({ selectedLeads, setSelectedLeads, onTabChange, deleteLeads }) => {
  const { t } = useTranslation();
  const { isLoading, data } = useDataViewContext();
  const [selectedTab, setSelectedTab] = useState(1);

  const leadStatus = getLeadStatusOptions(t, 'All active');

  const tabs = [...leadStatus.map((l, i) => ({
    title: `${l.label}${i === selectedTab && !isLoading ? '(' + data.length + ')' : ''}`,
    disabled: i === 0,
    code: l.code,
    content: <></>,
  }))]

  const changeTab = (v: number) => {
    setSelectedTab(v);
    setSelectedLeads([]);
    onTabChange(leadStatus.find((_, i) => v === i)?.code as LeadStateEnum);
  }

  const handleRowClick = (lead: Lead) => {
    if (!selectedLeads.find(v => v.id === lead.id)) {
      setSelectedLeads(([...selectedLeads, lead]));
    } else {
      setSelectedLeads(selectedLeads.filter((v) => v.id !== lead.id));
    }
  };

  const columns = useMemo(
    () =>
      createTableColumns<Lead>((ch) => [
        ch.accessor('createdAt', {
          header: () => "",
          cell: ({ row }) => {

            return (
              <Checkbox
                checked={!!selectedLeads.find(v => v.id === row.original.id)}
                onChange={() => { }}
              />
            );
          },
        }),

        ch.accessor('clientInfo.lastName', {
          header: () => t('common.lastname'),
          cell: ({ row }) => (
            <div>{row.original.clientInfo.lastName.toUpperCase()}</div>
          ),
        }),
        ch.accessor('clientInfo.firstName', {
          header: () => t('common.firstname'),
        }),
        ch.accessor('platform', {
          header: () => t('contracts.platformAdministrator'),
          cell: ({ row }) => {
            return <IconPlatform platform={row.original.platform} />;
          },
        }),
        ch.accessor('emailInfo.emailSubject', {
          header: () => t('common.subject'),
        }),
        ch.accessor('clientInfo.language', {
          header: () => t('common.defaultLanguage'),
          cell: ({ row }) => {
            return (
              <LanguageFlag
                language={row.original.clientInfo.language.toString()}
              />
            );
          },
        }),
        ch.accessor('agentId', {
          header: () => t('common.agent'),
          cell: ({ row }) => {
            return (
              <div onClick={(e) => e.stopPropagation()}>
                {!!row.original.agentId && <Avatar name={t('common.agent')} alt={t('common.agent')} />}
              </div>
            );
          },
        }),
        ch.display({
          id: '_actions',
          header: () => t('common.actions'),
          cell: ({ row }) => {
            return (
              <div onClick={(e) => e.stopPropagation()}>
                <ActionsMenu
                  items={[
                    {
                      label: t('common.detail'),
                      to: routes.leadDetail(row.original.id),
                    },
                    {
                      label: (
                        <span className="text-cerise">
                          {t('common.deactivate')}
                        </span>
                      ),
                      onClick: () => deleteLeads(row.original.id),
                    },
                  ]}
                />
              </div>
            );
          },
        }),
      ]),
    [t, selectedLeads],
  );

  return (
    <>
      <div className="mb-5 flex justify-between">
        {/* <DataView.RecordsCount /> */}
        <span />
        <div className="flex gap-4">
          <DataView.FiltersToggle />
          <Button
            onClick={() => deleteLeads()}
            disabled={selectedLeads.length === 0}
          >
            {t('common.deleteSelected')}
          </Button>
        </div>
      </div>
      <DataView.Filters hasToggle>
        <LeadsListFilters />
      </DataView.Filters>


      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={changeTab}
        listBorderClassName="mb-4"
      />

      <DataView.Table columns={columns} onRowClick={handleRowClick} />
    </>
  );
};

export default LeadsList;
