import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptyState({ text, btnTxt, handleAddClick, href }) {
  return (
    <div className=" flex-col flex justify-center items-center pt-40">
      {text && (
        <p className="text-muted-foreground text-sm max-w-xs mx-auto text-center">
          {text}
        </p>
      )}
      {btnTxt && (
        <Button
          onClick={handleAddClick}
          className="bg-brand/90 hover:bg-brand mt-2"
        >
          {href && (
            <Link href={href} className="flex items-center gap-1">
              <Plus /> {btnTxt}
            </Link>
          )}

          {!href && (
            <span className="flex items-center gap-1">
              <Plus />
              {btnTxt}
            </span>
          )}
        </Button>
      )}
    </div>
  );
}
