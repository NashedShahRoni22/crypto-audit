"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import Tiptap from "../Tiptap/Tiptap";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function BasicInfo({ defaultValues, onNext, onBack }) {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: defaultValues?.name ?? "",
      short_description: defaultValues?.short_description ?? "",
      description: defaultValues?.description ?? "",
      status: defaultValues?.status ?? "inactive",
    },
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset({
        name: defaultValues.name ?? "",
        short_description: defaultValues.short_description ?? "",
        status: defaultValues.status ?? "inactive",
        description: defaultValues?.description ?? "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-4 pt-10 bg-white px-10 rounded "
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Product Name is required" }}
        render={({ field, fieldState }) => {
          return (
            <Field>
              <FieldLabel>Product Name *</FieldLabel>
              <Input
                {...field}
                placeholder="Product Name"
                type="text"
                className="bg-white h-12"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
      <Controller
        name="short_description"
        control={control}
        rules={{ required: "Short description is required" }}
        render={({ field, fieldState }) => {
          return (
            <Field>
              <FieldLabel>Short Description</FieldLabel>
              <Input
                {...field}
                placeholder="Short Description"
                type="text h-12"
                className="bg-white h-12"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Status</FieldLabel>
            <div className="flex items-center justify-between px-3 space-x-3 border rounded-md bg-white h-12">
              <Label htmlFor="status" className="text-muted-foreground">
                Active Status
              </Label>
              <Switch
                id="status"
                checked={field.value === "active"}
                onCheckedChange={(checked) =>
                  field.onChange(checked ? "active" : "inactive")
                }
              />
            </div>
          </Field>
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: "description is required" }}
        render={({ field, fieldState }) => {
          return (
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Tiptap content={field.value} onChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />

      <div className="flex justify-end gap-3">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="submit" className="bg-brand/90 hover:bg-brand px-4">
          Next <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
