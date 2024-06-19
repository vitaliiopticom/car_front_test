import React, { FC } from 'react';
import { IconButton, Image, VideoPlayer } from '@/components/elements';

import { FALLBACK_IMAGE } from '../../../constants';
import { GalleryItem } from '../../../types';

import { GalleryContentDetails } from './GalleryContentDetails';

type Props = {
  contentItem: GalleryItem;
  isVideoContent: boolean;
  photosEditable: boolean;
  isComparison: boolean;
  setIsComparison: (isComparison: boolean) => void;
};

export const GalleryContent: FC<Props> = ({
  contentItem,
  photosEditable,
  isVideoContent,
  isComparison,
  setIsComparison,
}) => {
  const { id, image, video, originalImage, position, contentType, vehicleId } =
    contentItem;

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-2/3">
        <GalleryContentDetails
          contentType={contentType}
          photosEditable={photosEditable}
          position={position}
          vehicleId={vehicleId || ''}
          vehicleImageId={id}
        />
        {isVideoContent ? (
          <VideoPlayer
            fallbackMessage={<>No video</>}
            sources={[{ src: video?.uri || '', type: video?.contentType }]}
            controls
          />
        ) : (
          <div className="flex h-full justify-between">
            <Image
              alt={`Car with id ${id}`}
              className={`rounded-lg object-cover ${
                isComparison ? 'w-1/2' : ''
              }`}
              fallbackPath={FALLBACK_IMAGE}
              src={image?.uri || FALLBACK_IMAGE}
            />
            {isComparison && (
              <div className="relative">
                <Image
                  alt={`Car with id ${id}`}
                  className="rounded-lg object-cover"
                  fallbackPath={FALLBACK_IMAGE}
                  src={originalImage?.uri || FALLBACK_IMAGE}
                />

                <IconButton
                  className="absolute right-1 top-1 rounded-xl"
                  name={'close'}
                  size="sm"
                  onClick={() => setIsComparison(false)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
