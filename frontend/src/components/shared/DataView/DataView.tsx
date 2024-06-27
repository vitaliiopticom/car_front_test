import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import type { FieldValuesType } from '../Form';

import { FilterGroup } from './elements/FilterGroup';
import { Filters } from './elements/Filters';
import { FiltersToggle } from './elements/FiltersToggle';
import { Grid } from './elements/Grid';
import { LayoutToggle } from './elements/LayoutToggle';
import { Pagination } from './elements/Pagination';
import { RecordsCount } from './elements/RecordsCount';
import { SelectionActionsPopup } from './elements/SelectionActionsPopup';
import { SelectionCheckbox } from './elements/SelectionCheckbox';
import { Table } from './elements/Table';
import {
  useDataView,
  useDataViewStore,
  useGetIsViewDefined,
} from './hooks/useDataViewStore';
import { DEFAULT_PAGE_SIZE, LAYOUT_MODE } from './constants';
import type {
  DataViewChangeHandler,
  DataViewContextType,
  DataViewFiltersChangeHandler,
  DataViewPageChangeHandler,
  DataViewSelectionHandler,
  DataViewType,
  DisableItemSelection,
  LayoutMode,
} from './types';

type OnChangeHelperProps<D, Filters extends FieldValuesType> = {
  id: string;
  onPageChange?: DataViewPageChangeHandler;
  onFiltersChange?: DataViewFiltersChangeHandler<Filters>;
  onChange?: DataViewChangeHandler<Filters>;
  onSelectionChange?: DataViewSelectionHandler<D>;
};

type Props<D, Filters extends FieldValuesType> = PropsWithChildren<
  OnChangeHelperProps<D, Filters> & {
    data: D[];
    recordsCount?: number;
    filterDefaultValues?: Filters;
    defaultLayoutMode?: LayoutMode;
    initialPageSize?: number;
    isLoading?: boolean;
    isFetching?: boolean;
    handleItemSelectionDisabled?: DisableItemSelection<D>;
    hidePagination?: boolean;
  }
>;

type Components = {
  Toggle: typeof LayoutToggle;
  Pagination: typeof Pagination;
  Filters: typeof Filters;
  Table: typeof Table;
  Grid: typeof Grid;
  RecordsCount: typeof RecordsCount;
  FilterGroup: typeof FilterGroup;
  FiltersToggle: typeof FiltersToggle;
  SelectionActionsPopup: typeof SelectionActionsPopup;
  SelectionCheckbox: typeof SelectionCheckbox;
};

export const DataViewContext = createContext<DataViewContextType>(
  {} as DataViewContextType,
);

const PaginationChangeHelper = <D, Filters extends FieldValuesType>({
  id,
  onPageChange,
  onChange,
  onFiltersChange,
  onSelectionChange,
}: PropsWithChildren<OnChangeHelperProps<D, Filters>>) => {
  const { pagination, filters, selectedItems } = useDataView<D>(id) || {};

  useEffect(() => {
    onPageChange?.(pagination);
    // eslint-disable-next-line
  }, [pagination?.page, pagination?.pageSize]);

  useEffect(() => {
    onFiltersChange?.(filters as Filters);
    // eslint-disable-next-line
  }, [filters]);

  useEffect(() => {
    onSelectionChange?.(selectedItems);
    // eslint-disable-next-line
  }, [selectedItems]);

  useEffect(() => {
    onChange?.({ pagination, filters: filters as Filters });
    // eslint-disable-next-line
  }, [pagination.page, pagination.pageSize, filters]);

  return null;
};

export const DataView = <D, Filters extends FieldValuesType>({
  id,
  data,
  defaultLayoutMode = LAYOUT_MODE.list,
  recordsCount = 0,
  children,
  onPageChange,
  onFiltersChange,
  onChange,
  onSelectionChange,
  isLoading = false,
  isFetching = false,
  filterDefaultValues,
  handleItemSelectionDisabled = undefined,
  initialPageSize = DEFAULT_PAGE_SIZE,
  hidePagination = false,
}: Props<D, Filters>): ReactElement<Props<D, Filters> & Components> | null => {
  const { addView } = useDataViewStore.getState();
  const isViewDefined = useGetIsViewDefined(id);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!isViewDefined) {
      const view: DataViewType<D> = {
        layoutMode: defaultLayoutMode,
        filters: filterDefaultValues || {},
        filtersCollapsed: true,
        pagination: {
          page: 1,
          pageSize: initialPageSize,
        },
        selectedItems: [],
      };

      addView(id, view);
    }
    // eslint-disable-next-line
  }, [id, filterDefaultValues]);

  if (!isViewDefined) {
    return null;
  }

  return (
    <DataViewContext.Provider
      value={{
        id,
        data,
        isLoading,
        isFetching,
        isSubmitting,
        setIsSubmitting,
        recordsCount,
        filterDefaultValues,
        handleItemSelectionDisabled,
      }}
    >
      {!hidePagination && <PaginationChangeHelper
        id={id}
        onChange={onChange}
        onFiltersChange={onFiltersChange}
        onPageChange={onPageChange}
        onSelectionChange={onSelectionChange}
      />}
      {children}
    </DataViewContext.Provider>
  );
};

DataView.Toggle = LayoutToggle;
DataView.Pagination = Pagination;
DataView.Filters = Filters;
DataView.Table = Table;
DataView.Grid = Grid;
DataView.RecordsCount = RecordsCount;
DataView.FilterGroup = FilterGroup;
DataView.FiltersToggle = FiltersToggle;
DataView.SelectionActionsPopup = SelectionActionsPopup;
DataView.SelectionCheckbox = SelectionCheckbox;
