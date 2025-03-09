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
exports.getVoucher = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getVoucher = (store_id, product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const nowDate = new Date();
    const getOngkirVoucher = yield prisma_1.default.voucherOngkir.findMany({
        where: {
            store_id: store_id,
            voucher_ongkir_enddate: {
                gte: nowDate,
            },
        },
    });
    const getProductVoucher = yield prisma_1.default.voucherProduct.findMany({
        where: {
            product_id: product_id,
            voucher_product_enddate: {
                gte: nowDate,
            },
        },
    });
    const getStoreVoucher = yield prisma_1.default.voucherStore.findMany({
        where: {
            store_id: store_id,
            voucher_store_enddate: {
                gte: nowDate,
            },
        },
    });
    return {
        getOngkirVoucher,
        getProductVoucher,
        getStoreVoucher,
    };
});
exports.getVoucher = getVoucher;
