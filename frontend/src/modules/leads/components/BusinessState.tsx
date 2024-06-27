import { useEffect, useState } from 'react';
import { Dropdown } from '@/components/elements';
import { Button } from '@/components/elements';
import { useTranslation } from '@/i18n';

import { getLeadBusinessStatusOptions } from '../utils/leadUtils';

import { BusinessStateEnum } from '../types/leadTypes';


interface BusinessStateProps {
  code: BusinessStateEnum;
}

type Props = {
  onChange: (v: any) => void;
  value: string | undefined;
}

// const options: { label: string; code: string }[] = [{
//   label: 'Choose business state',
//   code: ''
// }];


// for (const key in BusinessStateEnum) {
//   if (BusinessStateEnum.hasOwnProperty(key)) {
//     const enumKey = key as keyof typeof BusinessStateEnum;
//     options.push({ label: key, code: BusinessStateEnum[enumKey] });
//   }
// }

/**
 * Represents a component for selecting a business state.
 */
export const BusinessState = ({onChange, value}: Props) => {

  const { t } = useTranslation();
  const options = getLeadBusinessStatusOptions(t);

  getLeadBusinessStatusOptions
  /**
   * Handles the state change when a new state is selected.
   * @param state - The selected business state.
   */
  const handleStateChange = (state: BusinessStateProps) => {
    setSelectedState(state.code);
    onChange(state.code);
  };

  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    setSelectedState((value || '') as BusinessStateEnum)
  }, [value]);

  return (
    <Dropdown
      items={options}
      render={({ item, defaultClassName }) => (
        <Button
          className={`${defaultClassName} ${
            item.code === selectedState ? 'active' : ''
          }`}
          variant="secondary"
          onClick={() => handleStateChange(item as BusinessStateProps)}
        >
          {item.label}
        </Button>
      )}
    >
      <Button variant="secondary" className="whitespace-nowrap">
        {options.find((state) => state.code === selectedState)?.label ||
          options[0].label}
      </Button>
    </Dropdown>
  );
};
