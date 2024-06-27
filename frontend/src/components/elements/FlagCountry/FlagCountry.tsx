import { FC } from 'react';

import { getFlagUrlByCountryName } from '@/utils/flags';

type Props = {
  name: string | undefined;
};
/**
 * Renders a flag image for a given country name.
 *
 * @param {Props} props - The component props.
 * @param {string} props.name - The name of the country.
 * @returns {JSX.Element | null} The flag image component or null if the country name is not provided.
 */
export const FlagCountry: FC<Props> = ({ name }) => {
  if (!name) return null;

  return (
    <img
      alt={name}
      className="h-4 rounded-sm"
      src={getFlagUrlByCountryName(name)}
      title={name}
    />
  );
};
