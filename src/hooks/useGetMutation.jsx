"use client";
import { useQuery } from "@tanstack/react-query";

export default function useGetQuery({
  endpoint = "",
  enabled = false,
  isTokenRequired = false,
  queryKey = [],
  ...options
}) {
  const token = isTokenRequired ? localStorage.getItem("token") : null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return useQuery({
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message);
      }

      return res.json();
    },
    enabled: enabled && !!endpoint,
    queryKey: [...queryKey],
    ...options,
  });
}
