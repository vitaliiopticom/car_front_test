import React from 'react';
import { MdEmail, MdSend } from 'react-icons/md';
import { useTranslation } from '@/i18n';
import { Button } from '../Button/Button';
import { Avatar } from '../Avatar/Avatar';
import TextWithEllipsis from '@/components/shared/TextWithEllipsis/TextWithEllipsis';

type MessageProps = {
  id: string;
  body: string;
  isFromClient: boolean;
  timestamp: string;
  onReply: () => void;
  isLastClientMessage: boolean;
};

/**
 * Represents a message component.
 *
 * @component
 * @param {MessageProps} props - The message component props.
 * @param {string} props.id - The unique identifier of the message.
 * @param {string} props.body - The body of the message.
 * @param {boolean} props.isFromClient - Indicates whether the message is from the client.
 * @param {string} props.timestamp - The timestamp of the message.
 * @param {Function} props.onReply - The callback function to handle reply action.
 * @param {boolean} props.isLastClientMessage - Indicates whether the message is the last client message.
 * @returns {JSX.Element} The rendered message component.
 */

const Message: React.FC<MessageProps> = ({
  id,
  body,
  isFromClient,
  timestamp,
  onReply,
  isLastClientMessage,
}) => {
  const { t } = useTranslation();

  // Afegir classes d'amplada responsiva per monitors grans i dispositius mòbils.
  const messageContainerClasses = `max-w-full md:max-w-2xl xl:max-w-4xl border p-4 rounded-lg shadow`;

  // Restablir els colors de fons segons el tema
  const messageBgClass = isFromClient ? 'bg-gray-30' : 'bg-primary-tint-90';

  return (
    <div
      key={id}
      className={`mb-4 flex ${
        isFromClient ? 'justify-start' : 'justify-end'
      } items-start`}
    >
      <div className={`${messageContainerClasses} bg-white`}>
        <div className={`rounded-md ${messageBgClass} p-4`}>
          <TextWithEllipsis text={body} maxLength={500} />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <div className="flex space-x-2">
            <Avatar size="md" name="Test" alt="Test" />
            <MdEmail size={40} className="text-black" />
          </div>
          <span className="text-gray-500">{timestamp}</span>
          {isLastClientMessage && (
            <Button size="sm" variant="primary" onClick={onReply}>
              {t('common.reply')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
