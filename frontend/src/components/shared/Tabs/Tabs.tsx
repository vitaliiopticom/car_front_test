import { FC } from 'react';
import cx from 'classnames';
import { Tab } from '@headlessui/react';

import {
  TabsContentList,
  TabsContentsListProps,
} from './elements/TabsContentList';
import { TabsTitlesList, TabsTitlesListProps } from './elements/TabsTitlesList';

export type TabsProps = {
  selectedTab?: number;
  defaultIndex?: number;
  setSelectedTab?: (value: number) => void;
  isListBorder?: boolean;
  listBorderClassName?: string;
} & TabsContentsListProps &
  TabsTitlesListProps;

export const Tabs: FC<TabsProps> = ({
  isNotClickable,
  tabs,
  selectedTab,
  setSelectedTab,
  unmount = true,
  isListBorder = true,
  listClassName,
  defaultIndex = 0,
  listBorderClassName,
}) => {
  return (
    <Tab.Group
      defaultIndex={defaultIndex}
      selectedIndex={selectedTab}
      onChange={setSelectedTab}
    >
      <TabsTitlesList
        isNotClickable={isNotClickable}
        listClassName={listClassName}
        tabs={tabs}
      />
      {isListBorder && (
        <div className={cx("relative -top-0.5 h-[1px] w-full bg-secondary-tint-80", listBorderClassName)} />
      )}
      <TabsContentList tabs={tabs} unmount={unmount} />
    </Tab.Group>
  );
};
