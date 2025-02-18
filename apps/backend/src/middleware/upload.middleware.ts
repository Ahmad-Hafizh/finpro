import multer from "multer";

const storage = multer.diskStorage({});
export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB
  fileFilter: (_req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image files (jpg, jpeg, png) are allowed"));
    }
    cb(null, true);
  },
});
