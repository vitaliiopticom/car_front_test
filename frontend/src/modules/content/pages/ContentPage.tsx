import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/elements';
import { Page, Tabs } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { routes } from '@/router/routesList';

import ContentAutomobileTab from './tabs/ContentAutomobileTab';
import ContentQualityCheckTab from './tabs/ContentQualityCheckTab';

export const ContentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hasOptiPixAccess = usePermissions(PERMISSIONS.OptiPix_AccessOptiPix);

  const canViewAllTenants = usePermissions(
    PERMISSIONS.OptiContent_View_AllTenants,
  );
  const canViewAllPhotos = usePermissions(
    PERMISSIONS.OptiContent_View_AllPhotos,
  );

  const canViewQualityCheck = usePermissions(
    PERMISSIONS.OptiContent_QualityChecker,
  );

  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      title: t('content.automobiles'),
      content: <ContentAutomobileTab />,
    },
    ...(canViewQualityCheck
      ? [
          {
            title: t('content.qualityCheck'),
            content: <ContentQualityCheckTab />,
          },
        ]
      : []),
  ];

  const isPhotoBoxReady = true;
  const noPhotosInBox = false;

  const canViewStatistics =
    isPhotoBoxReady &&
    !noPhotosInBox &&
    (hasOptiPixAccess || canViewAllPhotos) &&
    !canViewAllTenants;

  return (
    <Page
      actions={
        canViewStatistics && (
          <Button
            variant="secondary"
            onClick={() => navigate(routes.contentStatistics())}
          >
            {t('content.navToStatistics')}
          </Button>
        )
      }
      title={t('common.content')}
    >
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </Page>
  );
};

export default ContentPage;
