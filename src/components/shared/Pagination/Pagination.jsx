"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-1.5 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-1.5 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      {/*  */}
    </>
  );
}
