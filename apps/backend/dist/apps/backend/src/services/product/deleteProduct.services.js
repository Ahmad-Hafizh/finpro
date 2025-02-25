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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = void 0;
const client_1 = require("../../../../../packages/database/src/client");
const deleteProduct = (_a) => __awaiter(void 0, [_a], void 0, function* ({ product_id, }) {
    console.log("PRODUCT ID DI DALAM SERVICES: ", product_id);
    const result = yield client_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const checkProductName = yield tx.product.findFirst({
            where: {
                product_id: parseInt(product_id),
            },
        });
        if (!checkProductName) {
            throw new Error("Product not found.");
        }
        const product = yield tx.product.update({
            where: { product_id: parseInt(product_id) },
            data: {
                deletedAt: new Date(Date.now()),
            },
        });
    }));
    return result;
});
exports.deleteProduct = deleteProduct;
