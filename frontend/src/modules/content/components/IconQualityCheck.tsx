// Import necessary modules and components
import { FC, useEffect, useState } from 'react';

import { Avatar, Spinner, Tooltip } from '@/components/elements';
import { QualityCheckStatus } from '@/modules/content/types';
import { useGetUserByIdQuery } from '@/modules/users/api/getUserById';
import { Image } from '@/components/elements';
import { useTranslation } from '@/i18n';

type Props = {
  status?: QualityCheckStatus;
  userID?: string;
};

/**
 * Renders an icon based on the quality check status with a tooltip.
 * @param {Object} props - The component props.
 * @param {string} props.status - The quality check status.
 * @param {string} props.userID - The user ID.
 * @returns {JSX.Element | null} The rendered icon element with a tooltip.
 */
export const IconQualityCheckStatus: FC<Props> = ({ status, userID }) => {
  const { t } = useTranslation();
  // State to hold the avatar component
  const [avatar, setAvatar] = useState<JSX.Element | null>(null);

  // Fetch user data based on userID
  const { data: userData } = useGetUserByIdQuery({
    variables: { input: { id: userID || '' } },
    skip: !userID,
  });

  // Update avatar state when userData changes
  useEffect(() => {
    if (userData && userData.user) {
      setAvatar(
        <Avatar
          alt={userData.user.firstname || ''}
          imgUrl={userData.user.photoUrl}
          name={userData.user.firstname || ''}
          size="lg"
        />,
      );
    }
  }, [userData]);

  // Map statuses to icons wrapped with Tooltip
  const statusIconMap = {
    CHECKED: (
      <Tooltip content={t('content.qualityCheckStatus.checked')}>
        <Image
          alt="Checked"
          src="/images/icons/check.svg"
          width={40}
          height={40}
        />
      </Tooltip>
    ),
    CHECKED_WITH_ERRORS: (
      <Tooltip content={t('content.qualityCheckStatus.checkedWithErrors')}>
        <Image
          alt="Checked with errors"
          src="/images/icons/warning.svg"
          width={40}
          height={40}
        />
      </Tooltip>
    ),
    UNCHECKED: null,
    IN_PROGRESS: (
      <Tooltip
        content={
          t('content.qualityCheckStatus.inProgress') +
          ' ' +
          '(' +
          userData?.user.firstname +
          ')'
        }
      >
        {userData && userData.user ? (
          <Avatar
            alt={userData.user.firstname || ''}
            imgUrl={userData.user.photoUrl || ''}
            name={userData.user.firstname || ''}
            size="lg"
          />
        ) : (
          <Spinner className="right-2 text-primary" size="lg" />
        )}
      </Tooltip>
    ),
  };

  // Return the icon based on the status
  return status ? statusIconMap[status] : null;
};
