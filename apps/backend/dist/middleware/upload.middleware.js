"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB
    fileFilter: (_req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Only image files (jpg, jpeg, png) are allowed"));
        }
        cb(null, true);
    },
});
