import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BankForm from "@/components/Bank/BankForm";
import CountryForm from "@/components/Country/CountryForm";

export default function DialogModal({ isOpen, id, onClose, tab }) {
  const isEditMode = !!id;

  let title = "";
  if (!isEditMode && tab === "country") {
    title = "Add Country";
  }
  if (isEditMode && tab === "country") {
    title = "Update Country";
  }
  if (!isEditMode && tab === "bank") {
    title = "Add Bank";
  }
  if (isEditMode && tab === "bank") {
    title = "Update BAnk Information";
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {tab === "country" ? (
          <CountryForm id={id} onClose={onClose} />
        ) : (
          <BankForm id={id} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
