import { FC, useMemo } from 'react';

import { Card, Heading } from '@/components/elements';
import { Form, FormPrompt } from '@/components/shared';
import { useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';

import { UpdateUserWithMultipleTenantsForm } from '../../users/types';
// import { LeadFields } from './LeadFields';
import { LeadBase, LeadFormValuesBase } from '../types/leadTypes';

type Props = {
  onSubmit: (values: UpdateUserWithMultipleTenantsForm) => void;
  isSubmitting: boolean;
  lead: LeadBase;
  isCurrentUser?: boolean;
};

/**
 * LeadProfileForm component.
 * Renders a form for updating lead profile information.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Function} props.onSubmit - The function to handle form submission.
 * @param {Lead} props.lead - The lead object containing initial values for the form fields.
 * @returns {JSX.Element} The rendered LeadProfileForm component.
 */
export const LeadProfileForm: FC<Props> = ({ onSubmit, lead }) => {
  // const { t } = useTranslation();
  // const formValidation = useFormValidation();

  // const schema = useMemo(
  //   () =>
  //     formValidation
  //       .schema<LeadFormValuesBase>({
  //         id: formValidation.string(),
  //         firstName: formValidation.string(),
  //         lastName: formValidation.string(),
  //         gender: formValidation.string(),
  //         email: formValidation.email(),
  //         defaultLanguageId: formValidation.string(),
  //         phoneNumber: formValidation.phoneNumber(true),
  //         mobileNumber: formValidation.phoneNumber(true),
  //       })
  //       .refine(
  //         (formValues) => !!formValues.phoneNumber || !!formValues.mobileNumber,
  //         {
  //           message: t('fieldError.phoneOrMobile'),
  //           path: ['mobileNumber'],
  //         },
  //       ),
  //   [formValidation, t],
  // );

  // const defaultValues: Partial<UpdateUserWithMultipleTenantsForm> = useMemo(
  //   () => ({
  //     firstname: lead?.firstName,
  //     lastname: lead?.lastName,
  //     email: lead?.email,
  //     mobileNumber: lead?.mobileNumber || '',
  //     phoneNumber: lead?.phoneNumber || '',
  //   }),
  //   [lead],
  // );

  return <></>;

  // return (
  //   <>
  //     <Form
  //       defaultValues={defaultValues}
  //       id="updateUserForm"
  //       schema={schema}
  //       onSubmit={onSubmit}
  //     >
  //       <section>
  //         <Card className="mb-5">
  //           <div className="flex justify-between">
  //             <Heading className="mb-12" variant="h4">
  //               {t('lead.personalInfo')}
  //             </Heading>
  //           </div>
  //           <div className="flex flex-wrap-reverse gap-x-16">
  //             <LeadFields />
  //           </div>
  //         </Card>
  //       </section>
  //       <FormPrompt />
  //     </Form>
  //   </>
  // );
};
