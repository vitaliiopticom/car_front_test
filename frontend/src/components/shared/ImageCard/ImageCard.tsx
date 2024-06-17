import { FC, ReactNode } from 'react';

import {
  IconName,
  IconThumbnail,
  Image,
  InteractiveCard,
  Link,
} from '@/components/elements';
import { cx } from '@/utils/classNames';

type Props = {
  coverImage?: string;
  children: ReactNode;
  coverImageFallback?: string;
  className?: string;
  imageIcon?: IconName;
} & (
  | { navigateTo: string; onClick?: never }
  | { navigateTo?: never; onClick: () => void }
);

export const ImageCard: FC<Props> = ({
  coverImage,
  children,
  coverImageFallback,
  onClick,
  navigateTo,
  className,
  imageIcon,
}) => {
  const imgAttributes = {
    alt: 'alt',
    className: 'w-full aspect-thumbnail',
    fallbackPath: coverImageFallback || '/images/thumbnail-fallback-car.svg',
    src:
      coverImage || coverImageFallback || '/images/thumbnail-fallback-car.svg',
  };

  const image = imageIcon ? (
    <IconThumbnail iconName={imageIcon} {...imgAttributes} />
  ) : (
    <Image {...imgAttributes} />
  );

  return (
    <InteractiveCard>
      {!!onClick && (
        <button
          className="focus:outline-0 focus:ring-0"
          type="button"
          onClick={onClick}
        >
          {image}
        </button>
      )}
      {!!navigateTo && <Link to={navigateTo}>{image}</Link>}
      <div className={cx('flex w-full flex-col items-start', 'p-4', className)}>
        {children}
      </div>
    </InteractiveCard>
  );
};
