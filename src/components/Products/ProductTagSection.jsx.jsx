"use client";
import { useFieldArray, Controller } from "react-hook-form";
import { Trash2, X, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";

export default function ProductTagSection({
  control,
  sectionIndex,
  removeSection,
}) {
  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: `item_sections.${sectionIndex}.items`,
  });

  return (
    <div className="border rounded-xl p-5 bg-white space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Section #{sectionIndex + 1}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={removeSection}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 size={15} />
        </Button>
      </div>

      <Controller
        control={control}
        name={`item_sections.${sectionIndex}.title`}
        rules={{ required: "Title is required" }}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Title *</FieldLabel>
            <Input
              {...field}
              placeholder="e.g. SMART CONTRACT & SECURITY"
              className="h-11 font-medium"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="space-y-3 pl-2">
        {itemFields.map((item, itemIndex) => (
          <div key={item.id} className="flex items-end gap-2">
            <Controller
              control={control}
              name={`item_sections.${sectionIndex}.items.${itemIndex}.value`}
              rules={{ required: "Feature is required" }}
              render={({ field, fieldState }) => (
                <Field className="flex-1">
                  {itemIndex === 0 && <FieldLabel>Features *</FieldLabel>}
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      placeholder="Add a feature"
                      className="h-10 text-sm"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(itemIndex)}
              className="h-10 w-8 mb-0.5 text-muted-foreground hover:text-destructive shrink-0"
            >
              <X size={14} />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={() => appendItem({ value: "" })}
        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 pl-4 transition-colors bg-transparent hover:bg-transparent shadow-none border-none cursor-pointer"
      >
        <Plus size={12} /> Add feature
      </Button>
    </div>
  );
}
