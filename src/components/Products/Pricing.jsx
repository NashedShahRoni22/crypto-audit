"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import useGetQuery from "@/hooks/useGetMutation";
import PriceRow from "./PriceRow";
import { useEffect } from "react";

const emptyPrice = {
  country_id: 0,
  price: "",
  discount_type: "no discount",
  discount_amount: "",
  discount_expire_at: "",
};

export default function Pricing({ defaultValues, onNext, onBack }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      prices: defaultValues?.prices ?? [emptyPrice],
    },
  });
  useEffect(() => {
    if (defaultValues?.prices?.length) {
      reset({ prices: defaultValues.prices });
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
      discount_expire_at: p.discount_expire_at
        ? `${p.discount_expire_at} 23:59:59`
        : "",
      discount_amount:
        p.discount_type === "no discount" ? 0 : p.discount_amount,
    }));
    onNext({ prices: formatted });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-10 px-10">
      {fields.map((field, index) => (
        <PriceRow
          key={field.id}
          control={control}
          index={index}
          remove={remove}
          countryLists={countryLists}
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
