"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PencilIcon, Plus, TrashIcon } from "lucide-react";
import DialogModal from "../shared/DialogModal/DialogModal";
import useGetQuery from "@/hooks/useGetMutation";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import useDeleteMutation from "@/hooks/useDeleteMutation";
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
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function Country() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    id: null,
  });

  const queryClient = useQueryClient();

  const handleAddClick = () => setModalState({ isOpen: true, id: null });
  const handleEditClick = (id) => setModalState({ isOpen: true, id: id });
  const handleClose = () => setModalState({ isOpen: false, id: null });

  const { data, isLoading } = useGetQuery({
    endpoint: "/countries",
    enabled: true,
    isTokenRequired: true,
    queryKey: ["countries"],
  });

  const { mutate: deleteMutate, isPending: deletePending } = useDeleteMutation({
    endpoint: "/countries",
    isTokenRequired: true,
  });

  const handleDelete = (id) => {
    deleteMutate(id, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["countries"] });
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const countries = data?.data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        {countries?.length > 0 && !isLoading && (
          <p className="text-xs text-muted-foreground">
            Total: {countries?.length} Countries
          </p>
        )}
        <div className="flex items-center justify-end py-6">
          <Button onClick={handleAddClick} className="bg-brand">
            <Plus /> Add Country
          </Button>
        </div>
      </div>

      <DialogModal
        isOpen={modalState.isOpen}
        id={modalState.id}
        onClose={handleClose}
        tab="country"
      />

      <div className="grid grid-cols-4 gap-4 py-6">
        {countries.map((country) => (
          <Card size="sm" className="mx-auto w-full" key={country?.id}>
            <div className="flex justify-between">
              <div className="flex items-center gap-3 px-6">
                <div className="bg-gray-100 h-12 w-12 flex items-center justify-center rounded-full">
                  {country.abriviation_code}
                </div>
                <div>
                  <p className="font-semibold">{country.country_name}</p>
                  <span className="text-sm text-muted-foreground">
                    ID: {country.id}
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
                      {`Are you want to remove ${country.country_name} ? This action cannot be undone.`}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        handleDelete(country?.id);
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
            <div className="px-6 pt-2 pb-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Currency Symbol:{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: country.icon }}
                  className="text-black"
                />
              </p>
              <span
                onClick={() => handleEditClick(country.id)}
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
