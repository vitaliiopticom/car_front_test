import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
// ReactQuill only supports three font styles by default: sans-serif, serif, and monospace.
// To add other fonts like Calibri, we need to create a separate CSS file for this component
// and add the other fonts there.
import './richText.css';
interface RichTextProps {
  body: string;
  onChange: (content: string) => void;
}

/**
 * RichText component for displaying and editing rich text content.
 * @param body - The initial value of the rich text content.
 * @param onChange - The callback function to handle changes to the rich text content.
 */
const RichText: React.FC<RichTextProps> = ({ body, onChange }) => {
  const Quill = ReactQuill.Quill;
  const Font = Quill.import('formats/font');
  Font.whitelist = [
    'Calibri',
    'Raleway',
    'Roboto',
    'sans-serif',
    'serif',
    'monospace',
  ];
  const quillRef = useRef(null);
  const [color, setColor] = useState('#000000');

  // @ts-ignore
  const quill = (quillRef.current as Quill | null)?.getEditor();
  const range = quill?.getSelection();
  if (range) {
    quill.format('color', color, 'user');
  }
  return (
    <div className="h-96">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={body}
        onChange={onChange}
        className="mb-4 h-80"
        modules={{
          toolbar: [
            [{ font: Font.whitelist }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['blockquote'],
            ['image'],
            [{ link: 'link' }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['clean'],
          ],
        }}
      />
    </div>
  );
};

export default RichText;
