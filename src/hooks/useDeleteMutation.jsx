"use client";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteMutation({
  endpoint = "",
  isTokenRequired = false,
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = isTokenRequired ? localStorage.getItem("token") : null;

  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${BASE_URL}${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      return data;
    },
  });
}
