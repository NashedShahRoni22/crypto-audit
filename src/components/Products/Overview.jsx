"ues client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import usePostMutation from "@/hooks/usePostMutation";
import usePutMutation from "@/hooks/usePutMutation";
import { Separator } from "../ui/separator";
import { formatDisplayDate } from "@/lib/formatDisplayDate";
import { formatBackendDate } from "@/lib/formatBackendDate";
import Loader from "../shared/Loader/Loader";

export default function Overview({ allData, onBack, productId }) {
  const isEditMode = !!productId;
  const router = useRouter();

  const payload = {
    name: allData.name,
    short_description: allData.short_description,
    description: allData?.description,
    status: allData.status,
    item_sections: allData.item_sections,
    prices: allData.prices.map((p) => ({
      country_id: Number(p.country_id),
      price: p.price,
      discount_type: p.discount_type,
      discount_amount: p.discount_amount,
      discount_expire_at: formatBackendDate(p.discount_expire_at),
    })),
  };

  const { mutate, isPending } = usePostMutation({
    endpoint: "/package/store",
    isTokenRequired: true,
  });

  const { mutate: updateMutate, isPending: updatePending } = usePutMutation({
    endpoint: `/package/update/${productId}`,
    isTokenRequired: true,
  });

  const handleProduct = (e) => {
    e.preventDefault();
    if (!isEditMode) {
      mutate(payload, {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("package added successfully");
            router.push("/dashboard/products");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      updateMutate(payload, {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message);
            router.push("/dashboard/products");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  let btnText = null;
  if (isEditMode && !updatePending) {
    btnText = "Update Product";
  }
  if (isEditMode && updatePending) {
    btnText = (
      <>
        Product Updating <Loader />
      </>
    );
  }
  if (!isEditMode && !isPending) {
    btnText = "Publish Product";
  }
  if (!isEditMode && isPending) {
    btnText = (
      <>
        Product Publishing <Loader />
      </>
    );
  }

  const showDiscount = (type) =>
    type === "percentage" || type === "flat" || type === "fixed";

  return (
    <div className="py-20">
      <div className=" flex flex-col justify-end gap-3 px-4">
        <div className="border rounded-xl p-5 bg-white space-y-4 ">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            Basic info
          </p>

          <div className="grid  gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <p className="text-xs text-muted-foreground mb-1">Product name</p>
              <p className="text-sm font-medium">{allData.name || "—"}</p>
            </div>
            <Separator />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <p className="text-xs text-muted-foreground mb-1">
                Short description
              </p>
              <p className="text-sm">{allData.short_description || "—"}</p>
            </div>
            <Separator />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <p className="text-xs text-muted-foreground mb-1">Description</p>
              <div
                className="text-sm text-muted-foreground rounded-lg py-1 prose prose-sm "
                dangerouslySetInnerHTML={{ __html: allData.description || "—" }}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium
              ${
                allData.status === "active"
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow-50 text-yellow-700"
              }`}
              >
                {allData.status ?? "—"}
              </span>
            </div>
          </div>
        </div>

        {allData.item_sections?.length > 0 && (
          <div className="border rounded-xl p-5 bg-white space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Item sections
            </p>
            {allData.item_sections.map((section, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                <div className="bg-muted/40 px-4 py-2 border-b">
                  <p className="text-xs font-medium">{section.title}</p>
                </div>
                <ul className="px-4 py-3 space-y-1.5">
                  {section.items?.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex gap-2"
                    >
                      <span className="text-muted-foreground/50">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {allData.prices?.length > 0 && (
          <div className="border rounded-xl p-5 bg-white space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Pricing
            </p>
            {allData.prices.map((price, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                <div className="bg-muted/40 px-4 py-2.5 border-b flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Country ID: {price.country_id}
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    Total Price: {price.price?.toLocaleString()}
                  </p>
                </div>
                {showDiscount(price.discount_type) && (
                  <div className="px-4 py-3 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Discount type
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium capitalize">
                        {price.discount_type}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Discount amount
                      </p>
                      <p className="text-sm">
                        {price.discount_amount}
                        {price.discount_type === "percentage" ? "%" : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Expires at
                      </p>
                      <p className="text-sm">
                        {formatDisplayDate(price.discount_expire_at)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-2 mt-6">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-4 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </Button>
        )}
        <Button
          onClick={handleProduct}
          type="submit"
          className="bg-brand/90 hover:bg-brand px-4 cursor-pointer"
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}
