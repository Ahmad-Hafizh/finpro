"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const PaymentProofUploadPage: React.FC = () => {
  const router = useRouter();
  const params = useParams() as { order_id: string };
  const orderId = params.order_id;

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
      const res = await fetch(
        `http://localhost:8090/order/${orderId}/payment-proof`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengupload bukti pembayaran");
      }
      await res.json();
      setMessage("Bukti pembayaran berhasil diupload.");
      router.push("/payment-proof");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Upload Bukti Pembayaran untuk Order {orderId}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block">
            Choose File (jpg, jpeg, png; max 1MB):
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
            className="w-full"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {loading ? "Uploading..." : "Upload Bukti Pembayaran"}
        </button>
      </form>
    </div>
  );
};

export default PaymentProofUploadPage;
