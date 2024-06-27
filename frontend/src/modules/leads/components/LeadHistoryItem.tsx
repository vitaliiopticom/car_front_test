import TextWithEllipsis from '@/components/shared/TextWithEllipsis/TextWithEllipsis';
import { MdAssignment, MdEmail } from 'react-icons/md';

interface LeadHistoryItemProps {
  item: {
    id: number;
    type: string;
    title: string;
    date: string;
    content: string;
  };
}

/**
 * Renders a single item in the lead history.
 *
 * @component
 * @param {LeadHistoryItemProps} props - The component props.
 * @param {LeadHistoryItemData} props.item - The lead history item data.
 * @returns {JSX.Element} The rendered component.
 */

const LeadHistoryItem = ({ item }: LeadHistoryItemProps) => {
  const icon =
    item.type === 'assignment' ? (
      <MdAssignment className="text-red-500" size="24" />
    ) : (
      <MdEmail className="text-green-500" size="24" />
    );
  return (
    <div key={item.id} className="flex items-start pb-3 pt-3">
      <div className="mr-4 flex items-center">{icon}</div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">{item.title}</h3>
          <p className="text-xs text-gray-500">{item.date}</p>
        </div>
        <TextWithEllipsis text={item.content} maxLength={110} />
      </div>
    </div>
  );
};

export default LeadHistoryItem;
