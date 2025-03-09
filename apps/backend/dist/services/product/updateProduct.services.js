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
exports.updateProduct = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const updateProduct = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, price, description, category, image, }) {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const existingProduct = yield tx.product.findFirst({
            where: { product_id: id },
        });
        console.log("INI EXISTING PRODUCTTTTTTT : ", existingProduct);
        if (!existingProduct) {
            throw new Error("Product not found. Cannot update non-existing product.");
        }
        const updatedProduct = yield tx.product.update({
            where: { product_id: existingProduct.product_id },
            data: {
                product_name: name !== null && name !== void 0 ? name : existingProduct.product_name,
                product_price: price ? parseInt(price) : existingProduct.product_price,
                product_description: description !== null && description !== void 0 ? description : existingProduct.product_description,
                product_category: {
                    connect: { product_category_name: category },
                },
            },
        });
        if (image) {
            if (image.length > 0) {
                yield tx.productImg.deleteMany({
                    where: { product_id: existingProduct.product_id },
                });
                yield Promise.all(image.map((imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
                    yield tx.productImg.create({
                        data: {
                            image_url: imageUrl,
                            product: {
                                connect: { product_id: existingProduct.product_id },
                            },
                        },
                    });
                })));
            }
        }
        return updatedProduct;
    }));
    return result;
});
exports.updateProduct = updateProduct;
