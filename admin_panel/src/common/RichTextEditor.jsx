import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, List, ListOrdered, Heading2,
  Heading3, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Unlink, Undo, Redo, RemoveFormatting
} from 'lucide-react';

const RichTextEditor = ({ value, onChange = 'Write details...', disabled = false }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'text-blue-600 dark:text-blue-400 underline'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    content: value || '',
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // If content is empty paragraph, return empty string
      if (html === '<p></p>') {
        onChange('');
      } else {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[140px] max-h-[400px] overflow-y-auto px-4 py-3 outline-none text-sm text-gray-900 dark:text-white focus:outline-none'
      }
    }
  });

  // Sync editor content with external value change
  useEffect(() => {
    if (editor && value !== undefined) {
      const currentHTML = editor.getHTML();
      if (value !== currentHTML && !(value === '' && currentHTML === '<p></p>')) {
        editor.commands.setContent(value || '', false);
      }
    }
  }, [value, editor]);

  // Update editable state
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl || 'https://');
    if (url === null) return;
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  };

  return (
    <div className={`border rounded-xl overflow-hidden transition-all shadow-sm ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
      }`}>
      {/* Toolbar */}
      {!disabled && (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-100 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700/80 select-none">
          {/* Bold */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive('bold')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive('italic')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>

          {/* Underline */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive('underline')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>

          {/* Strike */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive('strike')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* H2 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive('heading', { level: 2 })
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          {/* H3 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive('heading', { level: 3 })
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive('bulletList')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Ordered List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive('orderedList')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* Alignments */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive({ textAlign: 'left' })
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive({ textAlign: 'center' })
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive({ textAlign: 'right' })
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* Link */}
          <button
            type="button"
            onClick={setLink}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${editor.isActive('link')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>

          {editor.isActive('link') && (
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
              title="Remove Link"
            >
              <Unlink className="w-4 h-4" />
            </button>
          )}

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="p-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>

          <div className="ml-auto flex items-center gap-1">
            {/* Undo */}
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </button>

            {/* Redo */}
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="rich-text-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
