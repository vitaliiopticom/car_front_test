import type { FC } from 'react';
import type { IconBaseProps } from 'react-icons';

type Props = IconBaseProps;

export const ITIcon: FC<Props> = (props) => {
  return (
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fillRule="evenodd" strokeWidth="1pt">
        <path d="M0 0h640v480H0z" fill="#fff" />
        <path d="M0 0h213.3v480H0z" fill="#009246" />
        <path d="M426.7 0H640v480H426.7z" fill="#ce2b37" />
      </g>
    </svg>
  );
};
