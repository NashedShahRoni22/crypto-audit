"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetQuery from "@/hooks/useGetMutation";
import OrderTable from "./OrderTable";
import Loader from "../shared/Loader/Loader";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Orders() {
  const { data, isLoading } = useGetQuery({
    endpoint: "/order/list",
    enabled: true,
    isTokenRequired: true,
    queryKey: ["orders"],
  });
  const orders = data?.data ?? [];
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg mt-10">
      <h2 className="text-xl font-semibold">Manage All Orders</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Total: {orders?.length} Orders
      </p>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="">Package</TableHead>
            <TableHead>Name & Email</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Base Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Paid Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Payment Document</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <OrderTable key={order?.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
