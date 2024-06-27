/**
 * Renders a cell indicating whether the item is cloned or not.
 *
 * @param {boolean} isCloned - Indicates whether the item is cloned.
 * @returns {JSX.Element} - The rendered cloned cell.
 */
const ClonedCell = ({ isCloned }: { isCloned: boolean }) => (
  <span>{isCloned ? '✅' : '❌'}</span>
);

export default ClonedCell;
