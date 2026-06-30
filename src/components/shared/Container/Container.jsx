import { cn } from "@/lib/utils";
import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={cn("container px-5 mx-auto", className)}>{children}</div>
  );
}
