import { FC, useEffect } from 'react';
import { LeadFormValuesBase } from '../types/leadTypes';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  RadioGroupField,
  InputField,
  PhoneInputField,
} from '@/components/shared';
import { LeadLanguageSelect } from './LeadLanguageSelect';
import { LANGS } from '@/i18n';
import { getGenderOptions, genderOptions } from '../utils/leadUtils';

/**
 * Default values for the lead form fields.
 */
export const leadFormDefaultValues = (lan?: string): Partial<LeadFormValuesBase> => {
  return {
    tenantId: '',
    // platform: 'Manually',
    emailDetails: {
      emailSubject: '',
    },
    clientInformation: {
      title: genderOptions[1],
      firstName: '',
      lastName: '',
      language: lan || LANGS[0].code.toLowerCase(),
      emails: [''],
      telephones: [''],
      mobiles: ['', ''],
    },
  }
};

export const CREATE_LEAD_FORM_ID = 'createLeadForm';
export const UPDATE_LEAD_FORM_ID = 'updateLeadForm';

export const LeadFormFields: FC = () => {
  const { t } = useTranslation();
  const { setFocus } = useFormContext();
  const location = useLocation();
  const key = location.key;
  const { fieldToFocus } = location?.state || {};
  const genderOptions = getGenderOptions(t);

  useEffect(() => {
    setFocus(fieldToFocus);
  }, [fieldToFocus, key]);
  return (
    <div className="flex flex-wrap-reverse gap-x-16">
      <div className="grid-col grid gap-4">
        <div>
          <RadioGroupField
            label={t('common.title')}
            name="clientInformation.title"
            options={genderOptions}
          />
          <LeadLanguageSelect
            isClearable={false}
            label={t('common.defaultLanguage')}
            name="clientInformation.language"
          />
        </div>
        <div>
          <InputField
            label={t('common.subject')}
            name="emailDetails.emailSubject"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            label={t('common.firstname')}
            name="clientInformation.firstName"
          />
          <InputField
            label={t('common.lastname')}
            name="clientInformation.lastName"
          />
        </div>

        <InputField
          label={t('common.email')}
          name="clientInformation.emails[0]"
          type="email"
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PhoneInputField
            label={t('common.phoneNumber')}
            name="clientInformation.telephones[0]"
          />
          <PhoneInputField
            label={t('common.mobileNumber')}
            name="clientInformation.mobiles[0]"
          />
        </div>
      </div>
    </div>
  );
};
