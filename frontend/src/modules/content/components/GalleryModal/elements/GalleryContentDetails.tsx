import React, {FC, useEffect, useState} from 'react';

import {Button, Heading, IconButton, Modal, Select, Text} from '@/components/elements';
import {useTranslation} from '@/i18n';

import {ContentItemType} from '../../../types';

const contentItemTypes: Record<ContentItemType, string> = {
  EXTERIOR: 'content.exterior',
  INTERIOR: 'content.interior',
  DETAILS: 'content.details',
  VIDEO: 'content.video',
} as const;

type Props = {
  position: number;
  photosEditable: boolean;
  contentType?: ContentItemType;
};

export const GalleryContentDetails: FC<Props> = ({
                                                   contentType,
                                                   photosEditable,
                                                   position,
                                                 }) => {
  const {t} = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContentType, setCurrentContentType] = useState<ContentItemType | undefined>(contentType);
  const [tempContentType, setTempContentType] = useState<ContentItemType | undefined>(contentType);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setCurrentContentType(tempContentType);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setCurrentContentType(contentType);
    setTempContentType(contentType);
  }, [contentType]);

  return (
    <div className="mb-5">
      <div className="min-w-52 mt-8 flex w-54 items-center justify-between">
        <Heading className="text-white" variant="h2">
          {`${t('content.position')} ${position}`}
        </Heading>
        {photosEditable && (
          <IconButton
            iconClassName="text-primary"
            name="editPencil"
            variant="ghost"
            onClick={handleIconClick}
          />
        )}
      </div>
      <div className="flex items-center">
        <Text className="text-white mr-2">
          {t(currentContentType || "content.unknown")}
        </Text>
        <IconButton
          iconClassName="text-primary"
          name="editPencil"
          size={"sm"}
          variant="ghost"
          onClick={handleIconClick}
        />
      </div>
      <Modal
        actions={<Button onClick={handleSave}>{t("common.save")}</Button>}
        isOpen={isModalOpen}
        title={t('content.changeContentType')}
        onClose={() => setIsModalOpen(false)}
      >
        <Select
          options={Object.keys(contentItemTypes).map((key) => ({
            value: key,
            label: t(contentItemTypes[key as ContentItemType]),
          }))}
          value={tempContentType}
          onChange={(value: string | null | undefined) => {
            setTempContentType(value as ContentItemType);
          }}
        />
      </Modal>
    </div>
  );
};
