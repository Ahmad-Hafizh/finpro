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
exports.VoucherController = void 0;
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const prisma_1 = __importDefault(require("../prisma"));
const get_voucher_service_1 = require("../services/voucher/get.voucher.service");
class VoucherController {
    getAllVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id } = req.query;
                const storeId = parseInt(store_id);
                const voucherStores = yield prisma_1.default.voucherStore.findMany({
                    where: storeId ? { store_id: storeId } : undefined,
                    include: { store: true },
                });
                const voucherOngkirs = yield prisma_1.default.voucherOngkir.findMany({
                    where: storeId ? { store_id: storeId } : undefined,
                    include: { store: true },
                });
                const voucherProducts = yield prisma_1.default.voucherProduct.findMany({
                    where: storeId
                        ? { product: { stock: { some: { store_id: storeId } } } }
                        : undefined,
                    include: { product: { include: { stock: true } } },
                });
                const vouchers = [
                    ...voucherStores.map((voucher) => (Object.assign(Object.assign({}, voucher), { type: "store" }))),
                    ...voucherOngkirs.map((voucher) => (Object.assign(Object.assign({}, voucher), { type: "ongkir" }))),
                    ...voucherProducts.map((voucher) => (Object.assign(Object.assign({}, voucher), { type: "product" }))),
                ];
                return responseHandler_1.default.success(res, 200, "Get Voucher Success", vouchers);
            }
            catch (error) {
                console.log(error);
                return responseHandler_1.default.error(res, 500, "internal Server Error");
            }
        });
    }
    createNewOngkirVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, nominal, startdate, enddate, store_id } = req.body;
                const user = res.locals.user.id;
                const adminId = yield prisma_1.default.admin.findFirst({
                    where: {
                        user_id: user,
                    },
                });
                if (!adminId) {
                    return responseHandler_1.default.error(res, 400, "Admin not found");
                }
                const newOngkirVoucher = yield prisma_1.default.voucherOngkir.create({
                    data: {
                        voucher_ongkir_code: code,
                        voucher_ongkir_nominal: parseInt(nominal),
                        voucher_ongkir_startdate: new Date(startdate),
                        voucher_ongkir_enddate: new Date(enddate),
                        store_id: parseInt(store_id),
                        admin_responsible: adminId === null || adminId === void 0 ? void 0 : adminId.admin_id,
                        created_at: new Date(),
                    },
                });
                return responseHandler_1.default.success(res, 200, "create new stock success", newOngkirVoucher);
            }
            catch (error) {
                console.log("ERROR : ", error);
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
    }
    createNewProductVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, nominal, startdate, enddate, product_id } = req.body;
                const user = res.locals.user.id;
                const adminId = yield prisma_1.default.admin.findFirst({
                    where: {
                        user_id: user,
                    },
                });
                if (!adminId) {
                    return responseHandler_1.default.error(res, 400, "Admin not found");
                }
                const newProductVoucher = yield prisma_1.default.voucherProduct.create({
                    data: {
                        voucher_product_code: code,
                        voucher_product_startdate: new Date(startdate),
                        voucher_product_enddate: new Date(enddate),
                        admin_responsible: adminId === null || adminId === void 0 ? void 0 : adminId.admin_id,
                        created_at: new Date(),
                        product_id: parseInt(product_id),
                    },
                });
                return responseHandler_1.default.success(res, 200, "create new stock success", newProductVoucher);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
    }
    createNewStoreVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, amount_percentage, exact_nominal, minimum_buy, maximum_nominal, startdate, enddate, store_id, } = req.body;
                const user = res.locals.user.id;
                const adminId = yield prisma_1.default.admin.findFirst({
                    where: {
                        user_id: user,
                    },
                });
                if (!adminId) {
                    return responseHandler_1.default.error(res, 400, "Admin not found");
                }
                const newStoreVoucher = yield prisma_1.default.voucherStore.create({
                    data: {
                        voucher_store_code: code,
                        voucher_store_amount_percentage: parseInt(amount_percentage) || 0,
                        voucher_store_exact_nominal: parseInt(exact_nominal) || 0,
                        voucher_store_minimum_buy: parseInt(minimum_buy) || 0,
                        voucher_store_maximum_nominal: parseInt(maximum_nominal) || 0,
                        voucher_store_startdate: new Date(startdate),
                        voucher_store_enddate: new Date(enddate),
                        store_id: parseInt(store_id),
                        created_at: new Date(),
                        admin_responsible: adminId === null || adminId === void 0 ? void 0 : adminId.admin_id,
                    },
                });
                return responseHandler_1.default.success(res, 200, "Add voucher code success", newStoreVoucher);
            }
            catch (error) {
                console.log(error);
                return responseHandler_1.default.error(res, 500, "Internal Server Error");
            }
        });
    }
    getBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield prisma_1.default.banner.findMany({
                    take: 3,
                });
                return responseHandler_1.default.success(res, 200, "get banner success", banners);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error");
            }
        });
    }
    getVouchers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const type = req.query.type;
                const storeId = req.query.store_id
                    ? parseInt(req.query.store_id)
                    : undefined;
                if (!type) {
                    return res.status(400).json({ error: "Voucher type is required" });
                }
                const vouchers = yield (0, get_voucher_service_1.getVouchersService)(type, storeId);
                return responseHandler_1.default.success(res, 200, "Get Voucher Success", vouchers);
            }
            catch (error) {
                console.error("Get Vouchers Error:", error);
                return responseHandler_1.default.error(res, 500, error.message || "Failed to get vouchers");
            }
        });
    }
}
exports.VoucherController = VoucherController;
