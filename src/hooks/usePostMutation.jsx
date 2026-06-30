"use client";
import { useMutation } from "@tanstack/react-query";

export default function usePostMutation({
  endpoint = "",
  isTokenRequired = false,
}) {
  const token = isTokenRequired ? localStorage.getItem("token") : null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw data;
      }

      return data;
    },
  });
}
