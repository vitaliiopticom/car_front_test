import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Modal, Text } from '@/components/elements';
import { CheckboxField, FormModal, TextareaField } from '@/components/shared';
import { TagsInputField } from '@/components/shared/Form/fields/TagsInputField';
import FeedbackItem from '@/modules/content/components/FeedbackItem';
import EmailFeedbackTemplate from '@/modules/content/EmailFeedbackTemplate';

import carImage from '../../images/1279483 Original.jpg';

interface FeedbackFormValues {
  comments: string;
  tags: string;
  cc: boolean;
}

interface ModalSendFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface feedbackItem {
  altText: string;
  imageSrc: string;
  issues: string[];
  link: string;
}

const ModalSendFeedback: React.FC<ModalSendFeedbackProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  const handleSubmit: SubmitHandler<FeedbackFormValues> = (
    data: FeedbackFormValues,
  ) => {
    console.log('data', data);
    console.log(t('common.commentsLog'), data.comments);
    console.log(t('common.recipientLog'), data.tags);
    console.log(t('common.ccLog'), data.cc);
    onClose();
  };

  const feedbackItems: feedbackItem[] = [
    {
      altText: 'Car Image 1',
      imageSrc: carImage,
      issues: ['Quality', 'Angle', 'Blurred'],
      link: 'https://www.google.com',
    },
    {
      altText: 'Car Image 2',
      imageSrc: carImage,
      issues: ['Quality', 'Angle', 'Image not processed'],
      link: 'https://www.google.com',
    },
    {
      altText: 'Car Image 3',
      imageSrc: carImage,
      issues: ['Quality', 'Angle', 'Image not processed'],
      link: 'https://www.google.com',
    },
    {
      altText: 'Car Image 4',
      imageSrc: carImage,
      issues: ['Quality', 'Angle', 'Image not processed'],
      link: 'https://www.google.com',
    },
    {
      altText: 'Car Image 5',
      imageSrc: carImage,
      issues: ['Quality', 'Angle', 'Image not processed'],
      link: 'https://www.google.com',
    },
  ];
  const [isPreview, setIsPreview] = useState(false);

  const openPreview = () => {
    setIsPreview(true);
  };

  const closePreview = () => {
    setIsPreview(false);
  };

  const [comments, setComments] = useState<string>('');

  return (
    <>
      <FormModal
        cancelLabel={t('common.cancel')}
        formId="feedbackForm"
        isOpen={isOpen}
        modalClassName="max-w-5xl w-full"
        submitLabel={t('common.send')}
        title={t('common.sendQualityFeedback')}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <div className="w-2/3 space-y-4 pr-4">
            <p className="mb-4">
              {t('common.sendFeedbackForPhotos', { count: 4 })}
            </p>
            <TextareaField
              label={t('common.comments')}
              className="mb-4 w-full rounded p-2"
              name={'comments'}
              placeholder={t('common.commentsHere')}
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />

            <TagsInputField label={t('common.recipient')} name={'tags'} />

            <div className="mb-4 mt-4 flex items-center">
              <CheckboxField id="cc" label={t('common.sendCC')} name="cc" />
            </div>
            <div className="flex items-center">
              <Icon className="mr-3" name="info" />
              <Text>{t('common.message')}</Text>
            </div>
            <div className="flex justify-end">
              <Button variant="primary" onClick={openPreview}>
                {t('common.preview')}
              </Button>
            </div>
          </div>

          <div className="max-h-[500px] w-1/3 overflow-y-auto pl-4">
            {feedbackItems.map((item, index) => (
              <FeedbackItem
                key={index}
                altText={item.altText}
                imageSrc={item.imageSrc}
                issues={item.issues}
              />
            ))}
          </div>
        </div>
      </FormModal>
      <Modal isOpen={isPreview} onClose={closePreview}>
        <div className="flex justify-center">
          <EmailFeedbackTemplate
            appStoreLink="#"
            bestRegards="Best regards,"
            buttonText="Go to Opti(content)"
            checkFeedback="Please check feedback for the photos:"
            contactUsLink="#"
            googlePlayLink="#"
            greeting="Mark de Aureus"
            legalText="(optipix) S.L. Carrer Pau Casals, 6 Edifici Cormells 2, Planta 3 24003 Andorra la Vella, AD, 700 Andorra. Privacy policy and terms of service apply. For more information about how we process personal data in accordance with GDPR, please visit our website."
            comments={comments}
            managerEmail="mike.spencer@optipix.com"
            managerName="Mike Spencer"
            managerPhone="+33 5 62 47 16 66"
            managerTitle="Client Manager at (optipix)"
            photoDetails="And here are the details for each photo:"
            feedbackItems={feedbackItems}
            servicesLink="#"
            subtitle="🚙"
            teamName="The Caropticom Team"
            title="Quality feedback for photos"
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalSendFeedback;
