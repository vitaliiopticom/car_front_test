import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataView } from './DataView';

test('DataView renders without errors', () => {
  render(
    <DataView
      id="data-view"
      data={[]}
      onPageChange={() => {}}
      onFiltersChange={() => {}}
      onChange={() => {}}
      onSelectionChange={() => {}}
    >
      <div title="dataview-content">Test Child</div>
    </DataView>,
  );

  // Assert that the component renders without throwing any errors
  const dataViewElement = screen.getByTitle('dataview-content');
  expect(dataViewElement).not.toBeNull();
});
