import { useMemo, PropsWithChildren, ReactNode, useEffect } from 'react';
import { Card, Heading, StarRating } from '@/components/elements';
import {
  Form as FormShared,
  InputField,
  PhoneInputField,
  RadioGroupField,
  // FormProps,
} from '@/components/shared';
import { useTranslation } from '@/i18n';

// import { Button, ButtonProps } from '@/components/elements';

import { Lead } from '../types/leadTypes';
import { LeadLanguageSelect } from './LeadLanguageSelect';
import { LeadFormValuesBase } from '../types/leadTypes';
import { useFormValidation } from '@/hooks';
import { useForm } from 'react-hook-form';
import { getGenderOptions, languageOptions } from '../utils/leadUtils';

import {
  UPDATE_LEAD_FORM_ID,
  leadFormDefaultValues,
} from './LeadFormFields';


// type ButtonConfig = ButtonProps & { key: string };


/**
 * LeadInfo component displays the information of a lead client.
 *
 * @param onSubmit - Function to handle form submission.
 */
const LeadInfo = ({
  isSaving,
  onSubmit,
  data
}: {
  isSaving: boolean;
  data: Lead;
  onSubmit: (values: any) => void;
}) => {
  const { t, i18n } = useTranslation();
  const formValidation = useFormValidation();
  const genderOptions = getGenderOptions(t);


  const schema = useMemo(
    () =>
      formValidation
        .schema<LeadFormValuesBase>({
          id: formValidation.string().optional(),
          clientInformation: formValidation.schema({
            title: formValidation.string(),
            firstName: formValidation.string(),
            lastName: formValidation.string(),
            language: formValidation.string(),
            emails: formValidation.stringArray().min(1),
            telephones: formValidation.stringArray().min(1).optional(),
            mobiles: formValidation.stringArray().min(1).optional(),
          }),
          rating: formValidation.number(),
        })
        .refine(
          (data) =>
            !!data.clientInformation.telephones ||
            !!data.clientInformation.mobiles,
          {
            message: t('fieldError.phoneOrMobile'),
            path: ['clientInformation', 'telephones'], // Ruta correcta en el objeto de validación
          },
        ),
    [formValidation, t],
  );

  const defaultValues = {
    id: data.id,
    clientInformation: {
      ...leadFormDefaultValues(i18n.language).clientInformation,
      ...data.clientInfo,
      language: data.clientInfo.language?.toLowerCase(),
    },
    rating: data.rating || 0,
  } as LeadFormValuesBase;

  const formMethods = useForm({
    defaultValues,
    mode: 'onChange',
  });


  useEffect(() => {
    const subscription = formMethods.watch((value, { name, type }) => {
      onSubmit(value);
    })
    return () => subscription.unsubscribe()
  }, [formMethods.watch])


  return (
    <>
      <FormShared onSubmit={onSubmit}
        id={UPDATE_LEAD_FORM_ID}
        formMethods={formMethods as any}
        defaultValues={defaultValues}
        schema={schema}
      >
        <section>
          <Card className="mb-5">
            <Heading className="mb-4" variant="h4">
              {t('lead.information')}
            </Heading>
            <div className="space-y-4 rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-bold">Information client</h2>
              <div>
                <StarRating
                  rating={data.rating || 0}
                  scaleSize={5}
                  iconSize="md"
                  onRatingChange={(r: number) => {
                    formMethods.setValue('rating', r);
                  }}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InputField label={t('common.firstname')} name="clientInformation.firstName" />
                <InputField label={t('common.lastname')} name="clientInformation.lastName" />
              </div>
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InputField
                  label={t('common.email')}
                  name="clientInformation.emails[0]"
                  type="email"
                />
              </div>
            </div>
          </Card>
        </section>
      </FormShared>
    </>
  );
};

export default LeadInfo;
