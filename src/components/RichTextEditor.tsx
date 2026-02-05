'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import {
    Bold, Italic, Strikethrough, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Undo, Redo, Maximize
} from 'lucide-react'
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { useEffect } from 'react'

interface RichTextEditorProps {
    id: string;
    content: string;
    onChange: (content: string) => void;
}

const RichTextEditor = ({ id, content, onChange }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm focus:outline-none max-w-none min-h-[238px] p-4',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;

    return (
        <div id={id} className="border rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-neutral-400 transition-all bg-white">
            <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-white">

                <Separator orientation="vertical" className="h-6 mx-1" />

                <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
                    <Strikethrough className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
                    <Italic className="h-4 w-4" />
                </Toggle>

                <Separator orientation="vertical" className="h-6 mx-1" />

                <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
                    <List className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered className="h-4 w-4" />
                </Toggle>

                <Separator orientation="vertical" className="h-6 mx-1" />

                <Toggle size="sm" pressed={editor.isActive({ textAlign: 'left' })} onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}>
                    <AlignLeft className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive({ textAlign: 'center' })} onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}>
                    <AlignCenter className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive({ textAlign: 'right' })} onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}>
                    <AlignRight className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive({ textAlign: 'justify' })} onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()}>
                    <AlignJustify className="h-4 w-4" />
                </Toggle>


                <button onClick={() => editor.chain().focus().undo().run()} className="p-2 hover:bg-neutral-100 rounded-md">
                    <Undo className="h-4 w-4" />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()} className="p-2 hover:bg-neutral-100 rounded-md">
                    <Redo className="h-4 w-4" />
                </button>
                <Toggle size="sm"><Maximize className="h-4 w-4" /></Toggle>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;