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
exports.createProduct = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const createProduct = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, price, description, category, image, }) {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const checkProductName = yield tx.product.findFirst({
            where: {
                product_name: name,
            },
        });
        if (checkProductName) {
            throw new Error("Product has already been added. Cannot add same product.");
        }
        const product = yield tx.product.create({
            data: {
                product_name: name,
                product_price: parseInt(price),
                product_description: description,
                product_category: {
                    connect: { product_category_id: parseInt(category) },
                },
            },
        });
        console.log("Ini Image :", image);
        yield Promise.all(image.map((imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.productImg.create({
                data: {
                    image_url: imageUrl,
                    product: { connect: { product_id: product.product_id } },
                },
            });
        })));
    }));
    return result;
});
exports.createProduct = createProduct;
