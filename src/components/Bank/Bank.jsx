"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import DialogModal from "../shared/DialogModal/DialogModal";
import { BankCardSkeleton } from "../skeleton/BankCardSkeleton";
import BankCard from "../card/BankCard";
import useGetQuery from "@/hooks/useGetMutation";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteMutation from "@/hooks/useDeleteMutation";
import EmptyState from "../EmptyState/EmptyState";

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
        {banks.length > 0 && !isLoading && (
          <Button
            onClick={handleAddClick}
            className="bg-brand/90 hover:bg-brand"
          >
            <Plus /> Add Bank
          </Button>
        )}
      </div>

      <DialogModal
        isOpen={modalState.isOpen}
        id={modalState.id}
        onClose={handleClose}
        tab="bank"
      />

      {!isLoading && banks.length === 0 && (
        <EmptyState
          text="No Bank Added Yet! please add a Bank to get customer payment"
          btnTxt="Add Bank"
          handleAddClick={handleAddClick}
        />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-6">
          <BankCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-6">
          <BankCard
            banks={banks}
            handleUpdateClick={handleUpdateClick}
            handleDelete={handleDelete}
            deletePending={deletePending}
          />
        </div>
      )}
    </div>
  );
}
