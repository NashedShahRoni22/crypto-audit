"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PencilIcon, Plus, TrashIcon } from "lucide-react";
import DialogModal from "../shared/DialogModal/DialogModal";
import useGetQuery from "@/hooks/useGetMutation";
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
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteMutation from "@/hooks/useDeleteMutation";
import { Spinner } from "../ui/spinner";
import toast from "react-hot-toast";

export default function Bank() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    id: null,
  });

  const queryClient = useQueryClient();

  const handleAddClick = () => {
    setModalState({ isOpen: true, id: null });
  };
  const handleUpdateClick = (id) => {
    setModalState({ isOpen: true, id: id });
  };
  const handleClose = () => setModalState({ isOpen: false, id: null });

  const { data, isLoading } = useGetQuery({
    endpoint: "/bank/list",
    enabled: true,
    isTokenRequired: true,
    queryKey: ["banks"],
  });

  const { mutate: deleteMutate, isPending: deletePending } = useDeleteMutation({
    endpoint: "/bank/delete",
    isTokenRequired: true,
  });

  const handleDelete = (id) => {
    deleteMutate(id, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["banks"] });
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const banks = data?.data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        {banks?.length > 0 && !isLoading && (
          <p className="text-xs text-muted-foreground">
            Total: {banks?.length} Banks
          </p>
        )}
        <Button onClick={handleAddClick} className="bg-brand">
          <Plus /> Add Bank
        </Button>
      </div>

      <DialogModal
        isOpen={modalState.isOpen}
        id={modalState.id}
        onClose={handleClose}
        tab="bank"
      />

      <div className="grid grid-cols-4 gap-4 py-6">
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
      </div>
    </div>
  );
}
