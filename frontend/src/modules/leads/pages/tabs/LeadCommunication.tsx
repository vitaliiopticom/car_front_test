import Message from '@/components/elements/Message/Message';
import { useTranslation } from '@/i18n';
import { useState } from 'react';
import ModalEmail from '@/components/elements/ModalEmail/ModalEmail';
import { LeadMessage } from '../../types/leadTypes';

/**
 * Represents an array of lead messages.
 */

const messages: LeadMessage[] = [
  {
    id: '1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isFromClient: true,
    timestamp: 'Reçu le 24/01/2022 à 13h34',
  },
  {
    id: '2',
    body: 'Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.',
    isFromClient: false,
    timestamp: 'Envoyé le 24/01/2022 à 13h34',
  },
  {
    id: '3',
    body: 'Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.',
    isFromClient: true,
    timestamp: 'Reçu le 24/01/2022 à 13h34',
  },
  {
    id: '4',
    body: 'Fusce luctus elit et maximus imperdiet. Mauris augue velit, viverra quis ante eu, euismod luctus metus.',
    isFromClient: false,
    timestamp: 'Envoyé le 24/01/2022 à 13h34',
  },
  {
    id: '1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isFromClient: true,
    timestamp: 'Reçu le 24/01/2022 à 13h34',
  },
  {
    id: '2',
    body: 'Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.',
    isFromClient: false,
    timestamp: 'Envoyé le 24/01/2022 à 13h34',
  },
  {
    id: '3',
    body: 'Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.',
    isFromClient: true,
    timestamp: 'Reçu le 24/01/2022 à 13h34',
  },
  {
    id: '4',
    body: 'Fusce luctus elit et maximus imperdiet. Mauris augue velit, viverra quis ante eu, euismod luctus metus.',
    isFromClient: false,
    timestamp: 'Envoyé le 24/01/2022 à 13h34',
  },
  {
    id: '1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isFromClient: true,
    timestamp: 'Reçu le 24/01/2022 à 13h34',
  },
  {
    id: '2',
    body: 'Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.',
    isFromClient: false,
    timestamp: 'Envoyé le 24/01/2022 à 13h34',
  },
  {
    id: '3',
    body: 'Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.Donec quam purus, ullamcorper sit amet sem ut, placerat ornare sem. Etiam vel sem tincidunt, facilisis nibh et, convallis ante.',
    isFromClient: true,
    timestamp: 'Reçu le 24/01/2022 à 13h34',
  },
  {
    id: '4',
    body: 'Fusce luctus elit et maximus imperdiet. Mauris augue velit, viverra quis ante eu, euismod luctus metus.',
    isFromClient: false,
    timestamp: 'Envoyé le 24/01/2022 à 13h34',
  },
];

/**
 * LeadCommunication component displays the communication history of a lead.
 * It renders a list of messages and provides functionality to open an email modal for replying to a message.
 */
const LeadCommunication = () => {
  const { t } = useTranslation();
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);

  const handleOpenEmailModal = () => {
    setEmailModalOpen(true);
  };

  const handleCloseEmailModal = () => {
    setEmailModalOpen(false);
  };

  const lastClientMessageIndex = messages
    .map((m, i) => (m.isFromClient ? i : -1))
    .reduce((a, b) => Math.max(a, b));

  return (
    <>
      <div className="m-4 text-xl font-bold">
        {messages.length} {t('lead.messages')}
      </div>
      <div className="max-h-screen overflow-y-auto p-4">
        {messages.map((message, index) => (
          <Message
            id={message.id}
            body={message.body}
            isFromClient={message.isFromClient}
            timestamp={message.timestamp}
            onReply={handleOpenEmailModal}
            isLastClientMessage={index === lastClientMessageIndex}
          />
        ))}
      </div>
      {isEmailModalOpen && (
        <ModalEmail onClose={handleCloseEmailModal} isOpen={isEmailModalOpen} />
      )}
    </>
  );
};

export default LeadCommunication;
