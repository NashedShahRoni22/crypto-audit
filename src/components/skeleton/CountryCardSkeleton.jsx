import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function CountryCardSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-4 gap-4 py-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card size="sm" className="mx-auto w-full" key={i}>
          <div className="flex justify-between">
            <div className="flex items-center gap-3 px-6">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="pr-6 flex items-center">
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
          <div className="px-6">
            <Separator />
          </div>
          <div className="px-6 pt-2 pb-4 flex items-center justify-between">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-4 w-4" />
          </div>
        </Card>
      ))}
    </div>
  );
}
