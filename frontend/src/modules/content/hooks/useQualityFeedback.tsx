import { useCallback, useEffect, useMemo, useState } from 'react';
import { QualityCheckItem, QualityFeedbackProps } from '../types';
import {
  SaveQualityCheckMutationRequest,
  useSaveQualityCheckMutation,
} from '@/modules/content/api/saveQualityCheck';
import { useQualityCheck } from '@/modules/content/hooks/useQualityCheck';
import { useContentType } from '@/modules/content/pages/ContentTypeContext';
import { QualityCheckStatus, QualityIssue } from '../enums';
import {
  CONTENT_ITEM_TYPE,
  EXTERIOR_QUALITY_OPTIONS,
  INTERIOR_QUALITY_OPTIONS,
  PROTOCOL_QUALITY_OPTIONS,
} from '../constants';
import { KEYBOARD } from '@/constants/constants';

// Function to generate quality options based on the content item position
const generateQualityOptions = (
  position: string | undefined,
  isQualityGoodImage: boolean,
  imageIssues: string[],
): QualityCheckItem[] => {
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

// Custom hook for managing quality feedback logic
export const useQualityFeedback = (
  vehicleItem: any,
  resetFlag: boolean,
  onValidatePicture: () => void,
  isModalOpen: boolean,
) => {
  const { currentContentType, setCurrentContentType } = useContentType();
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

  // Effect to set the current content type based on the vehicle item position
  useEffect(() => {
    setCurrentContentType(position);
  }, [setCurrentContentType, position]);

  // Memoized quality options based on current content type and quality check status
  const qualityOptions = useMemo(() => {
    return generateQualityOptions(
      currentContentType,
      qualityCheck?.isQualityGood || false,
      qualityCheck?.issues || [],
    );
  }, [currentContentType, qualityCheck?.isQualityGood, qualityCheck?.issues]);

  // Effect to update quality items and notes when quality options or reset flag change
  useEffect(() => {
    setQualityItems(qualityOptions);
    setNotes(qualityCheck?.comments || '');
  }, [qualityOptions, resetFlag]);

  // Function to handle changes in the selected quality issues
  const handleChange = useCallback(
    async (updatedIssues: string[]) => {
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
    },
    [
      notes,
      qualityItems,
      saveQualityCheck,
      vehicleImageId,
      vehicleId,
      onValidatePicture,
    ],
  );

  // Function to handle changes in the notes textarea
  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  // Function to handle blur event on the notes textarea
  const handleBlur = () => {
    handleChange(values);
  };

  // Array of selected values for quality items
  const values = useMemo(() => {
    return qualityItems
      .filter((item) => item.checked)
      .map((item) => item.value);
  }, [qualityItems]);

  // Function to handle key down events for form submission
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isModalOpen) return;
      if (event.key === KEYBOARD.ENTER) {
        if (values.length === 0) {
          handleChange([QualityIssue.QualityGood]);
        } else {
          onValidatePicture();
        }
      }
    },
    [handleChange, onValidatePicture, values, isModalOpen],
  );

  // Effect to add and remove key down event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Prepare checkbox options with disabled state logic
  const checkboxOptions = useMemo(() => {
    return qualityItems.map((item) => ({
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
  }, [isQualityCheckerOwner, qualityItems]);

  // Return the necessary state and handlers for the component
  return {
    qualityItems,
    notes,
    handleChange,
    handleNotesChange,
    handleBlur,
    checkboxOptions,
  };
};
