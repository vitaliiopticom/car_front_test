import { useState } from 'react';
import { Card, Heading, Button } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { FormModal, RadioGroupField, UploadField } from '@/components/shared';
import LeadDocumentItem from './LeadDocumentItem';
import { documentData } from './documentData';

type Document = {
  role: string;
  upload: File;
};

/**
 * LeadDocument component displays a list of documents and allows users to add new documents.
 */
const LeadDocument = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /**
   * Handles the form submission when a document is added.
   * @param values - The document values submitted by the user.
   */
  const handleSubmit = (values: Document) => {};

  const roleOptions = [
    { label: t('common.concession'), value: 'Concession' },
    { label: t('common.client'), value: 'Client' },
  ];

  return (
    <>
      <Card className="mb-5">
        <div className="mb-4 flex items-center justify-between">
          <Heading variant="h4" className="text-base md:text-lg">
            {t('documents.title')}
          </Heading>
          <Button onClick={openModal} className="p-2" startIcon="plus" />
        </div>
        <div className="max-h-96 overflow-auto">
          <div className="divide-y divide-gray-200">
            {/* {documentData.map((item) => (
              <LeadDocumentItem key={item.id} item={item} />
            ))} */}
          </div>
        </div>
      </Card>
      <FormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formId="document-form-id"
        title={t('documents.addDocument')}
        submitLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        onSubmit={handleSubmit}
        className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg"
      >
        <div className="p-4">
          <RadioGroupField name="role" options={roleOptions} className="mb-4" />
          <UploadField name="upload" />
        </div>
      </FormModal>
    </>
  );
};

export default LeadDocument;
