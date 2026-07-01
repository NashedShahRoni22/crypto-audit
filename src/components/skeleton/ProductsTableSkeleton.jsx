import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

export function ProductsTableSkeleton({ rows = 5 }) {
  return (
    <Table className="shadow bg-white px-4">
      <TableBody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-64" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-16 rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-4 w-4 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
