import prisma from "../../prisma";

interface ConfirmPaymentParams {
  admin: any;
  order_id: string;
  decision: string;
}

export async function confirmPaymentService({
  admin,
  order_id,
  decision,
}: ConfirmPaymentParams) {
  const order = await prisma.order.findUnique({
    where: { order_id: Number(order_id) },
    include: { payment_proof: true },
  });
  if (!order) throw new Error("Order tidak ditemukan");
  if (!order.payment_proof) throw new Error("Bukti pembayaran tidak ditemukan");

  if (decision === "approve") {
    await prisma.paymentProof.update({
      where: { payment_proof_id: order.payment_proof.payment_proof_id },
      data: { status: "approved" },
    });
    await prisma.order.update({
      where: { order_id: order.order_id },
      data: { status: "diproses" },
    });
  } else if (decision === "reject") {
    await prisma.paymentProof.update({
      where: { payment_proof_id: order.payment_proof.payment_proof_id },
      data: { status: "rejected" },
    });
    await prisma.order.update({
      where: { order_id: order.order_id },
      data: { status: "menunggu_pembayaran" },
    });
  } else {
    throw new Error("Keputusan tidak valid");
  }

  // catat aksi admin
  await prisma.adminOrder.create({
    data: {
      admin_id: admin ? admin.admin_id : 0,
      order_id: order.order_id,
      action: "konfirmasi_pembayaran",
      action_time: new Date(),
    },
  });

  return `Pembayaran telah ${decision === "approve" ? "disetujui" : "ditolak"} dengan sukses`;
}
