"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const getProduct_services_1 = require("../services/product/getProduct.services");
const createProduct_services_1 = require("../services/product/createProduct.services");
const deleteProduct_services_1 = require("../services/product/deleteProduct.services");
const getDetailedProduct_services_1 = require("../services/product/getDetailedProduct.services");
const cloudinary_1 = require("../utils/cloudinary");
class ProductController {
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, search, cat, sort, del, store } = req.query;
                console.log(cat);
                const pageNumber = parseInt(page) || 1;
                const pageSize = 8;
                const category = cat;
                const keyword = search;
                const sortBy = sort;
                const deletedAt = del;
                const theStore = store;
                const objectPayload = {
                    category,
                    pageNumber,
                    pageSize,
                    keyword,
                    sortBy,
                    deletedAt,
                    theStore,
                };
                const result = yield (0, getProduct_services_1.findProduct)(objectPayload);
                return responseHandler_1.default.success(res, 200, "Get Product Data Success", result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.product_name;
                const price = req.body.product_price;
                const description = req.body.product_description;
                const category = req.body.product_category;
                const images = req.body.product_image;
                if (!req.files) {
                    return res.status(400).json({ error: "No files uploaded" });
                }
                const image = yield Promise.all(req.files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const result = yield (0, cloudinary_1.uploadImage)(file.path, "product_images");
                    return result.secure_url;
                })));
                const objectPayload = { name, price, description, category, image };
                console.log("This is category :", category);
                const result = yield (0, createProduct_services_1.createProduct)(objectPayload);
                return responseHandler_1.default.success(res, 200, "Create Product Success", result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.body.product_id;
                console.log("INI PRODUCT ID :", product_id);
                const result = yield (0, deleteProduct_services_1.deleteProduct)({ product_id });
                return responseHandler_1.default.success(res, 200, "Create Product Success", result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    getDetailedProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const result = yield (0, getDetailedProduct_services_1.findDetailedProduct)({ name });
                return responseHandler_1.default.success(res, 200, "Get detailed product success", result);
            }
            catch (error) {
                console.log("error from get detailed product", error);
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
    }
}
exports.ProductController = ProductController;
