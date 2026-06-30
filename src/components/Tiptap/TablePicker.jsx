import { TableIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";

export function TablePicker({ editor }) {
  const [hovered, setHovered] = useState({ rows: 0, cols: 0 });
  const MAX = 8;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          type="button"
          className="border-none shadow-none bg-transparent"
          title="Insert Table"
        >
          <TableIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          {hovered.rows > 0
            ? `${hovered.rows} × ${hovered.cols} Table`
            : "Select table size "}
        </p>

        {/* Grid */}
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${MAX}, 1.25rem)` }}
        >
          {Array.from({ length: MAX * MAX }).map((_, i) => {
            const row = Math.floor(i / MAX) + 1;
            const col = (i % MAX) + 1;
            const isActive = row <= hovered.rows && col <= hovered.cols;
            return (
              <div
                key={i}
                className={`w-5 h-5 border rounded-sm cursor-pointer transition-colors ${
                  isActive
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onMouseEnter={() => setHovered({ rows: row, cols: col })}
                onMouseLeave={() => setHovered({ rows: 0, cols: 0 })}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: row, cols: col, withHeaderRow: true })
                    .run();
                }}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
