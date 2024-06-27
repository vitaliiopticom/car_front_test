import { MdEvent } from 'react-icons/md';
import { useTranslation } from '@/i18n';
import { Text } from '@/components/elements';

type LeadScheduleItem = {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
};

/**
 * Renders a single lead schedule item.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {LeadScheduleItem} props.item - The lead schedule item to render.
 * @returns {JSX.Element} The rendered component.
 */

const LeadScheduleItem = ({ item }: { item: LeadScheduleItem }) => {
  const { t } = useTranslation();
  return (
    <div className="relative mb-4 flex items-start space-x-2 rounded-lg bg-pink-100 p-2">
      <div className="absolute bottom-0 left-0 top-0 w-2 rounded-l-lg bg-primary "></div>
      <div className="flex-none text-primary">
        <MdEvent size="24" />
      </div>
      <div className="pl-4">
        <Text size="lg" variant="bold">
          {item.date} {t('common.to')} {item.time}
        </Text>
        <Text size="md" variant="medium">
          {item.title}
        </Text>
        <Text size="sm" variant="normal" isSecondary={true}>
          {item.description}
        </Text>
      </div>
    </div>
  );
};

export default LeadScheduleItem;
