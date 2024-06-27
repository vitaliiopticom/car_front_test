import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Link, Text } from '@/components/elements';
import { cx } from '@/utils/classNames';

import { GeoLocation } from '../types';

type Props = {
  data: GeoLocation;
  isDisabled?: boolean;
};

export const GeoLocationLink: FC<Props> = ({ data, isDisabled }) => {
  const { latitude, longitude, address } = data ?? {};

  const { t } = useTranslation();

  if (latitude && longitude && address) {
    return (
      <Link
        className="focus:ring-0"
        isDisabled={isDisabled}
        to={`https://www.google.com/maps/@?api=1&map_action=map&center=${latitude},${longitude}`}
        isExternal
      >
        <div className="flex items-center gap-1">
          <Icon
            className={cx(
              'min-w-4.5 h-4.5 w-4.5',
              isDisabled && 'text-secondary-tint-40',
            )}
            name="mapPin"
          />
          <Text size="sm">{address}</Text>
        </div>
      </Link>
    );
  }

  return (
    <div className="inline-grid grid-flow-col items-center gap-1">
      <Icon className="h-4.5 w-4.5 text-secondary-tint-40" name="mapPinOff" />
      <Text isSecondary>{t('common.geolocation.nodata')}</Text>
    </div>
  );
};
