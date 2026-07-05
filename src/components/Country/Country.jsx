"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import DialogModal from "../shared/DialogModal/DialogModal";
import CountryCard from "../card/CountryCard";
import { CountryCardSkeleton } from "../skeleton/CountryCardSkeleton";
import useGetQuery from "@/hooks/useGetMutation";
import useDeleteMutation from "@/hooks/useDeleteMutation";
import { useQueryClient } from "@tanstack/react-query";
import EmptyState from "../EmptyState/EmptyState";

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
        {countries.length > 0 && !isLoading && (
          <div className="flex items-center justify-end py-6">
            <Button
              onClick={handleAddClick}
              className="bg-brand/90 hover:bg-brand"
            >
              <Plus /> Add Country
            </Button>
          </div>
        )}
      </div>

      <DialogModal
        isOpen={modalState.isOpen}
        id={modalState.id}
        onClose={handleClose}
        tab="country"
      />

      {!isLoading && countries.length === 0 && (
        <EmptyState
          text="  No Country Added Yet! please add a country to publish products"
          btnTxt="Add Country"
          handleAddClick={handleAddClick}
        />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-6">
          <CountryCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-6">
          <CountryCard
            countries={countries}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
            deletePending={deletePending}
          />
        </div>
      )}
    </div>
  );
}
