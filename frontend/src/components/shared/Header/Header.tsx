import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Image, Select } from '@/components/elements';
import { ContactModal } from '@/components/shared/ContactModal/ContactModal';
import { ContactData } from '@/components/shared/ContactModal/types';
import { DEFAULT_PROFILE_LANGUAGE_ID } from '@/constants/constants';
import { useTranslation } from '@/i18n';
import { useTenant } from '@/modules/tenants';
import { useProfile } from '@/modules/users';
import { routes } from '@/router/routesList';
import { cx } from '@/utils/classNames';

import { LangSwitch } from '../LangSwitch/LangSwitch';
import { useLayout } from '../Layout/Layout';

import { HeaderActions } from './elements/HeaderActions';
import { HeaderIcon } from './elements/HeaderIcon';
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';

type Props = {
  isSetupLayout?: boolean;
};

export const Header: FC<Props> = ({ isSetupLayout }) => {
  const { setMenuOpen, setCollapsed } = useLayout();
  const { tenant, tenants, setTenantId } = useTenant();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [supportModal, setSupportModal] = useState<ContactData>();
  const { profile } = useProfile();
  const language = profile?.defaultLanguageId ?? DEFAULT_PROFILE_LANGUAGE_ID;

  const contactData = {
    title: t('support.modal.title'),
    description: t('support.modal.description'),
    sections: [
      {
        icon: 'envelope',
        label: t(`support.modal.mail.${language}`),
        value: t(`support.modal.mail.${language}`),
      } as const,
      {
        icon: 'phone',
        label: t(`support.modal.phone.${language}`),
        value: t(`support.modal.phone.${language}`),
        labelPrefix: t(`support.modal.phone.prefix.${language}`),
      } as const,
    ],
  };

  const handleTenantChange = (tenant: string | null) => {
    setTenantId(tenant || '');

    if (tenant) {
      navigate(routes.index());
    }
  };
  let id = '';
  if (profile?.email === 'dealergroup.user.manager@outlook.com') {
    id = '662a5a203f5e5be898328c66';
  } else {
    (id = '662b733567e0aa201816f6e3'), '662a5a203f5e5be898328c66';
  }
  id = '662b733567e0aa201816f6e3' + ',' + '662a5a203f5e5be898328c66';

  return (
    <header className="fixed top-0 z-sidebar flex w-full items-center justify-between bg-secondary pl-0 pr-0 lg:z-header">
      <div className="flex items-center">
        <Image
          alt="Logo"
          className={cx('mr-[52px] ml-6 lg:block', !isSetupLayout && 'hidden')}
          height="25"
          src="/images/logo_dark.svg"
          width="163"
        />
        <HeaderIcon
          className={cx('lg:hidden', isSetupLayout && 'hidden')}
          name="menu"
          title="Toggle Menu"
          onClick={() => {
            setCollapsed(false);
            setMenuOpen((prev) => !prev);
          }}
        />
        <Select
          className="w-60 bg-transparent text-white placeholder:text-white hover:border-white focus:border-white"
          isClearable={false}
          isLoading={!tenant?.id}
          options={tenants}
          value={tenant?.id || null}
          wrapperClassName="hidden md:block"
          onChange={handleTenantChange}
        />
      </div>
      <div className="flex items-center">
        <NovuProvider subscriberId={id} applicationIdentifier={'-3p6ufyTjoOu'}>
          <PopoverNotificationCenter
            colorScheme={'light'}
            onNotificationClick={() => navigate(routes.leads())}
          >
            {({ unseenCount }) => (
              <NotificationBell unseenCount={unseenCount} />
            )}
          </PopoverNotificationCenter>
        </NovuProvider>
        <Button
          className={cx(
            'font-normal text-secondary-tint-70 hover:text-white focus:text-white active:text-secondary-tint-70',
            'border-l-transparent bg-transparent hover:bg-primary-shade-40 focus:outline-0 focus-visible:ring-1 focus-visible:ring-primary active:bg-primary-shade-40',
          )}
          name="info"
          startIcon="questionCircle"
          variant="ghost"
          onClick={() => setSupportModal(contactData)}
        >
          {t('header.support')}
        </Button>
        <LangSwitch />

        <HeaderActions
          currentCompanyId={tenant?.companyId || ''}
          isSetupLayout={isSetupLayout}
        />
      </div>
      <ContactModal
        className="max-w-[480px]"
        data={supportModal}
        isOpen={!!supportModal}
        onClose={() => setSupportModal(undefined)}
      />
    </header>
  );
};
