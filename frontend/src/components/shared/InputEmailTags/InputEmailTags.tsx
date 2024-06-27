import { FC, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

export interface ITag {
  id: string;
  text: string;
  [key: string]: any; // Adding an index signature to satisfy external type requirements
}

interface InputEmailTagsProps {
  initialTags?: ITag[];
  onTagsChange: (tags: ITag[]) => void;
  placeholder: string;
  className?: string;
}

const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

/**
 * InputEmailTags component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ITag[]} props.initialTags - The initial tags for the input.
 * @param {Function} props.onTagsChange - The callback function to handle tag changes.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {string} props.className - The additional CSS class name for the component.
 * @returns {JSX.Element} The rendered InputEmailTags component.
 */
const InputEmailTags: FC<InputEmailTagsProps> = ({
  initialTags = [],
  onTagsChange,
  placeholder,
  className,
}) => {
  const [tags, setTags] = useState<ITag[]>(initialTags);

  const handleDelete = (i: number) => {
    const newTags = tags.filter((tag, index) => index !== i);
    setTags(newTags);
    onTagsChange(newTags);
  };

  const handleAddition = (tag: ITag) => {
    const newTag = { ...tag, className: tag.className || '' }; // Ensure className is never undefined
    const newTags = [...tags, newTag];
    setTags(newTags);
    onTagsChange(newTags);
  };

  return (
    <div className="flex flex-wrap">
      <ReactTags
        tags={tags as any[]}
        handleDelete={handleDelete}
        handleAddition={(t: any) => handleAddition(t)}
        delimiters={delimiters}
        classNames={{
          // @ts-ignore
          tag: `react-tag-input__tag__content bg-primary-tint-90 mx-2 text-xl ${className}`,
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputEmailTags;
