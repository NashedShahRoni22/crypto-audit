"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import PriceRow from "./PriceRow";
import useGetQuery from "@/hooks/useGetMutation";
import { formatBackendDate } from "@/lib/formatBackendDate";

const emptyPrice = {
  country_id: "",
  price: "",
  discount_type: "no discount",
  discount_amount: "",
  discount_expire_at: "",
};

export default function Pricing({ defaultValues, onNext, onBack }) {
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      prices: defaultValues?.prices ?? [emptyPrice],
    },
  });
  useEffect(() => {
    if (defaultValues?.prices?.length) {
      reset({
        prices: defaultValues.prices.map((p) => ({
          country_id: p.country_id ?? "",
          price: p.price ?? "",
          discount_type: p.discount_type ?? "no discount",
          discount_amount: p.discount_amount ?? "",
          discount_expire_at: p.discount_expire_at
            ? p.discount_expire_at.slice(0, 19)
            : "",
        })),
      });
    }
  }, [defaultValues, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const { data, isLoading } = useGetQuery({
    endpoint: "/countries",
    enabled: true,
    isTokenRequired: true,
    queryKey: ["countries"],
  });

  const countryLists = data?.data ?? [];

  const onSubmit = (data) => {
    const formatted = data.prices.map((p) => ({
      ...p,
      discount_expire_at: formatBackendDate(p.discount_expire_at),
      discount_amount:
        p.discount_type === "no discount" ? 0 : p.discount_amount,
    }));
    onNext({ prices: formatted });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 pt-10 lg:px-10"
    >
      {fields.map((field, index) => (
        <PriceRow
          key={field.id}
          control={control}
          index={index}
          remove={remove}
          countryLists={countryLists}
          setValue={setValue}
        />
      ))}

      <Button
        variant="outline"
        type="button"
        onClick={() => append(emptyPrice)}
      >
        <Plus size={14} /> Add another country
      </Button>

      <div className="flex justify-end gap-3 pt-2">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-4"
          >
            <ArrowLeft size={16} /> Back
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-brand/90 hover:bg-brand px-4"
        >
          Next <ArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
}
