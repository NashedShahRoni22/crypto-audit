import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function EmptyState({ text, btnTxt, handleAddClick }) {
  return (
    <div className=" flex-col flex justify-center items-center pt-40">
      <p className="text-muted-foreground text-sm max-w-xs mx-auto text-center">
        {text}
      </p>
      <Button
        onClick={handleAddClick}
        className="bg-brand/90 hover:bg-brand mt-2"
      >
        <Plus /> {btnTxt}
      </Button>
    </div>
  );
}
