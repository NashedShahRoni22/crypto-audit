import { cn } from "@/lib/utils";

export default function Container({ children, className }) {
  return (
    <div className={cn("container px-5 mx-auto", className)}>{children}</div>
  );
}
