"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { callAPI } from "@/config/axios";

interface Order {
  order_id: number;
  total_price: number;
  status: string;
  order_date: string;
}

const PaymentProofListPage: React.FC = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await callAPI.get("/order");
      const data = response.data;
      const pendingOrders = data.filter(
        (order: Order) => order.status === "menunggu_pembayaran",
      );
      setOrders(pendingOrders);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#57CC99]">
          Order Menunggu Pembayaran
        </h1>
        {loading && (
          <p className="text-center text-gray-600">Memuat order...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {orders.length === 0 && !loading ? (
          <p className="text-center text-gray-600">
            Tidak ada order yang membutuhkan pembayaran.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.order_id}
              className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md"
            >
              <p className="mb-2 text-lg">
                <span className="font-semibold">Order ID:</span>{" "}
                {order.order_id}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Total Harga:</span> Rp{" "}
                {order.total_price.toLocaleString()}
              </p>
              <p className="mb-4 text-lg">
                <span className="font-semibold">Tanggal:</span>{" "}
                {new Date(order.order_date).toLocaleString()}
              </p>
              <button
                onClick={() => router.push(`/payment-proof/${order.order_id}`)}
                className="w-full rounded-md bg-[#57CC99] py-2 text-lg font-semibold text-white transition-colors duration-200 hover:bg-[#80ED99]"
              >
                Upload Bukti Pembayaran
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentProofListPage;
