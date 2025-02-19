import cloudinary from "../middleware/cloudinaryConfig";

export async function uploadImage(
  filePath: string,
  folder: string = "payment_proofs"
) {
  try {
    return await cloudinary.uploader.upload(filePath, { folder });
  } catch (error) {
    throw error;
  }
}
