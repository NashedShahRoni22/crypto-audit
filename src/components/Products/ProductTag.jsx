"use client";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import ProductTagSection from "./ProductTagSection.jsx";
import { useEffect } from "react";

const emptySection = {
  title: "",
  items: [{ value: "" }],
};

export default function ProductTag({ defaultValues, onNext, onBack }) {
  const { handleSubmit, control, reset } = useForm({
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

  useEffect(() => {
    const sections = defaultValues?.item_sections ?? defaultValues?.items;

    if (sections?.length) {
      reset({
        item_sections: sections.map((s) => ({
          title: s.title ?? s.name ?? "",
          items: s.items?.length
            ? s.items.map((i) => ({ value: i }))
            : [{ value: "" }],
        })),
      });
    }
  }, [defaultValues, reset]);

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "item_sections",
  });

  const sections = useWatch({
    control,
    name: "item_sections",
  });

  const hasContent = sections?.some(
    (s) => s.title || s.items?.some((i) => i.value),
  );

  const onSubmit = (data) => {
    const cleaned = data.item_sections.map((s) => ({
      title: s.title.trim(),
      items: s.items.map((i) => i.value.trim()).filter(Boolean),
    }));
    onNext({ item_sections: cleaned });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4 px-4 lg:px-10">
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
        </div>

        <div className="border rounded-xl p-5 bg-slate-50 space-y-4 sticky top-4 h-fit">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Live preview
          </p>

          {hasContent ? (
            sections.map((section, idx) => (
              <div key={idx}>
                {section.title && (
                  <p className="text-sm font-semibold mb-2">{section.title}</p>
                )}
                <ul className="space-y-1">
                  {section.items
                    ?.filter((i) => i.value?.trim())
                    .map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex gap-2"
                      >
                        <span>•</span> {item.value}
                      </li>
                    ))}
                </ul>
                {idx < sections.length - 1 && (
                  <hr className="mt-3 border-border" />
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Add a section to see preview
            </p>
          )}
        </div>
      </div>

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
