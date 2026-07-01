"use client";

import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

const discountTypes = ["no discount", "percentage", "fixed"];

export default function PriceRow({
  control,
  index,
  remove,
  countryLists,
  resetField,
}) {
  const discountType = useWatch({
    control,
    name: `prices.${index}.discount_type`,
  });

  //  TODO: Reset discount amount and date if useWatch changes
  // useEffect(() => {
  //   if (discountType) {
  //     resetField("name");
  //   }
  // }, [discountType, resetField]);

  const showDiscount =
    discountType === "percentage" || discountType === "fixed";

  return (
    <div className="border rounded-xl p-5 bg-white space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Pricing #{index + 1}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => remove(index)}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
        >
          <Trash2 size={15} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Controller
          name={`prices.${index}.country_id`}
          control={control}
          rules={{
            validate: (val) => !!val || "Country is required",
          }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Country</FieldLabel>
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full bg-white h-11">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    {countryLists.map((country) => (
                      <SelectItem key={country.id} value={String(country.id)}>
                        {country.country_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={`prices.${index}.price`}
          control={control}
          rules={{
            required: "Price is required",
            min: { value: 1, message: "Price must be greater than 0" },
          }}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Price *</FieldLabel>
              <Input
                value={field.value}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                type="number"
                className="bg-white h-11"
                placeholder="0.00"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <Controller
        name={`prices.${index}.discount_type`}
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Discount Type</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full bg-white h-11">
                <SelectValue placeholder="Select discount type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Discount Type</SelectLabel>
                  {discountTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      {showDiscount && (
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name={`prices.${index}.discount_amount`}
            control={control}
            rules={{
              required: "Discount amount is required",
              min: { value: 1, message: "Must be greater than 0" },
            }}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  Discount Amount{" "}
                  {discountType === "percentage" ? "(%)" : "(fixed)"}
                </FieldLabel>
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  placeholder={
                    discountType === "percentage" ? "e.g. 10" : "e.g. 200"
                  }
                  className="bg-white h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name={`prices.${index}.discount_expire_at`}
            control={control}
            rules={{ required: "Expiry date is required" }}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Discount Expires At</FieldLabel>
                <Input
                  {...field}
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  className="bg-white h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      )}
    </div>
  );
}
