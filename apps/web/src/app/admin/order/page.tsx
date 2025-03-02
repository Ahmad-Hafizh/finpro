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

const SkeletonTable = () => {
  return (
    <div className="rounded-md border p-5">
      <div className="animate-pulse">
        <div className="mb-4 flex space-x-4">
          {[
            "Order Number",
            "Order Date",
            "Status",
            "Total Payment",
            "Actions",
          ].map((header, idx) => (
            <div key={idx} className="h-6 w-32 rounded bg-gray-300" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="mb-2 flex space-x-4">
            {Array.from({ length: 5 }).map((_, colIdx) => (
              <div key={colIdx} className="h-4 w-full rounded bg-gray-300" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminOrderPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [filterOrderNumber, setFilterOrderNumber] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const pageParam = params.get("page") || "1";
    setCurrentPage(Number(pageParam));
  }, [searchParams]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let endpoint = `/admin-order?page=${currentPage}`;
      if (filterOrderNumber) {
        endpoint += `&orderNumber=${filterOrderNumber}`;
      }
      if (filterDate) {
        endpoint += `&orderDate=${filterDate}`;
      }
      const response = await callAPI.get(endpoint);
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

  const resetFilters = () => {
    setFilterOrderNumber("");
    setFilterDate("");
    setCurrentPage(1);
    fetchOrders();
  };

  return (
    <div className="container mx-auto mt-24 p-5">
      <HeaderDashboard pagename="Order Management" />
      <form
        className="mb-4 flex items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentPage(1);
          fetchOrders();
        }}
      >
        <input
          type="text"
          placeholder="Search Order Number"
          className="rounded border px-3 py-2"
          value={filterOrderNumber}
          onChange={(e) => setFilterOrderNumber(e.target.value)}
        />
        <input
          type="date"
          placeholder="Filter by Date"
          className="rounded border px-3 py-2"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button
          type="submit"
          className="rounded bg-[#57CC99] px-4 py-2 text-white"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={resetFilters}
          className="rounded bg-[#38A3A5] px-4 py-2 text-white"
        >
          Reset Filters
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <SkeletonTable />
      ) : orders.length === 0 ? (
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
