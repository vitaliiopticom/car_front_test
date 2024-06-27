import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';
import { DropDownSelectOption } from '@/types/form';
import { languageOptions } from '../utils/leadUtils';

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  DropDownSelectOption,
  Multi
>;



/**
 * Renders a language select component for leads.
 *
 * @param props - The component props.
 * @returns The rendered language select component.
 */
export const LeadLanguageSelect = <Multi extends boolean>(
  props: Props<Multi>,
) => {
  return <DataSelectField data={languageOptions} {...props} />;
};
