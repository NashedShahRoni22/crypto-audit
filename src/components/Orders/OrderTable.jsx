import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Building2Icon, CreditCardIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

export default function OrderTable({ order }) {
  const hasDiscount = !!order?.order_discount;
  console.log(order);
  return (
    <>
      <TableRow>
        <TableCell className="font-medium text-base">
          {order?.package?.name}
        </TableCell>

        <TableCell>
          <span className="font-medium text-gray-700">{order?.user.name}</span>
          <span className="text-xs block text-muted-foreground">
            {order?.user?.email}
          </span>
        </TableCell>

        <TableCell className="flex items-center gap-1 text-muted-foreground text-sm">
          {order?.payment_type === "manual" ? (
            <>
              <Building2Icon size={14} /> Bank{" "}
            </>
          ) : (
            <>
              <CreditCardIcon size={14} /> Stripe{" "}
            </>
          )}
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          <span
            dangerouslySetInnerHTML={{
              __html: order?.currency,
            }}
          />
          {order?.amount}
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          {order?.order_discount?.discount_type === "percentage"
            ? `${order?.order_discount?.discount_amount}%`
            : order?.order_discount === null
              ? "No Discount"
              : `${order?.order_discount?.discount_amount}`}
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          <span
            dangerouslySetInnerHTML={{
              __html: order?.currency,
            }}
          />
          {/* {hasDiscount ? } */}
          {hasDiscount
            ? order?.amount -
              order?.amount * (order?.order_discount?.discount_amount / 100)
            : order?.amount}
        </TableCell>
        <TableCell>
          <span
            className={`capitalize px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
              order.status === "pending"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            {order.status}
          </span>
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          {order?.manual_payment?.transaction_id}
        </TableCell>
        <TableCell className="text-muted-foreground font-medium">
          <Dialog>
            <DialogTrigger className="cursor-pointer">
              View Document
            </DialogTrigger>
            <DialogContent className="max-w-2xl! h-70 p-0 overflow-auto gap-0">
              <div className="w-full bg-gray-50 border-t border-gray-200 p-4">
                <Image
                  src={order?.manual_payment?.payment_document}
                  alt={order?.package?.name}
                  width={800}
                  height={500}
                  className="w-full object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    </>
  );
}
