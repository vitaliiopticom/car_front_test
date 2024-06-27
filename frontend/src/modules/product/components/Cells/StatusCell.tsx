import React from 'react';
import { ProductStatus } from '../../types';

/**
 * Renders a status tag component.
 *
 * @param children - The content to be rendered inside the status tag.
 * @param className - The CSS class name to be applied to the status tag.
 */
const StatusTag = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <span
    className={`inline-block min-w-[100px] rounded-lg px-3 py-1 text-center ${className}`}
  >
    {children}
  </span>
);

/**
 * Mapping of product status values.
 */
const statusToComponent: { [key: string]: React.ComponentType } = {
  [ProductStatus.Available]: () => (
    <StatusTag className="bg-green-100 text-green-800">Available</StatusTag>
  ),
  [ProductStatus.Sold]: () => (
    <StatusTag className="bg-red-100 text-red-800">Sold</StatusTag>
  ),
};

/**
 * Renders a cell component based on the provided status.
 *
 * @param {string} status - The status value for the cell.
 * @returns {JSX.Element} The rendered cell component.
 */
const StatusCell = ({ status }: { status: string }) => {
  const StatusComponent =
    statusToComponent[status] || (() => <span>{status}</span>);
  return <StatusComponent />;
};

export default StatusCell;
