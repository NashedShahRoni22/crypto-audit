"use client";
import {
  Timeline,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline";
import { Button } from "@/components/ui/button";
import useGetQuery from "@/hooks/useGetMutation";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  BoxIcon,
  Building2Icon,
  CheckIcon,
  GlobeIcon,
  LogOutIcon,
  ShoppingCart,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const menuItems = [
  {
    id: 1,
    href: "/dashboard/products",
    icon: BoxIcon,
    label: "Products",
  },
  {
    id: 2,
    href: "/dashboard/countries",
    icon: GlobeIcon,
    label: "Countries",
  },
  {
    id: 3,
    href: "/dashboard/bank",
    icon: Building2Icon,
    label: "Bank Information",
  },

  {
    id: 4,
    href: "/dashboard/orders",
    icon: ShoppingCart,
    label: "Manage Orders",
  },
  {
    id: 6,
    href: "/dashboard/users",
    icon: Users,
    label: "Manage Users",
  },
];

export default function Sidebar() {
  const token = localStorage.getItem("token");
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
    <div className="flex flex-col items-center py-10 px-5 bg-white text-[#1f1f1f] min-h-screen sticky top-0 font-inter">
      <div className=" pb-10 flex items-center gap-3">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <h1 className="font-inter font-bold text-2xl">Crypto Audit</h1>
      </div>
      <div className="flex flex-col py-30 px-5 text-[#1f1f1f] min-h-screen fixed top-10 font-inter">
        <div className="w-full max-w-xs">
          <Timeline defaultValue={menuItems.length}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <TimelineItem
                  key={item.id}
                  step={item.id}
                  className="group-data-[orientation=vertical]/timeline:ms-10 min-h-24"
                >
                  <TimelineHeader>
                    <TimelineSeparator className="bg-input! group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />

                    <TimelineIndicator
                      className={cn(
                        "flex size-6 items-center justify-center border-2 group-data-[orientation=vertical]/timeline:-left-7",
                        isActive
                          ? "bg-primary border-primary text-white"
                          : "bg-background border-input text-transparent",
                      )}
                    >
                      {isActive && <CheckIcon className="size-3.5" />}
                    </TimelineIndicator>

                    <TimelineTitle
                      className={cn(
                        "text-sm flex items-center gap-2",
                        isActive
                          ? "font-semibold text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      <Icon size={16} />
                      <Link href={item.href}>{item.label}</Link>
                    </TimelineTitle>
                  </TimelineHeader>
                </TimelineItem>
              );
            })}
          </Timeline>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => mutate()}
        disabled={isPending}
        className="bg-red-500 hover:bg-red-600 mt-auto w-full cursor-pointer text-white hover:text-white z-10"
      >
        Logout <LogOutIcon className="pointer-events-none" />
      </Button>
    </div>
  );
}
