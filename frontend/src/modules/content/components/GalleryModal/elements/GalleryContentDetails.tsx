import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Heading,
  IconButton,
  Modal,
  Select,
  Text,
} from '@/components/elements';
import { useTranslation } from '@/i18n';
import { ContentItemType } from '../../../types';
import { useContentType } from '@/modules/content/pages/ContentTypeContext';
import { useUpdateVehicleImageTypeMutation } from '@/modules/content/api/updateVehicleImageType';

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
  vehicleId: string;
  vehicleImageId: string;
};

export const GalleryContentDetails: FC<Props> = ({
  contentType,
  photosEditable,
  position,
  vehicleId,
  vehicleImageId,
}) => {
  const { t } = useTranslation();
  const { currentContentType, setCurrentContentType } = useContentType();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempContentType, setTempContentType] = useState<
    ContentItemType | undefined
  >(contentType);
  const [updateVehicleImageType] = useUpdateVehicleImageTypeMutation();

  // Function to handle the click event on the edit button
  const handleChangeContentTypeClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Function to handle saving the selected content type
  const handleSave = useCallback(() => {
    if (!tempContentType) return;

    const imageTypeRequest = {
      vehicleId,
      vehicleImageId,
      type: tempContentType,
    };

    // Execute the mutation to update the vehicle image type
    updateVehicleImageType({
      variables: {
        imageTypeRequest,
      },
    }).then(() => {
      setCurrentContentType(tempContentType);
      setIsModalOpen(false);
    });
  }, [
    tempContentType,
    updateVehicleImageType,
    vehicleId,
    vehicleImageId,
    setCurrentContentType,
  ]);

  // Function to handle changes in the select input
  const handleContentTypeChange = useCallback(
    (value: string | null | undefined) => {
      setTempContentType(value as ContentItemType);
    },
    [],
  );

  // Effect to set the temporary content type when the component mounts or when contentType changes
  useEffect(() => {
    setTempContentType(contentType);
  }, [contentType]);

  return (
    <div className="mb-5">
      <div className="min-w-52 w-54 mt-8 flex items-center justify-between">
        <Heading className="text-white" variant="h2">
          {`${t('content.position')} ${position}`}
        </Heading>
        {photosEditable && (
          <IconButton
            iconClassName="text-primary"
            name="editPencil"
            variant="ghost"
            onClick={handleChangeContentTypeClick}
          />
        )}
      </div>
      <div className="flex items-center">
        <Text className="mr-2 text-white">
          {t(currentContentType || 'content.unknown')}
        </Text>
        <IconButton
          iconClassName="text-primary"
          name="editPencil"
          size="sm"
          variant="ghost"
          onClick={handleChangeContentTypeClick}
        />
      </div>
      <Modal
        actions={<Button onClick={handleSave}>{t('common.save')}</Button>}
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
          onChange={handleContentTypeChange}
        />
      </Modal>
    </div>
  );
};
