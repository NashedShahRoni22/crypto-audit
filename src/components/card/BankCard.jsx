import { PencilIcon, TrashIcon } from "lucide-react";
import { Card } from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Separator } from "../ui/separator";

export default function BankCard({
  banks,
  deletePending,
  handleDelete,
  handleUpdateClick,
}) {
  return (
    <>
      {banks.map((bank) => (
        <Card size="sm" className="mx-auto w-full" key={bank?.id}>
          <div className="flex justify-between">
            <div className="flex items-center gap-3 px-6">
              <div className="bg-gray-100 h-12 w-12 flex items-center justify-center uppercase rounded-full">
                {bank.bank_name.slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold">{bank.bank_name}</p>
                <span className="text-sm text-muted-foreground">
                  ID: {bank.id}
                </span>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-none shadow-none bg-none cursor-pointer pr-6"
                >
                  <TrashIcon className="size-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`Are you want to remove ${bank.bank_name} ? This action cannot be undone.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete(bank?.id);
                    }}
                    disabled={deletePending}
                    className="bg-red-600"
                  >
                    {deletePending ? (
                      <>
                        Deleting... <Spinner />
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="px-6">
            <Separator />
          </div>
          <div className="px-6 pt-2 pb-4 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                {bank.account_no && `Account Number: ${bank.account_no}`}
              </p>
              <p className="text-xs text-muted-foreground">
                {bank.branch && ` Branch: ${bank.branch}`}
              </p>
              <p className="text-xs text-muted-foreground">
                {bank.routing_number && `Routing No: ${bank.routing_number}`}
              </p>
              <p className="text-xs text-muted-foreground">
                Transfer Type:{" "}
                {bank.type === "bank" ? "Bank" : "Mobile Banking"}
              </p>
            </div>
            <span
              onClick={() => handleUpdateClick(bank.id)}
              className="text-brand cursor-pointer"
            >
              <PencilIcon size={16} />
            </span>
          </div>
        </Card>
      ))}
    </>
  );
}
