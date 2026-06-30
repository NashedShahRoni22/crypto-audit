"ues client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import usePostMutation from "@/hooks/usePostMutation";
import usePutMutation from "@/hooks/usePutMutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Overview({ allData, onBack, isEditMode, productId }) {
  const router = useRouter();
  const payload = {
    name: allData.name,
    short_description: allData.short_description,
    // sort_description: allData.short_description,
    description: allData?.description,
    status: allData.status,
    item_sections: allData.item_sections,
    prices: allData.prices.map((p) => ({
      country_id: Number(p.country_id),
      price: p.price,
      discount_type: p.discount_type,
      discount_amount: p.discount_amount,
      discount_expire_at: p.discount_expire_at,
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
          console.log("error form on error ", error);
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

  return (
    <div className="flex justify-end gap-3">
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
        onClick={handleProduct}
        type="submit"
        className="bg-brand/90 hover:bg-brand px-4"
      >
        Submit <ArrowRight />
      </Button>
    </div>
  );
}
