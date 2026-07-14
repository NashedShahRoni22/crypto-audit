"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import useGetQuery from "@/hooks/useGetMutation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDisplayDate } from "@/lib/formatDisplayDate";
import Pagination from "../shared/Pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function Users() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (debouncedValue) {
      params.set("query", debouncedValue);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedValue]);

  const { data, isLoading } = useGetQuery({
    endpoint: `/users?email=${debouncedValue}&page=${page}&per_page=${2}`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["users", debouncedValue, page],
  });

  const users = data?.data?.data ?? [];

  return (
    <div className="py-20">
      <div className="p-6 bg-white rounded-lg">
        <form className="flex justify-end mb-6">
          <Input
            placeholder="Search user"
            className="h-12 bg-white w-1/3"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user?.id}>
                <TableCell className="font-medium">{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{formatDisplayDate(user?.created_at)}</TableCell>
                <TableCell>{user?.phone ?? "No Phone Provided"}</TableCell>
                <TableCell>{user?.address ?? "No Address Provided"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination totalPages={data?.data?.last_page} />
    </div>
  );
}
