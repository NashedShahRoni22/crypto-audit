"use client";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import usePostMutation from "@/hooks/usePostMutation";
import useGetQuery from "@/hooks/useGetMutation";
import usePutMutation from "@/hooks/usePutMutation";

export default function CountryForm({ id, onClose }) {
  const isEditMode = !!id;
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      country_name: "",
      abriviation_code: "",
      icon: "",
      currency_name: "",
    },
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetQuery({
    endpoint: `/countries/${id}`,
    enabled: !!id,
    isTokenRequired: true,
    queryKey: ["country", id],
  });

  useEffect(() => {
    if (data) {
      reset(data?.data);
    }
  }, [data, reset]);

  const { mutate, isPending } = usePostMutation({
    endpoint: "/countries",
    isTokenRequired: true,
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = usePutMutation({
    endpoint: `/countries/${id}`,
    isTokenRequired: true,
  });

  const handleAddCountry = (data) => {
    const payload = { ...data };

    if (isEditMode) {
      updateMutate(payload, {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["countries"] });
            onClose();
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      mutate(payload, {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message);
            onClose();
            queryClient.invalidateQueries({ queryKey: ["countries"] });
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  let btnText = "";
  if (isPending) {
    btnText = "Adding Country...";
  }
  if (isUpdatePending) {
    btnText = "Updating Country";
  }
  if (!isPending && !id) {
    btnText = "Add Country";
  }
  if (!isPending && !isUpdatePending && id) {
    btnText = "Update Country";
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleAddCountry)} className="space-y-4">
        <Controller
          name="country_name"
          control={control}
          rules={{ required: "Country Name is required" }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Country Name</FieldLabel>
              <Input {...field} type="text" placeholder="Add a country name" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="currency_name"
          control={control}
          rules={{ required: "Currency name is required" }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Currency Name</FieldLabel>
              <Input {...field} type="text" placeholder="Add a currency name" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="abriviation_code"
          control={control}
          rules={{ required: "Currency  abbreviation code is required" }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel> Abbreviation</FieldLabel>
              <Input
                {...field}
                type="text"
                placeholder="Add an abbreviation Code"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="icon"
          control={control}
          rules={{ required: "Icon is required" }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Icon</FieldLabel>
              <Input {...field} type="text" placeholder="Add an icon" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          disabled={isPending}
          className="bg-brand/90 hover:bg-brand transition duration-300 w-full"
        >
          {btnText}
        </Button>
      </form>
    </div>
  );
}
