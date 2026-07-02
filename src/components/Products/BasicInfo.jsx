"use client";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; //
import { Textarea } from "../ui/textarea";

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

  const isEmptyHtml = (html = "") => {
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.length === 0;
  };

  console.log(defaultValues?.description);

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-4 pt-10 bg-white px-4 lg:px-10 py-6 rounded "
    >
      <div className="flex items-center gap-6">
        <div className="w-2/3">
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </div>
        <div className="w-1/3">
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
        </div>
      </div>
      <Controller
        name="short_description"
        control={control}
        rules={{ required: "Short description is required" }}
        render={({ field, fieldState }) => {
          return (
            <Field>
              <FieldLabel>Short Description</FieldLabel>
              <Textarea
                {...field}
                placeholder="Short Description"
                rows={5}
                cols={40}
                type="text h-12"
                className="bg-white h-12"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />

      <Controller
        name="description"
        control={control}
        rules={{
          validate: (val) => !isEmptyHtml(val) || "Description is required",
        }}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Description</FieldLabel>
            <SunEditor
              setContents={field.value}
              onChange={field.onChange}
              height="250px"
              setOptions={{
                buttonList: [
                  [
                    "undo",
                    "redo",
                    "formatBlock",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                  ],
                  ["fontSize", "fontColor", "hiliteColor", "removeFormat"],
                  ["align", "list", "outdent", "indent", "lineHeight"],
                  [
                    "blockquote",
                    "horizontalRule",
                    "table",
                    "link",
                    "image",
                    "video",
                  ],
                  ["fullScreen", "showBlocks", "preview"],
                ],

                formats: [
                  "p",
                  "div",
                  "h1",
                  "h2",
                  "h3",
                  "h4",
                  "h5",
                  "h6",
                  "blockquote",
                ],
                fontSize: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36],
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
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
