"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";

import MenuBar from "./MenuBar";
import { useEffect } from "react";

export default function Tiptap({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextStyle,
      Color,
      FontSize,
      HorizontalRule,
      TableKit.configure({
        table: { resizable: true },
      }),
      FontSize.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none prose-p:text-black prose-headings:text-black prose-li:text-black prose-td:text-black prose-th:text-black",
      },
    },
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div>
      {editor && <MenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        className="h-75 bg-white overflow-y-scroll border border-gray-300 rounded-md px-4 py-3 cursor-text shadow"
      />
    </div>
  );
}
