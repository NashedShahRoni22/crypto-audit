"use client";
import React, { useCallback } from "react";
import { useEditorState } from "@tiptap/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  BrushIcon,
  ChevronDown,
  CodeIcon,
  EraserIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  HighlighterIcon,
  ImagesIcon,
  ItalicIcon,
  LinkIcon,
  LogsIcon,
  MinusIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import LinkComponent from "./LinkComponent";
import { Input } from "../ui/input";
import { TableControls } from "./TableControls";
import { TablePicker } from "./TablePicker";

export default function MenuBar({ editor }) {
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,

        isLink: ctx.editor.isActive("link") ?? false,

        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,

        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,

        canRedo: editor.can(),
        canUndo: editor.can(),
      };
    },
  });
  if (!editor) return null;
  return (
    <div className="flex items-center flex-wrap space-x-2 border p-2 rounded mb-1">
      <div className="bg-[#f5f5f5] space-x-3 py-2 rounded border border-gray-400">
        <Button
          variant="outline"
          className="bg-transparent shadow-none border-none hover:text-brand"
          onClick={() => editor.chain().focus().undo().run()}
          type="button"
        >
          <UndoIcon className="size-4" strokeWidth={3} />
        </Button>
        <Button
          variant="outline"
          className="bg-transparent shadow-none border-none hover:text-brand"
          onClick={() => editor.chain().focus().redo().run()}
          type="button"
        >
          <RedoIcon className="size-4" strokeWidth={3} />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className="bg-transparent shadow-none border-none cursor-pointer"
            >
              formats <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <Button
              type="button"
              variant="outline"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`${editorState.isParagraph ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <span>Paragraph</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`${editorState.isHeading1 ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <Heading1Icon className="size-4" strokeWidth={3} />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`${editorState.isHeading2 ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <Heading2Icon className="size-4" strokeWidth={3} />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`${editorState.isHeading3 ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <Heading3Icon className="size-4" strokeWidth={3} />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={`${editorState.isHeading4 ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <Heading4Icon className="size-4" strokeWidth={3} />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              className={`${editorState.isHeading5 ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <Heading5Icon className="size-4" strokeWidth={3} />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 6 }).run()
              }
              className={`${editorState.isHeading6 ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <Heading6Icon className="size-4" strokeWidth={3} />
            </Button>
          </PopoverContent>
        </Popover>
        <Toggle
          pressed={editorState.isBold}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          size="sm"
          className="data-[state=on]:text-blue-500 data-[state=on]:bg-white rounded-none "
        >
          <BoldIcon className="size-4" strokeWidth={3} />
        </Toggle>
        <Toggle
          pressed={editorState.isItalic}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          size="sm"
          className="data-[state=on]:text-blue-500 rounded-none"
        >
          <ItalicIcon className="size-4" strokeWidth={3} />
        </Toggle>
        <Toggle
          pressed={editorState.isUnderline}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          size="sm"
          className="data-[state=on]:text-blue-500 rounded-none"
        >
          <UnderlineIcon className="size-4" strokeWidth={3} />
        </Toggle>
        <Toggle
          pressed={editorState.isStrike}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          size="sm"
          className="data-[state=on]:text-blue-500 rounded-none"
        >
          <StrikethroughIcon className="size-4" strokeWidth={3} />
        </Toggle>
      </div>
      <div className="bg-[#f5f5f5] space-x-3 py-2 rounded border border-gray-400">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-none shadow-none bg-transparent cursor-pointer"
            >
              Font Size <ChevronDown className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <Button
              variant="outline"
              type="button"
              onClick={() => editor.chain().focus().setFontSize("10px").run()}
              className={`bg-none border-none shadow-none ${
                editor.isActive("textStyle", { fontSize: "10px" })
                  ? "is-active"
                  : ""
              }`}
              data-test-id="10px"
            >
              10
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => editor.chain().focus().setFontSize("12px").run()}
              className={`bg-none border-none shadow-none ${
                editor.isActive("textStyle", { fontSize: "12px" })
                  ? "is-active"
                  : ""
              }`}
              data-test-id="12px"
            >
              12
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => editor.chain().focus().setFontSize("14px").run()}
              className={`bg-none border-none shadow-none ${
                editor.isActive("textStyle", { fontSize: "14px" })
                  ? "is-active"
                  : ""
              }`}
              data-test-id="14px"
            >
              14
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => editor.chain().focus().setFontSize("16px").run()}
              className={`bg-none border-none shadow-none ${
                editor.isActive("textStyle", { fontSize: "16px" })
                  ? "is-active"
                  : ""
              }`}
              data-test-id="16px"
            >
              16
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => editor.chain().focus().setFontSize("18px").run()}
              className={`bg-none border-none shadow-none ${
                editor.isActive("textStyle", { fontSize: "18px" })
                  ? "is-active"
                  : ""
              }`}
              data-test-id="18px"
            >
              18
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => editor.chain().focus().setFontSize("20px").run()}
              className={`bg-none border-none shadow-none ${
                editor.isActive("textStyle", { fontSize: "20px" })
                  ? "is-active"
                  : ""
              }`}
              data-test-id="20px"
            >
              20
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => editor.chain().focus().setFontSize("22px").run()}
              className={`bg-none border-none shadow-none ${
                editor.isActive("textStyle", { fontSize: "22px" })
                  ? "is-active"
                  : ""
              }`}
              data-test-id="22px"
            >
              22
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => editor.chain().focus().setFontSize("24px").run()}
              className={`bg-none border-none shadow-none ${
                editor.isActive("textStyle", { fontSize: "24px" })
                  ? "is-active"
                  : ""
              }`}
              data-test-id="24px"
            >
              24
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => editor.chain().focus().unsetFontSize().run()}
              data-test-id="unsetFontSize"
            >
              reset
            </Button>
          </PopoverContent>
        </Popover>
        <Toggle
          pressed={editorState.isHighlight}
          onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
          size="sm"
          className="data-[state=on]:text-blue-500 rounded-none"
        >
          <HighlighterIcon className="size-4" strokeWidth={3} />
        </Toggle>
        <Input
          type="color"
          value={editor.getAttributes("textStyle").color || <BrushIcon />}
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          className="w-8 h-8 cursor-pointer p-0 rounded border"
          title="Font Color"
        />
        <Button
          type="button"
          className="border-none shadow-none bg-transparent"
          variant="outline"
          onClick={() => editor.chain().focus().unsetColor().run()}
        >
          <EraserIcon className="size-6" />
        </Button>
      </div>
      <div className="bg-[#f5f5f5] space-x-3 py-2 rounded border border-gray-400">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-transparent shadow-none border-none cursor-pointer"
            >
              <AlignLeftIcon className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <Button
              type="button"
              variant="outline"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`${editorState.isAlignLeft ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <AlignLeftIcon className="size-4" strokeWidth={3} />{" "}
              <span className="text-[10px]">Align Left</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={`${editorState.isAlignCenter ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <AlignCenterIcon className="size-4" strokeWidth={3} />{" "}
              <span className="text-[10px]">Align Center</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`${editorState.isAlignRight ? "is-active" : ""} bg-none shadow-none border-none`}
            >
              <AlignRightIcon className="size-4" strokeWidth={3} />{" "}
              <span className="text-[10px]">Align Right</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={`${editorState.isAlignJustify ? "is-active" : ""} bg-none shadow-none border-none cursor-pointer`}
            >
              <AlignJustifyIcon className="size-4" strokeWidth={3} />{" "}
              <span className="text-[10px]">Align Justify</span>
            </Button>
          </PopoverContent>
        </Popover>
        <Toggle
          pressed={editorState.isBulletList}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          size="sm"
          className="data-[state=on]:text-blue-500 rounded-none"
        >
          <LogsIcon className="size-4" strokeWidth={3} />
        </Toggle>
        <Toggle
          pressed={editorState.isOrderedList}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          size="sm"
          className="data-[state=on]:text-blue-500 rounded-none"
        >
          <LogsIcon className="size-4" strokeWidth={3} />
        </Toggle>
      </div>
      <div className="bg-[#f5f5f5] space-x-3 py-2 rounded border border-gray-400">
        <Button
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="border-none shadow-none bg-transparent"
          title="Horizontal Line"
        >
          <MinusIcon className="size-4" />
        </Button>
        <Toggle
          pressed={editorState.isBlockquote}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          size="sm"
          className="data-[state=on]:text-blue-500 rounded-none"
        >
          <QuoteIcon className="size-4" strokeWidth={3} />
        </Toggle>
        <Toggle
          pressed={editorState.isCode}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
          size="sm"
          className="data-[state=on]:text-blue-500 rounded-none"
        >
          <CodeIcon className="size-4" strokeWidth={3} />
        </Toggle>

        {editorState.isLink ? (
          <Toggle
            pressed
            onPressedChange={
              editor.chain().focus().extendMarkRange("link").unsetLink().run
            }
          >
            <UnlinkIcon className="size-4" strokeWidth={3} />
          </Toggle>
        ) : (
          <LinkComponent editor={editor}>
            <LinkIcon className="size-4" strokeWidth={3} />
          </LinkComponent>
        )}
        <TablePicker editor={editor} />
        <TableControls editor={editor} />
        <Button
          type="button"
          variant="outline"
          className="bg-transparent shadow-none border-none"
          onClick={addImage}
        >
          <ImagesIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
