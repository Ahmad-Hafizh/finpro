"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: "dk2sik7oi",
    api_key: "185537156573628",
    api_secret: "jin_Y3euY4cqJDR1I51mya6KNH4",
});
exports.default = cloudinary_1.v2;
