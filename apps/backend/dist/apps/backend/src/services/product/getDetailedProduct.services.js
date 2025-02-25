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
exports.findDetailedProduct = void 0;
const client_1 = require("../../../../../packages/database/src/client");
const findDetailedProduct = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name }) {
    console.log("This is name", name);
    const result = yield client_1.prisma.product.findFirst({
        where: {
            product_name: name,
        },
        include: {
            product_category: true,
            product_img: true,
            voucher: true,
            stock: true,
        },
    });
    return result;
});
exports.findDetailedProduct = findDetailedProduct;
