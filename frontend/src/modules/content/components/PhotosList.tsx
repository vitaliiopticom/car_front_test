import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Avatar, IconButton } from '@/components/elements';
import { FetchFile, ImageCard } from '@/components/shared';
import { useCopyToClipboard } from '@/hooks';
import { useTranslation } from '@/i18n';
import { createFullNameFromUser } from '@/modules/users';
import { formatDate } from '@/utils/date';
import { bytesToMb, getFileExtension } from '@/utils/file';

import { CONTENT_ITEM_TYPE } from '../constants';
import { GalleryItem, VehicleImage } from '../types';

import { getContentItemRef } from './GalleryModal/utils';

type Props = {
  contentItems: GalleryItem[];
  onOpenModal: (pos: number) => void;
  coverImage?: VehicleImage;
};

export const PhotosList: React.FC<Props> = ({
  contentItems,
  onOpenModal,
  coverImage,
}) => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { copy } = useCopyToClipboard();

  const handleShareLink = (id: string) => {
    setSearchParams({ contentItemId: id });

    const url = window.location.href;

    copy(url);
  };

  return (
    <div className="grid grid-cols-fill-18 gap-5 2xl:grid-cols-fill-18-r4">
      {contentItems.map((contentItem) => {
        const { id, image, user, position, internalPosition, contentType } =
          contentItem;
        const isVideoContent = contentType === CONTENT_ITEM_TYPE.VIDEO;
        const contentItemRef = getContentItemRef(contentItem, isVideoContent);

        const fileExtension = getFileExtension(
          contentItemRef?.content?.contentType || '',
        );
        const fileSize = bytesToMb(
          contentItemRef?.content?.sizeInBytes || 0,
        ).toLowerCase();
        const fileCreationDate = formatDate(
          new Date(contentItemRef?.content?.createdAt || ''),
          'dd MMM y',
        );

        const fileInfo = `${fileExtension} (${fileSize}) | ${fileCreationDate}`;
        const filePosition = `${t('content.position')} ${position}`;

        return (
          <ImageCard
            key={id}
            coverImage={
              isVideoContent
                ? coverImage?.image?.thumbnailUri
                : image?.thumbnailUri
            }
            imageIcon={isVideoContent ? 'play' : undefined}
            onClick={() => onOpenModal(internalPosition)}
            qualityCheck={contentItem.qualityCheck?.qualityCheckStatus}
          >
            <p className="text-md font-normal text-secondary-tint-50">
              {filePosition}
            </p>
            <p className="text-sm text-secondary-tint-50">{fileInfo}</p>
            <div className="flex w-full flex-row items-center justify-between pt-5">
              <Avatar
                alt="S"
                imgUrl={user?.photoUrl}
                name={createFullNameFromUser(user?.firstname, user?.lastname)}
                size="sm"
                tooltip={createFullNameFromUser(
                  user?.firstname,
                  user?.lastname,
                )}
              />
              <div className="flex gap-2 ">
                <IconButton
                  name={'share'}
                  size="sm"
                  variant="secondary"
                  onClick={() => handleShareLink(id)}
                />
                <FetchFile>
                  {(args) => (
                    <IconButton
                      isLoading={args.state.isLoading}
                      name={'downloadCloud'}
                      size="sm"
                      onClick={() =>
                        args.saveFile(
                          contentItemRef?.content?.uri,
                          contentItemRef?.content?.name,
                        )
                      }
                    />
                  )}
                </FetchFile>
              </div>
            </div>
          </ImageCard>
        );
      })}
    </div>
  );
};
