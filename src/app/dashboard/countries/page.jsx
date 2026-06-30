import Country from "@/components/Country/Country";

export default function Countries() {
  return (
    <>
      <div className="py-10">
        <h1 className="font-semibold font-inter text-3xl">
          Product & Category Management
        </h1>
        <p className="font-inter text-sm mt-2">
          Manage products, categories, countries, delivery charges, and
          inventory
        </p>
      </div>
      <Country />
    </>
  );
}
