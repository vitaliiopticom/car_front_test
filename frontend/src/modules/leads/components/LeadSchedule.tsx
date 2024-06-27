import { Card, Heading, Button, Textarea } from '@/components/elements';

import { useTranslation } from '@/i18n';
import { scheduleItems } from './scheduleData';
import LeadScheduleItem from './LeadScheduleItem';

/**
 * LeadSchedule component.
 * Renders a section with a card that displays the next task for a lead.
 * Allows the user to view the task details and add a new task.
 */
const LeadSchedule = () => {
  const { t } = useTranslation();
  return (
    <>
      <section>
        <Card className="mb-5">
          <div className="mb-4 flex items-center justify-between">
            <Heading className="mb-4" variant="h4">
              {t('lead.nextTask')}
            </Heading>
            <div className="flex space-x-2">
              <Button className="p-2" variant="secondary" startIcon="eye" />
              <Button
                onClick={() => console.log('Add new task')}
                className="p-2"
                startIcon="plus"
              />
            </div>
          </div>
          <div className="max-h-96 overflow-auto">
            {/* <div className="relative mb-4 rounded-lg bg-pink-100 p-2">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75">
                <span className="text-lg font-bold text-primary">
                  {t('common.soon')}
                </span>
              </div>
              {scheduleItems.map((item) => (
                <LeadScheduleItem key={item.id} item={item} />
              ))}
            </div> */}
          </div>
        </Card>
      </section>
    </>
  );
};

export default LeadSchedule;
