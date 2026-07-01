"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import usePostMutation from "@/hooks/usePostMutation";
import useGetQuery from "@/hooks/useGetMutation";
import usePatchMutation from "@/hooks/usePatchMutation";
export default function BankForm({ id, onClose }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      bank_name: "",
      account_no: "",
      branch: "",
      routing_number: "",
      type: "",
    },
  });
  const queryClient = useQueryClient();
  const transferTypes = ["Bank", "Mobile Banking"];

  const { data } = useGetQuery({
    endpoint: `/bank/show/${id}`,
    enabled: !!id,
    isTokenRequired: true,
    queryKey: ["bank", id],
  });

  useEffect(() => {
    if (data) {
      reset(data?.data);
    }
  }, [data, reset]);

  const { mutate, isPending } = usePostMutation({
    endpoint: "/bank/create",
    isTokenRequired: true,
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = usePatchMutation(
    {
      endpoint: `/bank/update/${id}`,
      isTokenRequired: true,
    },
  );

  const handleAddBank = (data) => {
    if (id) {
      updateMutate(data, {
        onSuccess: (data) => {
          if (data.success === true) {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["banks"] });
            onClose();
          } else {
            toast.error(data.message);
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      mutate(data, {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["banks"] });
            onClose();
          } else {
            toast.error(data.message);
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
    btnText = "Adding Bank...";
  }
  if (isUpdatePending) {
    btnText = "Updating Bank";
  }
  if (!isPending && !id) {
    btnText = "Add Bank";
  }
  if (!isPending && !isUpdatePending && id) {
    btnText = "Update Bank";
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddBank)} className="space-y-4">
        <Controller
          name="bank_name"
          control={control}
          rules={{ required: "Bank name is required" }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Bank Name</FieldLabel>
              <Input
                {...field}
                type="text"
                placeholder="Enter a bank account name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="account_no"
          control={control}
          rules={{ required: "Account number is required" }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Bank Account</FieldLabel>
              <Input
                {...field}
                type="text"
                placeholder="Enter a bank account number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="branch"
          control={control}
          rules={{ required: "Branch name is required" }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Branch Name</FieldLabel>
              <Input {...field} type="text" placeholder="Enter a branch name" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="routing_number"
          control={control}
          rules={{ required: "Routing number is required" }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Routing Number</FieldLabel>
              <Input {...field} type="text" placeholder="Routing Number" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="type"
          control={control}
          rules={{ required: "Please select a transfer method" }}
          render={({ field, fieldState }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <FieldLabel>Transfer Type</FieldLabel>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a transfer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  {transferTypes.map((type, i) => (
                    <SelectItem key={i} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Select>
          )}
        />
        <Button
          disabled={isPending || isUpdatePending}
          className="bg-brand/90 hover:bg-brand transition duration-300 w-full"
        >
          {btnText}
        </Button>
      </form>
    </div>
  );
}
