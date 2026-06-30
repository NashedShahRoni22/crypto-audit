"use client";
import { useParams } from "next/navigation";
import AddProduct from "./AddProduct";
import useGetQuery from "@/hooks/useGetMutation";

export default function UpdateProduct() {
  const { id } = useParams();
  const { data, isLoading } = useGetQuery({
    endpoint: `/package/show/${id}`,
    isTokenRequired: true,
    enabled: true,
    queryKey: ["packages", id],
  });
  if (isLoading) {
    return <p>Loading from UpdateProduct...</p>;
  }
  return (
    <div>
      <AddProduct productDetails={data?.data} isLoading={isLoading} />
    </div>
  );
}
