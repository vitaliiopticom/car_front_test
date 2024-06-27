import { useState } from 'react';
import { ITag } from '@/components/shared/InputEmailTags/InputEmailTags';

/**
 * Custom hook for managing email state and handling email changes.
 * @returns An object containing email state and functions to handle email changes.
 */
const useEmail = () => {
  const [recipient, setRecipient] = useState<ITag[]>([]);
  const [cc, setCc] = useState<ITag[]>([]);
  const [bcc, setBcc] = useState<ITag[]>([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [emailAttachments, setEmailAttachments] = useState<{ path: string }[]>(
    [],
  );

  const handleEmailChange = (field: string, value: any) => {
    switch (field) {
      case 'recipient':
        setRecipient(value);
        break;
      case 'cc':
        setCc(value);
        break;
      case 'bcc':
        setBcc(value);
        break;
      case 'showCc':
        setShowCc(value);
        break;
      case 'showBcc':
        setShowBcc(value);
        break;
      case 'subject':
        setSubject(value);
        break;
      case 'body':
        setBody(value);
        break;
      case 'emailAttachments':
        setEmailAttachments(value);
        break;

      default:
        break;
    }
  };

  return {
    recipient,
    cc,
    bcc,
    showCc,
    showBcc,
    subject,
    body,
    emailAttachments,
    handleEmailChange,
    setEmailAttachments,
  };
};

export default useEmail;
