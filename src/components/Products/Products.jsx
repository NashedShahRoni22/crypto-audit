"use client";
import { useState } from "react";
import { PencilIcon, Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ProductsTableSkeleton } from "../skeleton/ProductsTableSkeleton";
import useGetQuery from "@/hooks/useGetMutation";
import EmptyState from "../EmptyState/EmptyState";

export default function Products() {
  const [inputText, setInputText] = useState("");
  const { data, isLoading } = useGetQuery({
    endpoint: "/package/list",
    enabled: true,
    isTokenRequired: true,
    queryKey: ["packages"],
  });

  const packages = data?.data ?? [];

  const filteredPackages = packages?.filter((pkg) =>
    pkg.name?.toLowerCase().includes(inputText?.toLowerCase()),
  );

  let content = "";
  if (isLoading) {
    content = <ProductsTableSkeleton rows={5} />;
  }
  if (packages.length === 0) {
    content = (
      <EmptyState
        text="No product added yet Add product for you customer."
        btnTxt="Add Product"
        href="/dashboard/products/add"
      />
    );
  }
  if (filteredPackages.length > 0) {
    content = (
      <Table className="shadow bg-white px-4 ">
        <TableHeader>
          <TableRow className="h-12">
            <TableHead>Product Name</TableHead>
            <TableHead>Short Description</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPackages.map((pkg) => (
            <TableRow key={pkg.id}>
              <TableCell className="font-medium">{pkg.name}</TableCell>
              <TableCell>{pkg.short_description?.slice(0, 75)}</TableCell>
              <TableCell>{pkg.updated_at}</TableCell>
              {pkg.status === "active" ? (
                <TableCell>
                  <Badge className="bg-green-50 text-green-700">
                    {pkg.status}
                  </Badge>
                </TableCell>
              ) : (
                <TableCell>
                  <Badge className="bg-yellow-50 text-yellow-700">
                    {pkg.status}
                  </Badge>
                </TableCell>
              )}

              <TableCell className="text-center">
                <Link href={`/dashboard/products/update/${pkg?.id}`}>
                  <PencilIcon size={16} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  if (packages.length > 0 && filteredPackages.length === 0) {
    content = (
      <EmptyState
        text={`No product found for ${inputText}. Try another one.`}
        btnTxt="Add Product"
      />
    );
  }

  return (
    <div className="space-y-6">
      <form>
        <div className="p-2  rounded flex items-center gap-2 bg-white">
          <Input
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Search Product"
            className="bg-white h-11"
          />

          <Button
            asChild
            className="bg-brand/90 hover:bg-brand cursor-pointer h-11"
          >
            <Link href="/dashboard/products/add">
              <Plus /> Add Product
            </Link>
          </Button>
        </div>
      </form>
      {content}
    </div>
  );
}
