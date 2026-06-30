"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductTag({ defaultValues, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const [sections, setSections] = useState(
    defaultValues?.item_sections ?? [
      { id: Date.now(), title: "", items: [""] },
    ],
  );

  useEffect(() => {
    if (defaultValues?.items?.length > 0) {
      setSections(
        defaultValues.items.map((section, idx) => ({
          id: Date.now() + idx,
          title: section.title ?? "",
          items: section.items?.length ? section.items : [""],
        })),
      );
    }
  }, [defaultValues]);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { id: Date.now(), title: "", items: [""] },
    ]);
  };

  const removeSection = (id) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const updateTitle = (id, value) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title: value } : s)),
    );
  };

  const addItem = (sectionId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, ""] } : s,
      ),
    );
  };

  const removeItem = (sectionId, itemIndex) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((_, i) => i !== itemIndex) }
          : s,
      ),
    );
  };

  const updateItem = (sectionId, itemIndex, value) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((item, i) => (i === itemIndex ? value : item)),
            }
          : s,
      ),
    );
  };

  const handleNext = () => {
    const newErrors = {};

    if (sections.length === 0) {
      newErrors.global = "At least one section must be added.";
    }

    sections.forEach((section, sIdx) => {
      if (!section.title.trim()) {
        newErrors[`title_${section.id}`] = "Section title is required.";
      }
      const hasItem = section.items.some((i) => i.trim());
      if (!hasItem) {
        newErrors[`items_${section.id}`] = "At least one feature is required.";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const cleaned = sections
      .map((s) => ({
        title: s.title.trim(),
        items: s.items.map((i) => i.trim()).filter(Boolean),
      }))
      .filter((s) => s.title || s.items.length > 0);

    onNext({ item_sections: cleaned });
  };

  return (
    <div className="grid grid-cols-2 gap-6 pt-10 px-10">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Services
        </h3>

        {sections.map((section, i) => (
          <div key={i} className="border rounded-lg p-4 bg-white space-y-3">
            <div className="flex items-center gap-2">
              <Input
                value={section.title}
                onChange={(e) => updateTitle(section.id, e.target.value)}
                placeholder="Add a title"
                className="h-11 font-medium"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSection(section.id)}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="space-y-2 pl-2">
              {section.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">•</span>
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateItem(section.id, idx, e.target.value)
                    }
                    placeholder="Add a feature"
                    className="h-11 text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(section.id, idx)}
                    className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>

            {errors[`items_${section.id}`] && (
              <p className="text-xs text-destructive pl-4">
                {errors[`items_${section.id}`]}
              </p>
            )}

            <button
              type="button"
              onClick={() => addItem(section.id)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 pl-4 transition-colors"
            >
              <Plus size={12} /> Add feature
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="w-full border border-dashed rounded-lg py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Add Service
        </button>
      </div>

      <div className="border rounded-lg p-5 bg-gray-50 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Demo
        </h3>

        {sections.some((s) => s.title || s.items.some((i) => i)) ? (
          sections.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <p className="font-semibold text-sm mb-1">{section.title}</p>
              )}
              <ul className="space-y-0.5">
                {section.items
                  .filter((i) => i.trim())
                  .map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex gap-2"
                    >
                      <span>•</span> {item}
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

      <div className="col-span-2 flex justify-end gap-3 pt-2">
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
          onClick={handleNext}
          className="bg-brand/90 hover:bg-brand px-4"
        >
          Next <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
