import React from 'react';
import { CheckboxGroup, Heading, Textarea } from '@/components/elements';
import { QualityFeedbackProps } from '../types';
import { useQualityFeedback } from '@/modules/content/hooks/useQualityFeedback';
import { useTranslation } from 'react-i18next';
import { QualityIssue } from '../enums';

export const QualityFeedback: React.FC<QualityFeedbackProps> = ({
  onValidatePicture,
  resetFlag,
  isModalOpen,
  vehicleItem,
}) => {
  const { t } = useTranslation();
  const {
    qualityItems,
    notes,
    handleChange,
    handleNotesChange,
    handleBlur,
    checkboxOptions,
  } = useQualityFeedback(
    vehicleItem,
    resetFlag,
    onValidatePicture,
    isModalOpen,
  );

  const values = qualityItems
    .filter((item) => item.checked)
    .map((item) => item.value);

  return (
    <div
      key={resetFlag ? 'reset' : 'no-reset'}
      className="flex flex-col gap-2 pt-10"
    >
      <Heading as="h3" className="pb-2" variant="h4">
        {`${t('content.qualityFeedback')}:`}
      </Heading>
      <div className="mb-4">
        <CheckboxGroup
          className="flex flex-col gap-2"
          options={checkboxOptions.filter(
            (option) => option.value === QualityIssue.QualityGood,
          )}
          value={values}
          onChange={handleChange}
        />
      </div>
      <CheckboxGroup
        className="flex flex-col gap-2"
        options={checkboxOptions.filter(
          (option) => option.value !== QualityIssue.QualityGood,
        )}
        value={values}
        onChange={handleChange}
      />
      <Textarea
        className="mt-4"
        placeholder={t('common.addComments')}
        value={notes}
        onChange={handleNotesChange}
        onBlur={handleBlur}
      />
    </div>
  );
};
