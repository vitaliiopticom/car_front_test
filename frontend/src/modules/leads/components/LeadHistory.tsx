import { Card, Heading, Button, Textarea } from '@/components/elements';
import LeadHistoryItem from './LeadHistoryItem';
import { useState } from 'react';
import { FormModal } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { historyData } from './historyData';

const onSubmit = (values: any) => {
  console.log(values);
};

/**
 * LeadHistory component displays the lead history and allows users to add notes.
 */
const LeadHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { t } = useTranslation();

  return (
    <>
      <section>
        <Card className="mb-5">
          <div className="mb-4 flex items-center justify-between">
            <Heading className="mb-4" variant="h4">
              {t('lead.historique')}
            </Heading>
            <div className="flex space-x-2">
              <Button className="p-2" variant="secondary" startIcon="eye" disabled />
              <Button onClick={openModal} className="p-2" startIcon="plus" disabled />
            </div>
          </div>
          <div className="max-h-96 overflow-auto">
            {/* <div className="divide-y divide-gray-200">
              {historyData.map((item) => (
                <LeadHistoryItem item={item} key={item.id} />
              ))}
            </div> */}
          </div>
        </Card>
      </section>
      <FormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formId="your-form-id"
        title={t('audit.auditDetail.addNotePlaceholder')}
        submitLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        onSubmit={onSubmit}
      >
        <Textarea placeholder={t('common.addComment')} />
      </FormModal>
    </>
  );
};

export default LeadHistory;
