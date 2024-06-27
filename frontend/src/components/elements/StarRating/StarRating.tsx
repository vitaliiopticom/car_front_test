import { FC, useState } from 'react';

import { cx } from '@/utils/classNames';
import { isDef } from '@/utils/common';

import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  rating?: number;
  scaleSize?: number;
  iconSize?: Size;
  withTooltip?: boolean;
  onRatingChange?: (newRating: number) => void;
};

type IconName = 'star' | 'starHalf' | 'starOutline';

const iconSizes = {
  sm: 20,
  md: 30,
  lg: 40,
};

const renderIcon = (
  index: number,
  name: IconName,
  color: string,
  iconSize?: Size,
  onClick?: () => void,
) => {
  return (
    <Icon
      key={index}
      className={cx(name === 'starHalf' && 'absolute', color)}
      name={name}
      size={iconSize && iconSizes[iconSize]}
      onClick={onClick}
    />
  );
};

const renderStars = (
  length: number,
  icon: IconName,
  color: 'text-primary' | 'text-gray-40',
  iconSize?: Size,
  onClick?: (index: number) => void,
) =>
  Array.from({ length }, (_, index) =>
    renderIcon(
      index,
      icon,
      color,
      iconSize,
      () => onClick && onClick(index + 1),
    ),
  );

/**
 * Renders a star rating component.
 *
 * @component
 *
 * @param {object} props - The component props.
 * @param {number} props.rating - The rating value.
 * @param {number} props.scaleSize - The total number of stars in the rating scale.
 * @param {string} props.iconSize - The size of the star icons.
 * @param {boolean} props.withTooltip - Whether to show a tooltip with the rating value.
 * @param {function} props.onRatingChange - The callback function triggered when the rating is changed.
 * @returns {JSX.Element} The rendered star rating component.
 */
export const StarRating: FC<Props> = ({
  rating = 0,
  scaleSize = 5,
  iconSize = 'lg',
  withTooltip,
  onRatingChange,
}) => {
  const [currentRating, setRating] = useState(rating);

  const handleStarClick = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const emptyStars = renderStars(
    scaleSize,
    'starOutline',
    'text-gray-40',
    iconSize,
  );

  if (!isDef(rating)) {
    return <span className="flex">{emptyStars}</span>;
  }

  const ratingRoundedToHalf = Math.round(currentRating * 2) / 2;
  const colorStarsNumber = Math.floor(ratingRoundedToHalf);
  const isHalf = ratingRoundedToHalf > colorStarsNumber;
  const greyStarsNumber = scaleSize - colorStarsNumber - (isHalf ? 1 : 0);

  const colorStars = renderStars(
    colorStarsNumber,
    'star',
    'text-primary',
    iconSize,
    handleStarClick,
  );
  const greyStars = renderStars(
    greyStarsNumber,
    'starOutline',
    'text-gray-40',
    iconSize,
    (index) => handleStarClick(index + colorStarsNumber + (isHalf ? 1 : 0)),
  );

  const stars = (
    <span className="flex">
      {colorStars}
      {isHalf &&
        renderIcon(999, 'starHalf', 'text-primary', iconSize, () =>
          handleStarClick(colorStarsNumber + 0.5),
        )}
      {greyStars}
    </span>
  );

  return withTooltip ? (
    <Tooltip content={`${currentRating} / ${scaleSize}`}>{stars}</Tooltip>
  ) : (
    stars
  );
};
