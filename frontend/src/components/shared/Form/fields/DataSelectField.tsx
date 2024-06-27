import {
  DataSelect,
  DataSelectProps,
  SelectValue,
} from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

const defaultMapper = <D,>(data: D | any) => ({
  value: data.id,
  label: data.name,
});

type Props<D, Multi extends boolean> = BaseFieldProps<
  Partial<DataSelectProps<D, Multi>>,
  SelectValue<D, Multi>
> & { handleOnChange?: (e: SelectValue<string, Multi>) => void };

export type RequiredDataSelectFieldProps<D, Multi extends boolean> = Omit<
  Props<D, Multi>,
  'data' | 'mapDataToOption'
>;

export const DataSelectField = <D, Multi extends boolean>({
  rules,
  name,
  id = name,
  label,
  helperText,
  isMultiple,
  className,
  tooltip,
  data = [],
  isRequired,
  mapDataToOption = defaultMapper,
  handleOnChange,
  disabled,
  ...rest
}: Props<D, Multi>) => {
  return (
    <BaseField
      className={className}
      defaultValue={isMultiple ? [] : null}
      helperText={helperText}
      id={id}
      isRequired={isRequired}
      label={label}
      name={name}
      rules={rules}
      tooltip={tooltip}
    >
      {({ controller, isInvalid, isEmpty, isFormDisabled }) => {
        const { ref, onChange, ...field } = controller.field;

        return (
          <DataSelect
            id={id}
            {...field}
            data={data}
            disabled={disabled || isFormDisabled}
            inputRef={ref}
            isEmpty={isEmpty}
            isInvalid={isInvalid}
            isMultiple={isMultiple}
            mapDataToOption={mapDataToOption}
            required={isRequired}
            onChange={(e) => {
              handleOnChange?.(e);
              onChange(e);
            }}
            {...rest}
            value={field.value}
          />
        );
      }}
    </BaseField>
  );
};
