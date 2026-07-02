"use client";
import { useParams } from "next/navigation";
import AddProduct from "./AddProduct";
import useGetQuery from "@/hooks/useGetMutation";
import Loader from "../shared/Loader/Loader";

export default function UpdateProduct() {
  const { id } = useParams();
  const { data, isLoading } = useGetQuery({
    endpoint: `/package/show/${id}`,
    isTokenRequired: true,
    enabled: true,
    queryKey: ["packages", id],
  });
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="py-10">
        <h1 className="font-semibold font-inter text-3xl">
          Update Product & Prices
        </h1>
        <p className="font-inter text-sm mt-2">
          Update products, categories and prices
        </p>
      </div>
      <AddProduct productDetails={data?.data} isLoading={isLoading} />
    </>
  );
}
