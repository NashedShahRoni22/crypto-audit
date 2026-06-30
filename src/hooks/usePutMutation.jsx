import { useMutation } from "@tanstack/react-query";

export default function usePutMutation({
  endpoint = "",
  isTokenRequired = false,
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return useMutation({
    mutationFn: async (payload) => {
      const token = isTokenRequired ? localStorage.getItem("token") : null;
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
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
