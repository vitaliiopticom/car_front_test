import { MdAttachFile } from 'react-icons/md';

interface LeadDocumentItemProps {
  item: {
    id: string;
    name: string;
    type: string;
  };
}

/**
 * Renders a single lead document item.
 *
 * @param {LeadDocumentItemProps} props - The component props.
 * @param {LeadDocument} props.item - The lead document item to render.
 * @returns {JSX.Element} The rendered lead document item.
 */
const LeadDocumentItem = ({ item }: LeadDocumentItemProps) => {
  const icon = <MdAttachFile className="text-primary" size="24" />;

  return (
    <div key={item.id} className="flex items-start pb-3 pt-3">
      <div className="mr-4 flex items-center">{icon}</div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">{item.name}</p>
          <h3 className="text-sm font-bold">{item.type}</h3>
        </div>
      </div>
    </div>
  );
};

export default LeadDocumentItem;
