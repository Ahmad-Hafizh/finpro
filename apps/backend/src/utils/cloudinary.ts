import cloudinary from "../middleware/cloudinaryConfig";

export async function uploadImage(filePath: string) {
  try {
    return await cloudinary.uploader.upload(filePath, {
      folder: "payment_proofs",
    });
  } catch (error) {
    throw error;
  }
}
