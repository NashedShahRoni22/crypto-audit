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
      {isLoading ? (
        <ProductsTableSkeleton rows={5} />
      ) : (
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
                    <Badge className="bg-green-600">{pkg.status}</Badge>
                  </TableCell>
                ) : (
                  <TableCell>
                    <Badge className="bg-red-400">{pkg.status}</Badge>
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
      )}
    </div>
  );
}
