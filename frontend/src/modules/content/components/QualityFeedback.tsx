import React, { useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';

import { CheckboxGroup, Heading, Textarea } from '@/components/elements';

import {
  CONTENT_ITEM_TYPE,
  EXTERIOR_QUALITY_OPTIONS,
  INTERIOR_QUALITY_OPTIONS,
  PROTOCOL_QUALITY_OPTIONS,
} from '../constants';
import { QualityCheckStatus, QualityIssue } from '../enums';
import { QualityCheckItem, QualityFeedbackProps } from '../types';

import {
  SaveQualityCheckMutationRequest,
  useSaveQualityCheckMutation,
} from '@/modules/content/api/saveQualityCheck';
import { useQualityCheck } from '@/modules/content/hooks/useQualityCheck';

/**
 * Generate quality options based on the position.
 * @param {string} position - The position of the content item.
 * @param {boolean} isQualityGoodImage - Flag indicating if the quality is good.
 * @param {string[]} imageIssues - List of image issues.
 * @returns {QualityCheckItem[]} - List of quality check items.
 */
const generateQualityOptions = (
  position: string | undefined,
  isQualityGoodImage: boolean,
  imageIssues: string[],
) => {
  const selectedQualityOptions =
    position === CONTENT_ITEM_TYPE.EXTERIOR
      ? [...EXTERIOR_QUALITY_OPTIONS, ...PROTOCOL_QUALITY_OPTIONS]
      : [...INTERIOR_QUALITY_OPTIONS, ...PROTOCOL_QUALITY_OPTIONS];

  return selectedQualityOptions.map((item) => ({
    ...item,
    checked:
      item.value === QualityIssue.QualityGood
        ? isQualityGoodImage
        : imageIssues.includes(item.value),
  }));
};

export const QualityFeedback: React.FC<QualityFeedbackProps> = ({
  onValidatePicture,
  resetFlag,
  isModalOpen,
  vehicleItem,
}) => {
  const {
    contentType: position,
    qualityCheck,
    vehicleId,
    id: vehicleImageId,
  } = vehicleItem;
  const [qualityItems, setQualityItems] = useState<QualityCheckItem[]>([]);
  const [notes, setNotes] = useState<string>(qualityCheck?.comments || '');
  const [saveQualityCheck] = useSaveQualityCheckMutation();
  const { isQualityCheckerOwner } = useQualityCheck(
    vehicleItem.vehicleId || '',
  );

  useEffect(() => {
    setQualityItems(
      generateQualityOptions(
        position,
        qualityCheck?.isQualityGood || false,
        qualityCheck?.issues || []
      ),
    );
    setNotes(qualityCheck?.comments || '')
  }, [position, resetFlag, qualityCheck?.isQualityGood, qualityCheck?.issues]);

  const handleChange = async (updatedIssues: string[]) => {
    const updatedInformation = qualityItems.map((item) => ({
      ...item,
      checked: updatedIssues.includes(item.value),
    }));
    setQualityItems(updatedInformation);

    const isQualityGood = updatedIssues.includes(QualityIssue.QualityGood);
    if (isQualityGood) {
      onValidatePicture();
    }

    const filteredIssues = updatedIssues.filter(
      (issue) => issue !== QualityIssue.QualityGood,
    );

    const photoQualityCheck: SaveQualityCheckMutationRequest['photoQualityCheck'] =
      {
        comment: notes,
        isQualityGood: isQualityGood,
        issues: filteredIssues,
        status: isQualityGood
          ? QualityCheckStatus.Checked
          : filteredIssues.length > 0
          ? QualityCheckStatus.CheckedWithError
          : QualityCheckStatus.Unchecked,
        vehicleImageId: vehicleImageId,
        vehicleId: vehicleId,
      };

    await saveQualityCheck({ variables: { photoQualityCheck } });
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };
  const handleBlur = () => {
    handleChange(values);
  };

  const values = qualityItems
    .filter((item) => item.checked)
    .map((item) => item.value);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isModalOpen) return;
      if (event.key === 'Enter') {
        if (values.length === 0) {
          handleChange([QualityIssue.QualityGood]);
        } else {
          onValidatePicture();
        }
      }
    },
    [handleChange, onValidatePicture, values, isModalOpen],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const checkboxOptions = qualityItems.map((item) => ({
    label: item.label,
    value: item.value,
    isDisabled:
      !isQualityCheckerOwner ||
      (item.value !== QualityIssue.QualityGood &&
        qualityItems.some(
          (info) => info.value === QualityIssue.QualityGood && info.checked,
        )) ||
      (item.value === QualityIssue.QualityGood &&
        qualityItems.some(
          (info) => info.value !== QualityIssue.QualityGood && info.checked,
        )),
  }));

  return (
    <div
      key={resetFlag ? 'reset' : 'no-reset'}
      className="flex flex-col gap-2 pt-10"
    >
      <Heading as="h3" className="pb-2" variant="h4">
        {`${t('common.qualityFeedback')}:`}
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
        placeholder={t('common.addNotes') || 'Add notes here...'}
        value={notes}
        onChange={handleNotesChange}
        onBlur={handleBlur}
      />
    </div>
  );
};
