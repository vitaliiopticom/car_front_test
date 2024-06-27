import React, { FC, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormModal, PromptConfirmModal } from '@/components/shared';
import { handleProceedWithPrompt } from '@/components/shared/PromptConfirmModal';
import { useDisclosure, useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { LeadFormValuesBase } from '../types/leadTypes';
import {
  LeadFormFields,
  CREATE_LEAD_FORM_ID,
  leadFormDefaultValues,
} from './LeadFormFields';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: LeadFormValuesBase) => void;
  lead?: LeadFormValuesBase;
  withAsyncValidation?: boolean;
  submitLabel?: string;
  isLoading?: boolean;
  withTenantRoles?: boolean;
  isAddUser?: boolean;
};

export const LeadFormModal: FC<Props> = ({
  title,
  lead,
  onClose,
  onSubmit,
  isOpen,
  submitLabel,
  isLoading,
}) => {
  const { t, i18n } = useTranslation();
  const formValidation = useFormValidation();

  const warningModal = useDisclosure();
  const schema = useMemo(
    () =>
      formValidation
        .schema<LeadFormValuesBase>({
          id: formValidation.string().optional(),
          tenantId: formValidation.string(),
          platform: formValidation.string(),
          clientInformation: formValidation.schema({
            title: formValidation.string(),
            firstName: formValidation.string(),
            lastName: formValidation.string(),
            language: formValidation.string(),
            emails: formValidation.stringArray().min(1),
            telephones: formValidation.stringArray().min(1).optional(),
            mobiles: formValidation.stringArray().min(1).optional(),
          }),
          emailDetails: formValidation.schema({
            emailSubject: formValidation.string(),
          }),
          leadState: formValidation.string(),
          businessState: formValidation.string(),
          firstResponse: formValidation.boolean(),
          rating: formValidation.number(),
          leadSource: formValidation.string(),
          manuallyCreated: formValidation.boolean(),
          agentId: formValidation.string().optional(),
          createdAt: formValidation.string(),
          createdBy: formValidation.string(),
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
      ...leadFormDefaultValues(i18n.language),
      ...lead,
    } as LeadFormValuesBase;

  const formMethods = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const resetLeadCreationData = () => {
    warningModal.onClose();
    formMethods.reset();
    onClose();
  };

  const handleClose = () =>
    handleProceedWithPrompt(
      formMethods,
      warningModal.onOpen,
      resetLeadCreationData,
    );

  useEffect(() => {
    if (!isOpen) {
      handleClose();
    }
  }, [isOpen]);

  return (
    <>
      <FormModal
        defaultValues={defaultValues}
        formId={CREATE_LEAD_FORM_ID}
        formMethods={formMethods}
        isOpen={isOpen}
        isSubmitting={isLoading}
        resetFormMethodsOnClose={false}
        submitLabel={submitLabel}
        title={title}
        schema={schema}
        withDivider
        onClose={handleClose}
        onSubmit={onSubmit}
      >
        <LeadFormFields />
      </FormModal>
      <PromptConfirmModal
        isOpen={warningModal.isOpen}
        onClose={warningModal.onClose}
        onConfirm={resetLeadCreationData}
      />
    </>
  );
};
