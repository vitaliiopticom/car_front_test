import { useState } from 'react';
import { useTranslation } from '@/i18n';

/**
 * Renders a text component with ellipsis that can be expanded to show the full text.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed.
 * @param {number} props.maxLength - The maximum length of the text before it gets truncated.
 * @param {('primary' | 'secondary')} [props.color='primary'] - The color of the text.
 * @returns {JSX.Element} The rendered TextWithEllipsis component.
 */
const TextWithEllipsis = ({
  text,
  maxLength,
  color = 'primary',
}: {
  text: string;
  maxLength: number;
  color?: 'primary' | 'secondary';
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Toggles the expanded state of the text.
   */
  const toggleIsExpanded = () => setIsExpanded(!isExpanded);

  const textColorClass = color === 'primary' ? 'text-primary' : 'text-white';

  return (
    <p
      onClick={toggleIsExpanded}
      className={`${text.length > maxLength ? ' cursor-pointer' : ''}`}
      title={text.length > maxLength ? 'Clica per veure més' : ''}
    >
      {isExpanded || text.length <= maxLength ? (
        text
      ) : (
        <>
          {`${text.substring(0, maxLength).trim()} `}
          <span className={textColorClass}>{t('common.more')}</span>
        </>
      )}
    </p>
  );
};

export default TextWithEllipsis;
