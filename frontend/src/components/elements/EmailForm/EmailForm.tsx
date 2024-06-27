import React from 'react';
import { useTranslation } from '@/i18n';
import { Input } from '../Input/Input';
import InputEmailTags from '@/components/shared/InputEmailTags/InputEmailTags';
import RichText from '@/components/shared/RichText/RichText';
import { ITag } from '@/components/shared/InputEmailTags/InputEmailTags';

interface EmailFormProps {
  recipient: ITag[];
  cc: ITag[];
  bcc: ITag[];
  showCc: boolean;
  showBcc: boolean;
  subject: string;
  body: string;
  emailAttachments: { path: string }[];
  handleEmailChange: (field: string, value: any) => void;
}

/**
 * Renders an email form component.
 *
 * @component
 * @param {EmailFormProps} props - The props for the EmailForm component.
 * @param {string[]} props.recipient - The initial recipient email addresses.
 * @param {string[]} props.cc - The initial CC email addresses.
 * @param {string[]} props.bcc - The initial BCC email addresses.
 * @param {boolean} props.showCc - Determines whether to show the CC field.
 * @param {boolean} props.showBcc - Determines whether to show the BCC field.
 * @param {string} props.subject - The initial email subject.
 * @param {string} props.body - The initial email body.
 * @param {any[]} props.emailAttachments - The initial email attachments.
 * @param {Function} props.handleEmailChange - The function to handle email changes.
 * @returns {JSX.Element} The rendered EmailForm component.
 */
const EmailForm: React.FC<EmailFormProps> = ({
  recipient,
  cc,
  bcc,
  showCc,
  showBcc,
  subject,
  body,
  emailAttachments,
  handleEmailChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
        {t('common.recipient')}
      </label>
      <InputEmailTags
        initialTags={recipient}
        onTagsChange={(tags) => handleEmailChange('recipient', tags)}
        placeholder={t('common.addRecipient')}
        className="color-white w-full bg-primary-tint-90"
      />
      <div className=" flex flex-col items-start">
        {showCc ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
              {t('common.cc')}
            </label>

            <InputEmailTags
              initialTags={cc}
              onTagsChange={(tags) => handleEmailChange('cc', tags)}
              placeholder={t('common.addCc')}
            />
          </div>
        ) : (
          <button onClick={() => handleEmailChange('showCc', true)}>
            {t('common.addCc')}
          </button>
        )}

        {showBcc ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
              {t('common.bcc')}
            </label>

            <InputEmailTags
              initialTags={bcc}
              onTagsChange={(tags) => handleEmailChange('bcc', tags)}
              placeholder={t('common.addBcc')}
            />
          </div>
        ) : (
          <button onClick={() => handleEmailChange('showBcc', true)}>
            {t('common.addBcc')}
          </button>
        )}
      </div>
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
        {t('common.subject')}
      </label>
      <Input
        value={subject}
        onChange={(e) => handleEmailChange('subject', e.target.value)}
      />
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
        {t('common.body')}
      </label>
      <RichText
        body={body}
        onChange={(value) => handleEmailChange('body', value)}
      />
    </>
  );
};

export default EmailForm;
