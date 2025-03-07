import prisma from "../../prisma";
import { uploadImage } from "../../utils/cloudinary";

interface UploadPaymentProofParams {
  order_id: number;
  filePath: string;
}

export async function uploadPaymentProofService({
  order_id,
  filePath,
}: UploadPaymentProofParams) {
  const uploadedResult = await uploadImage(filePath);
  const imageUrl = uploadedResult.secure_url;

  const paymentProof = await prisma.paymentProof.create({
    data: {
      order_id,
      image_url: imageUrl,
      uploaded_at: new Date(),
      status: "pending",
    },
  });

  await prisma.order.update({
    where: { order_id },
    data: { status: "menunggu_konfirmasi" },
  });

  return { paymentProof, message: "Payment proof uploaded successfully" };
}
