import Products from "@/components/Products/Products";

export default function Product() {
  return (
    <div className="">
      <div className="py-10">
        <h1 className="font-semibold font-inter text-xl lg:text-3xl">
          Product & Category Management
        </h1>
        <p className="font-inter text-xs lg:text-sm mt-2">
          Manage products, categories, countries, delivery charges, and
          inventory
        </p>
      </div>
      <Products />
    </div>
  );
}
