import { Columns2Icon, MergeIcon, Rows2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

export function TableControls({ editor }) {
  if (!editor.isActive("table")) return null;

  const controls = [
    {
      icon: <Columns2Icon className="size-4" />,
      label: "+Col After",
      action: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      icon: <Columns2Icon className="size-4 rotate-180" />,
      label: "+Col Before",
      action: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      icon: <Rows2Icon className="size-4" />,
      label: "+Row After",
      action: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      icon: <Rows2Icon className="size-4 rotate-180" />,
      label: "+Row Before",
      action: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      icon: <Trash2Icon className="size-4" />,
      label: "Del Row",
      action: () => editor.chain().focus().deleteRow().run(),
    },
    {
      icon: <Trash2Icon className="size-4" />,
      label: "Del Col",
      action: () => editor.chain().focus().deleteColumn().run(),
    },
    {
      icon: <MergeIcon className="size-4" />,
      label: "Merge/Split",
      action: () => editor.chain().focus().mergeOrSplit().run(),
    },
    {
      icon: <Trash2Icon className="size-4 text-red-500" />,
      label: "Del Table",
      action: () => editor.chain().focus().deleteTable().run(),
    },
  ];

  return (
    <div className="flex gap-1 border-l pl-2 ml-1">
      {controls.map((ctrl, i) => (
        <Button
          key={i}
          className="border-none shadow-none bg-transparent"
          type="button"
          variant="outline"
          size="sm"
          onClick={ctrl.action}
          title={ctrl.label}
        >
          {ctrl.icon}
        </Button>
      ))}
    </div>
  );
}
