"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderDashboard from "../components/header";
import { callAPI } from "@/config/axios";
import { DataTable } from "./components/data-table";
import { createColumns } from "./components/columns";
import { useToast } from "@/hooks/use-toast";
import PaginationTable from "../components/Pagination";

export interface Order {
  order_id: number;
  order_number?: string;
  status: string;
  total_payment?: number;
  order_date: string;
  tracking_number?: string;
}

const AdminOrderPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const pageParam = params.get("page") || "1";
    setCurrentPage(Number(pageParam));
  }, [searchParams]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await callAPI.get(`/admin-order?page=${currentPage}`);
      if (Array.isArray(response.data)) {
        setOrders(response.data);
        setTotalPage(1);
      } else {
        setOrders(response.data.orders || []);
        setTotalPage(response.data.totalPages || 1);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
      toast({
        title: "Error",
        description: err.response?.data?.error || err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchParams, currentPage]);

  const handleConfirmPayment = async (orderId: number, decision: string) => {
    try {
      await callAPI.post(
        `/admin-order/${orderId}/confirm-payment`,
        { decision },
        { headers: { "Content-Type": "application/json" } },
      );
      toast({
        title: "Success",
        description: `Payment ${decision === "approve" ? "approved" : "rejected"} successfully.`,
      });
      fetchOrders();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.error || err.message,
        variant: "destructive",
      });
    }
  };

  const handleSendOrder = async (orderId: number) => {
    const tracking_number = prompt("Enter tracking number (optional):") || "";
    try {
      await callAPI.post(
        `/admin-order/${orderId}/send`,
        { tracking_number },
        { headers: { "Content-Type": "application/json" } },
      );
      toast({
        title: "Success",
        description: "Order status updated to 'dikirim'",
      });
      fetchOrders();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.error || err.message,
        variant: "destructive",
      });
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    const reason = prompt("Enter reason for order cancellation:");
    if (!reason) return;
    try {
      await callAPI.post(
        `/admin-order/${orderId}/cancel`,
        { reason },
        { headers: { "Content-Type": "application/json" } },
      );
      toast({ title: "Success", description: "Order cancelled successfully." });
      fetchOrders();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.error || err.message,
        variant: "destructive",
      });
    }
  };

  const columns = createColumns({
    onConfirmPayment: handleConfirmPayment,
    onSendOrder: handleSendOrder,
    onCancelOrder: handleCancelOrder,
  });

  return (
    <div className="container mx-auto mt-24 p-5">
      <HeaderDashboard pagename="Order Management" />
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Suspense fallback={<div>Loading table...</div>}>
          <DataTable columns={columns} data={orders} />
        </Suspense>
      )}
      <div className="mt-4">
        <PaginationTable currentPage={currentPage} totalPage={totalPage} />
      </div>
    </div>
  );
};

export default AdminOrderPage;
