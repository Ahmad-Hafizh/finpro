"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/global/Nav";
import { callAPI } from "@/config/axios";

interface OrderDetail {
  order_id: number;
  total_price: number;
  order_items: {
    order_item_id: number;
    quantity: number;
    price: number;
    subtotal: number;
    product: {
      product_id: number;
      product_name: string;
      product_price: number;
      product_img?: { url: string }[];
    };
  }[];
}

const PaymentProofUploadPage: React.FC = () => {
  const router = useRouter();
  const params = useParams() as { order_id: string };
  const orderId = params.order_id;

  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await callAPI.get(`/order/${orderId}`);
        setOrderDetail(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || err.message);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Pilih file bukti pembayaran");
      return;
    }
    setError(null);
    setLoading(true);

    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (!fileExt || !allowedExtensions.includes(fileExt)) {
      setError(
        "Tipe file tidak valid. Hanya .jpg, .jpeg, .png yang diperbolehkan.",
      );
      setLoading(false);
      return;
    }
    if (file.size > 1024 * 1024) {
      setError("Ukuran file melebihi 1MB.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("proof", file);

    try {
      await callAPI.post(`/order/${orderId}/payment-proof`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Bukti pembayaran berhasil diupload.");
      router.push("/payment-proof");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-center text-3xl font-bold text-[#57CC99]">
            Upload Bukti Pembayaran
          </h1>
          {orderDetail && orderDetail.order_items && (
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                Ringkasan Pesanan
              </h2>
              <ul className="space-y-2">
                {orderDetail.order_items.map((item) => (
                  <li key={item.order_item_id} className="flex items-center">
                    {item.product?.product_img?.length ? (
                      <img
                        src={item.product.product_img[0].url}
                        alt={item.product.product_name}
                        className="mr-3 h-16 w-16 rounded object-cover"
                      />
                    ) : (
                      <div className="mr-3 h-16 w-16 rounded bg-gray-100" />
                    )}
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {item.product?.product_name || "Produk tidak tersedia"}
                      </p>
                      <p className="text-gray-600">Jumlah: {item.quantity}</p>
                      <p className="text-gray-600">
                        Harga Total: Rp{" "}
                        {orderDetail.total_price.toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Pilih File (jpg, jpeg, png; max 1MB)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
                className="block w-full rounded-md border border-gray-300 p-2 focus:border-[#57CC99] focus:ring focus:ring-[#57CC99] focus:ring-opacity-50"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {message && <p className="text-sm text-green-500">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#57CC99] py-2 text-lg font-semibold text-white transition-colors duration-200 hover:bg-[#80ED99]"
            >
              {loading ? "Uploading..." : "Upload Bukti Pembayaran"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentProofUploadPage;
