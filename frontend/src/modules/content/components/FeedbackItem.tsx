import React from 'react';

interface FeedbackItemProps {
  imageSrc: string;
  altText: string;
  issues: string[];
}

/**
 * Represents a feedback item component.
 * @param {string} imageSrc - The source URL of the image.
 * @param {string} altText - The alternative text for the image.
 * @param {string[]} issues - An array of issues related to the feedback.
 * @returns {JSX.Element} The rendered feedback item component.
 */
const FeedbackItem: React.FC<FeedbackItemProps> = ({
  imageSrc,
  altText,
  issues,
}) => {
  return (
    <div className="mb-4 flex">
      <img
        alt={altText}
        className="mr-4 h-28 w-28 rounded-xl object-cover"
        src={imageSrc}
      />
      <div className="flex flex-col justify-center">
        {issues.map((issue, index) => (
          <p key={index} className="text-sm">
            {issue}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FeedbackItem;
