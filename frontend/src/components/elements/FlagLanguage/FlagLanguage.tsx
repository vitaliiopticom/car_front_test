import React, { FC } from 'react';
import { IconBaseProps } from 'react-icons';
import { icons } from '@/components/elements/Icon/icons';

const languageToFlag: { [key: string]: FC<IconBaseProps> } = {
  French: icons.frFlag,
  Spanish: icons.esFlag,
  German: icons.deFlag,
  English: icons.gbFlag,
  Italian: icons.itFlag,
};

interface FlagLanguageProps {
  language: string;
}

/**
 * Renders a flag icon based on the provided language.
 *
 * @param {Object} props - The component props.
 * @param {string} props.language - The language code.
 * @returns {JSX.Element | null} - The rendered flag icon or null if no flag icon is available for the language.
 */
const FlagLanguage: FC<FlagLanguageProps> = ({ language }) => {
  const FlagIcon = languageToFlag[language];
  return FlagIcon ? <FlagIcon style={{ width: '2vw', height: '2vw' }} /> : null;
};

export default FlagLanguage;
