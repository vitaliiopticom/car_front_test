import { FC, useEffect, useState } from 'react';

import { Button } from '@/components/elements';
import {
  DataView,
  DataViewFiltersChangeHandler,
  Page,
  PaginationAdapter,
  QueryDataLoader,
} from '@/components/shared';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PermissionCheck, PERMISSIONS, usePermissions } from '@/modules/auth';
import { useTenant } from '@/modules/tenants';

import { useCreateUserMutation } from '../api/createUser';
import { useGetUserIdsByEmailsQuery } from '../api/getUserIdsByEmails';
import { useGetUsersQuery } from '../api/getUsers';
import { UserFormModal } from '../components/UserFormModal';
import { UsersList } from '../components/UsersList';
import {
  USERS_DATA_VIEW_ID,
  usersListFiltersDefaultValues,
} from '../constants';
import { CreateUserFormValues, UsersListFiltersType } from '../types';
// import DesktopNotification from '@/components/elements/DesktopNotification/DesktopNotification';
export const UsersPage: FC = () => {
  const { t } = useTranslation();
  const createModal = useDisclosure();
  const { tenant } = useTenant();
  const [userToAdd, setUserToAdd] = useState<CreateUserFormValues>();
  const { data: usersInSystemList, loading } = useGetUserIdsByEmailsQuery({
    variables: { emails: [userToAdd?.email as string] },
    skip: !userToAdd,
  });
  const usersQuery = useGetUsersQuery({
    variables: {
      filters: usersListFiltersDefaultValues,
    },
  });

  const handleClose = () => {
    setUserToAdd(undefined);

    createModal.onClose();
  };

  const [createUser, createUserState] = useCreateUserMutation({
    onCompleted: handleClose,
  });

  const canSeeAllTenants = usePermissions(PERMISSIONS.Users_View_AllTenants);

  const handleCreateUser = (values: CreateUserFormValues) => {
    const { tenantAssignments, ...restValues } = values;

    const assignments = tenantAssignments.map((tenantAssignment) => ({
      tenantId: canSeeAllTenants ? tenantAssignment.tenantId : tenant?.id || '',
      roleAssignments: tenantAssignment.roleAssignments.map((item) => ({
        id: item,
      })),
    }));

    const userValues = {
      ...restValues,
      tenantAssignments: assignments,
    };

    createUser({
      variables: {
        input: userValues,
      },
    });
  };

  const handleChange: DataViewFiltersChangeHandler<UsersListFiltersType> = (
    filters,
  ) => {
    usersQuery.refetch({ filters });
  };

  useEffect(() => {
    if (
      usersInSystemList &&
      !usersInSystemList?.userIdsByEmails.length &&
      userToAdd
    ) {
      handleCreateUser(userToAdd);
    }
  }, [usersInSystemList?.userIdsByEmails]);

  return (
    <Page
      actions={
        <PermissionCheck permission={PERMISSIONS.Users_Add}>
          <Button onClick={createModal.onOpen}>{t('users.addNew')}</Button>
        </PermissionCheck>
      }
      title={t('common.users')}
    >
      <QueryDataLoader query={usersQuery} keepPreviousData useCustomLoading>
        {({ data, isLoading, isRefetching }) => (
          <PaginationAdapter data={data?.users || []} id={USERS_DATA_VIEW_ID}>
            {(pageData) => (
              <DataView
                data={pageData}
                filterDefaultValues={usersListFiltersDefaultValues}
                id={USERS_DATA_VIEW_ID}
                isFetching={isRefetching}
                isLoading={isLoading}
                recordsCount={data?.users.length}
                onFiltersChange={handleChange}
              >
                <UsersList />
              </DataView>
            )}
          </PaginationAdapter>
        )}
      </QueryDataLoader>
      <UserFormModal
        isLoading={createUserState.loading || loading}
        isOpen={createModal.isOpen}
        tenantId={canSeeAllTenants ? undefined : tenant?.id}
        title={t('users.addNew')}
        withTenantRoles={canSeeAllTenants}
        isAddUser
        onClose={createModal.onClose}
        onSubmit={handleCreateUser}
      />
      {/* <DesktopNotification
        title="User Page"
        message="A new user has been addeed"
        icon="https://caropticom.com/images/logo_white.svg"
      /> */}
    </Page>
  );
};
