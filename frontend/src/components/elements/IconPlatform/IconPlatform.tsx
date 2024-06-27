import { FC } from 'react';

import paruvendu from '../../../modules/leads/images/paruvendu-logo.png';
import leboncoin from '../../../modules/leads/images/leboncoin-logo.png';

interface IconPlatformProps {
  platform: string;
}

const passerelleImages = {
  Leboncoin: leboncoin,
  ParuVendu: paruvendu,
};

const IconPlatform: FC<IconPlatformProps> = ({ platform }) => {
  const imageName = platform as keyof typeof passerelleImages;
  const imageUrl = passerelleImages[imageName];

  return (
    <img
      src={imageUrl}
      alt={imageName}
      style={{ width: 'auto', height: '40px' }}
    />
  );
};

export default IconPlatform;
