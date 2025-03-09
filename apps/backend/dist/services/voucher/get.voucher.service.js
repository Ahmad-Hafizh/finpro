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
exports.getVouchersService = getVouchersService;
const prisma_1 = __importDefault(require("../../prisma"));
function getVouchersService(voucherType, store_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        if (voucherType === "ongkir") {
            const vouchers = yield prisma_1.default.voucherOngkir.findMany({
                where: Object.assign({ voucher_ongkir_enddate: { gte: now } }, (store_id ? { store_id: store_id } : {})),
                select: {
                    voucher_ongkir_id: true,
                    voucher_ongkir_code: true,
                    voucher_ongkir_nominal: true,
                },
            });
            return vouchers.map((v) => ({
                voucher_id: v.voucher_ongkir_id,
                voucher_code: v.voucher_ongkir_code,
                nominal: v.voucher_ongkir_nominal,
                type: "ongkir",
            }));
        }
        else if (voucherType === "payment") {
            const vouchers = yield prisma_1.default.voucherStore.findMany({
                where: Object.assign({ voucher_store_enddate: { gte: now } }, (store_id ? { store_id: store_id } : {})),
                select: {
                    voucher_store_id: true,
                    voucher_store_code: true,
                    voucher_store_amount_percentage: true,
                    voucher_store_exact_nominal: true,
                    voucher_store_minimum_buy: true,
                    voucher_store_maximum_nominal: true,
                },
            });
            return vouchers.map((v) => ({
                voucher_id: v.voucher_store_id,
                voucher_code: v.voucher_store_code,
                amount_percentage: v.voucher_store_amount_percentage,
                exact_nominal: v.voucher_store_exact_nominal,
                minimum_buy: v.voucher_store_minimum_buy,
                maximum_nominal: v.voucher_store_maximum_nominal,
                type: "payment",
            }));
        }
        else if (voucherType === "product") {
            const vouchers = yield prisma_1.default.voucherProduct.findMany({
                where: Object.assign({ voucher_product_enddate: { gte: now } }, (store_id
                    ? { product: { stock: { some: { store_id: store_id } } } }
                    : {})),
                select: {
                    voucher_product_id: true,
                    voucher_product_code: true,
                    product_id: true,
                },
            });
            return vouchers.map((v) => ({
                voucher_id: v.voucher_product_id,
                voucher_code: v.voucher_product_code,
                product_id: v.product_id,
                type: "product",
            }));
        }
        else {
            return [];
        }
    });
}
