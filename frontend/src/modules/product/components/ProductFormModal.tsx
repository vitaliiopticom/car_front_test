import { FC } from 'react';

import { FormModal } from '@/components/shared';

import {
  ProductFormFields,
  productFormDefaultValues,
} from './ProductFormFields';
import { CREATE_PRODUCT_FORM_ID } from './ProductFormFields';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
};

/**
 * Renders a modal for creating  a product.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.title - The title of the modal.
 * @param {boolean} props.isOpen - Determines whether the modal is open or not.
 * @param {() => void} props.onClose - The function to close the modal.
 * @param {() => void} props.onSubmit - The function to submit the form.
 * @returns {JSX.Element} The rendered component.
 */
export const ProductFormModal: FC<Props> = ({
  title,
  isOpen,
  onClose,
  onSubmit,
}) => {
  return (
    <>
      <FormModal
        defaultValues={productFormDefaultValues}
        formId={CREATE_PRODUCT_FORM_ID}
        isOpen={isOpen}
        isSubmitting={false}
        resetFormMethodsOnClose={false}
        title={title}
        withDivider
        onClose={onClose}
        onSubmit={onSubmit}
      >
        <ProductFormFields />
      </FormModal>
    </>
  );
};
