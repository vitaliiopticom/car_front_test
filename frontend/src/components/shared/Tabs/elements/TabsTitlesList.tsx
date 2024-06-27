import { FC } from 'react';
import { Tab } from '@headlessui/react';

import { cx } from '@/utils/classNames';

import { TabElement } from '../types';

export type TabsTitlesListProps = {
  tabs: TabElement[];
  listClassName?: string;
  isNotClickable?: boolean;
};

export const TabsTitlesList: FC<TabsTitlesListProps> = ({
  tabs,
  listClassName,
  isNotClickable,
}) => {
  return (
    <Tab.List
      className={cx('flex justify-start gap-8 overflow-auto', listClassName)}
    >
      {tabs.map(({ title, disabled }, index) => (
        <Tab
          key={index}
          className={({ selected }) =>
            cx(
              'relative z-10 pb-2.5 text-secondary-tint-10',
              selected &&
                'border-b-2 border-primary font-semibold text-primary outline-0',
              isNotClickable ? 'cursor-auto' : 'hover:text-primary-shade-40',
              disabled ? 'text-gray-400' : '',
            )
          }
          disabled={disabled}
        >
          {title}
        </Tab>
      ))}
    </Tab.List>
  );
};
