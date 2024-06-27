import { FlagCountry } from '@/components/elements/FlagCountry/FlagCountry';
import { useTranslation } from '@/i18n';
import { format } from 'date-fns';

interface LeadDealershipProps {
  market: string;
  dealership: string;
  platform: string;
  creationDate: string;
}

/**
 * Renders a component that displays lead dealership information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.market - The market of the lead.
 * @param {string} props.dealership - The name of the dealership.
 * @param {string} props.platform - The platform of the lead.
 * @param {string} props.creationDate - The creation date of the lead.
 * @returns {JSX.Element} The rendered component.
 */

const LeadDealership = ({
  market,
  dealership,
  platform,
  creationDate,
}: LeadDealershipProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col rounded-md bg-white p-4 shadow md:grid md:grid-cols-4 md:gap-4">
      {/* Market */}
      <div className="mb-2 flex items-center space-x-2 md:mb-0 md:flex-row">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
            {t('lead.market')}
          </p>
          <FlagCountry name={market} />
        </div>
      </div>

      {/* Dealership */}
      <div className="mb-2 md:mb-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
          {t('lead.dealership')}
        </p>
        <p className="text-sm text-gray-900">{dealership}</p>
      </div>

      {/* Platform */}
      <div className="mb-2 md:mb-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
          {t('lead.platform')}
        </p>
        <p className="text-sm text-gray-900">{platform}</p>
      </div>

      {/* Creation Date */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
          {t('common.created')}
        </p>
        <p className="text-sm text-gray-900">{!!creationDate && format(creationDate, "do MMM yyyy")}</p>
      </div>
    </div>
  );
};

export default LeadDealership;
