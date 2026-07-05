"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import ProductTagSection from "./ProductTagSection.jsx";

const emptySection = {
  title: "",
  items: [{ value: "" }],
};

export default function ProductTag({ defaultValues, onNext, onBack }) {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    defaultValues: {
      item_sections: defaultValues?.item_sections?.length
        ? defaultValues.item_sections.map((s) => ({
            title: s.title ?? "",
            items: s.items?.length
              ? s.items.map((i) => ({ value: i }))
              : [{ value: "" }],
          }))
        : [emptySection],
    },
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "item_sections",
  });

  const onSubmit = (data) => {
    const cleaned = data.item_sections.map((s) => ({
      title: s.title.trim(),
      items: s.items.map((i) => i.value.trim()).filter(Boolean),
    }));
    onNext({ item_sections: cleaned });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 pt-10 px-4 lg:px-10"
    >
      {sectionFields.map((section, sectionIndex) => (
        <ProductTagSection
          key={section.id}
          control={control}
          sectionIndex={sectionIndex}
          removeSection={() => removeSection(sectionIndex)}
        />
      ))}

      <Button
        variant="outline"
        type="button"
        onClick={() => appendSection(emptySection)}
        className="cursor-pointer hover:bg-transparent"
      >
        <Plus size={14} /> Add section
      </Button>

      <div className="flex justify-end gap-3 pt-2">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="submit" className="bg-brand/90 hover:bg-brand px-4">
          Next <ArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
}
