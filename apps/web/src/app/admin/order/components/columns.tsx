"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export type OrderList = {
  order_id: number;
  order_number?: string;
  status: string;
  total_payment?: number;
  order_date: string;
  tracking_number?: string;
};

export type OrderColumnsProps = {
  onConfirmPayment: (orderId: number, decision: string) => void;
  onSendOrder: (orderId: number) => void;
  onCancelOrder: (orderId: number) => void;
};

export const createColumns = ({
  onConfirmPayment,
  onSendOrder,
  onCancelOrder,
}: OrderColumnsProps): ColumnDef<OrderList>[] => {
  return [
    {
      accessorKey: "order_number",
      header: "Order Number",
      cell: ({ row }) => row.original.order_number || "-",
    },
    {
      accessorKey: "order_date",
      header: "Order Date",
      cell: ({ row }) => {
        const date = new Date(row.original.order_date);
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => row.original.status,
    },
    {
      accessorKey: "total_payment",
      header: "Total Payment",
      cell: ({ row }) =>
        row.original.total_payment ? row.original.total_payment : "-",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex gap-2">
            {order.status === "menunggu_konfirmasi" && (
              <>
                <Button
                  variant="default"
                  onClick={() => onConfirmPayment(order.order_id, "approve")}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onConfirmPayment(order.order_id, "reject")}
                >
                  Reject
                </Button>
              </>
            )}
            {order.status === "diproses" && (
              <Button
                variant="outline"
                onClick={() => onSendOrder(order.order_id)}
              >
                Send
              </Button>
            )}
            {order.status !== "dikirim" &&
              order.status !== "pesanan_dikonfirmasi" &&
              order.status !== "dibatalkan" && (
                <Button
                  variant="ghost"
                  onClick={() => onCancelOrder(order.order_id)}
                >
                  Cancel
                </Button>
              )}
          </div>
        );
      },
    },
  ];
};
