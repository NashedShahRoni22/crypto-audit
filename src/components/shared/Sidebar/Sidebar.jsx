"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { LogOutIcon, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { NavLinks } from "./NavLinks";

export default function Sidebar() {
  const token = localStorage.getItem("token");
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.removeItem("token");
        toast.success(data.message);
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <div className="hidden lg:flex flex-col items-start py-10 px-5 bg-white text-[#1f1f1f] min-h-screen sticky top-0 font-inter gap-2 border-r">
        <div className="pb-8 flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <h1 className="font-bold text-xl">Crypto Audit</h1>
        </div>
        <NavLinks pathname={pathname} />
        <Button
          variant="outline"
          onClick={() => mutate()}
          disabled={isPending}
          className="bg-red-500 hover:bg-red-600 mt-auto w-full cursor-pointer text-white hover:text-white"
        >
          Logout <LogOutIcon className="pointer-events-none" size={16} />
        </Button>
      </div>

      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-white sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <h1 className="font-bold text-lg">Crypto Audit</h1>
        </div>
        <Button
          onClick={() => setShowMenu((prev) => !prev)}
          variant="outline"
          size="icon"
          className="border-none shadow-none"
        >
          {showMenu ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {showMenu && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 flex flex-col gap-2 p-5 pt-6 transition-transform duration-300 lg:hidden ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <h1 className="font-bold text-lg">Crypto Audit</h1>
          </div>
          <Button
            onClick={() => setShowMenu(false)}
            variant="outline"
            size="icon"
            className="border-none shadow-none"
          >
            <X size={20} />
          </Button>
        </div>
        <NavLinks />
        <Button
          variant="outline"
          onClick={() => mutate()}
          disabled={isPending}
          className="bg-red-500 hover:bg-red-600 mt-auto w-full cursor-pointer text-white hover:text-white"
        >
          Logout <LogOutIcon className="pointer-events-none" size={16} />
        </Button>
      </div>
    </>
  );
}
