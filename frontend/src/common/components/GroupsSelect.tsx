import { useMemo } from 'react';

import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';

import { useGetCompanyGroupsQuery } from '../api/getCompanyGroups';
import { CompanyGroup } from '../types';

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  CompanyGroup,
  Multi
>;

export const GroupsSelect = <Multi extends boolean>(props: Props<Multi>) => {
  const { data, loading } = useGetCompanyGroupsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const companyGroups = data?.companies?.items;

  const filteredCompanyGroups = useMemo(
    () => companyGroups?.filter((item) => !!item?.tenantId),
    [companyGroups],
  );

  const mapDataToOption = (item: CompanyGroup) => ({
    value: item.tenantId,
    label: item.companyName,
  });

  return (
    <DataSelectField
      data={filteredCompanyGroups || []}
      isLoading={loading}
      mapDataToOption={mapDataToOption}
      {...props}
    />
  );
};
