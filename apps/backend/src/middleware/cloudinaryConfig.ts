import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "dk2sik7oi",
  api_key: "185537156573628",
  api_secret: "jin_Y3euY4cqJDR1I51mya6KNH4",
});

export default cloudinary;
