import { FC, useEffect, useState } from 'react';

import { Avatar } from '@/components/elements';
import { QualityCheckStatus } from '@/modules/content/types';
import { useGetUserByIdQuery } from '@/modules/users/api/getUserById';
import { Image } from '@/components/elements';

type Props = {
  status?: QualityCheckStatus;
  userID?: string;
};

/**
 * Renders an icon based on the quality check status.
 * @param {Object} props - The component props.
 * @param {string} props.status - The quality check status.
 * @param {string} props.userID - The user ID.
 * @returns {JSX.Element | null} The rendered icon element.
 */
export const IconQualityCheckStatus: FC<Props> = ({ status, userID }) => {
  const [avatar, setAvatar] = useState<JSX.Element | null>(null);

  const { data: userData } = useGetUserByIdQuery({
    variables: { input: { id: userID || '' } },
    skip: !userID,
  });

  useEffect(() => {
    if (userData && userData.user) {
      setAvatar(
        <Avatar
          alt={userData.user.firstname || ''}
          imgUrl={userData.user.photoUrl}
          name={userData.user.firstname || ''}
          size={'md'}
        />,
      );
    }
  }, [userData]);

  const statusIconMap = {
    CHECKED: <Image alt="Checked" src="/images/icons/check.svg" />,
    CHECKED_WITH_ERRORS: (
      <Image alt="Checked with errors" src="/images/icons/warning.svg" />
    ),
    UNCHECKED: null,
    IN_PROGRESS: avatar,
  };

  return status ? statusIconMap[status] : null;
};
