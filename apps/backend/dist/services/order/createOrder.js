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
exports.createOrderService = createOrderService;
const prisma_1 = __importDefault(require("../../prisma"));
const voucher_service_1 = require("../voucher/voucher.service");
const generateOrderNumber = (date) => {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    const datePrefix = `${yyyy}${mm}${dd}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
    return `${datePrefix}${randomDigits}`;
};
function createOrderService(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, address_id, products, shipping_price, voucherType, voucher_code, store_id, } = params;
        const now = new Date();
        const profile = yield prisma_1.default.profile.findUnique({
            where: { user_id: userId },
        });
        if (!profile)
            throw new Error("Profile not found");
        const address = yield prisma_1.default.address.findFirst({
            where: { address_id: address_id, profile_id: profile.profile_id },
        });
        if (!address)
            throw new Error("Address not found");
        const nearestStore = yield prisma_1.default.store.findUnique({
            where: { store_id },
        });
        if (!nearestStore)
            throw new Error("Store not found");
        for (const item of products) {
            const stock = yield prisma_1.default.stock.findFirst({
                where: {
                    product_id: item.product_id,
                    store_id: nearestStore.store_id,
                },
            });
            if (!stock || stock.quantity < item.quantity) {
                throw new Error(`Insufficient stock for product ${item.product_id}`);
            }
        }
        const orderNumber = generateOrderNumber(now);
        const order = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            const createdOrder = yield tx.order.create({
                data: {
                    order_number: orderNumber,
                    store_id: nearestStore.store_id,
                    address_id: address.address_id,
                    total_price: 0,
                    shipping_price: shipping_price || null,
                    total_payment: 0,
                    status: "menunggu_pembayaran",
                    order_date: now,
                    profile_id: profile.profile_id,
                    order_items: {
                        create: products.map((item) => ({
                            product_id: item.product_id,
                            quantity: item.quantity,
                            price: 0,
                            subtotal: 0,
                        })),
                    },
                },
                include: { order_items: true },
            });
            let total = 0;
            for (const item of createdOrder.order_items) {
                const product = yield tx.product.findUnique({
                    where: { product_id: item.product_id },
                });
                if (product) {
                    const price = product.product_price;
                    const subtotal = price * item.quantity;
                    total += subtotal;
                    yield tx.orderItem.update({
                        where: { order_item_id: item.order_item_id },
                        data: { price, subtotal },
                    });
                }
            }
            let finalShippingPrice = shipping_price || 0;
            let finalTotalPayment = total + finalShippingPrice;
            let discountAmount = 0;
            let appliedVoucherCode = null;
            let voucherProductApplied = null;
            if (voucherType && voucher_code) {
                let voucherData;
                if (voucherType === "product") {
                    const combinedVoucherData = { getProductVoucher: [] };
                    for (const prod of products) {
                        const data = yield (0, voucher_service_1.getVoucher)(nearestStore.store_id, prod.product_id);
                        combinedVoucherData.getProductVoucher =
                            combinedVoucherData.getProductVoucher.concat(data.getProductVoucher || []);
                    }
                    voucherData = combinedVoucherData;
                }
                else {
                    voucherData = yield (0, voucher_service_1.getVoucher)(nearestStore.store_id, products[0].product_id);
                }
                let appliedVoucher = null;
                if (voucherType === "ongkir") {
                    appliedVoucher = voucherData.getOngkirVoucher.find((v) => v.voucher_ongkir_code === voucher_code);
                    if (appliedVoucher) {
                        discountAmount = appliedVoucher.voucher_ongkir_nominal;
                        finalShippingPrice = finalShippingPrice - discountAmount;
                        if (finalShippingPrice < 0)
                            finalShippingPrice = 0;
                        finalTotalPayment = total + finalShippingPrice;
                        appliedVoucherCode = appliedVoucher.voucher_ongkir_code;
                    }
                }
                else if (voucherType === "payment") {
                    appliedVoucher = voucherData.getStoreVoucher.find((v) => v.voucher_store_code === voucher_code);
                    if (appliedVoucher) {
                        if (appliedVoucher.voucher_store_amount_percentage > 0) {
                            if (total >= appliedVoucher.voucher_store_minimum_buy) {
                                discountAmount = Math.floor((total * appliedVoucher.voucher_store_amount_percentage) / 100);
                                if (discountAmount > appliedVoucher.voucher_store_maximum_nominal) {
                                    discountAmount = appliedVoucher.voucher_store_maximum_nominal;
                                }
                            }
                            else {
                                throw new Error(`Minimum purchase for this voucher is Rp ${appliedVoucher.voucher_store_minimum_buy.toLocaleString()}.`);
                            }
                        }
                        else {
                            discountAmount = appliedVoucher.voucher_store_exact_nominal;
                        }
                        finalTotalPayment = finalTotalPayment - discountAmount;
                        if (finalTotalPayment < 0)
                            finalTotalPayment = 0;
                        appliedVoucherCode = appliedVoucher.voucher_store_code;
                    }
                    else {
                        appliedVoucher = voucherData.getProductVoucher.find((v) => v.voucher_product_code === voucher_code);
                        if (appliedVoucher) {
                            discountAmount = 0;
                            appliedVoucherCode = appliedVoucher.voucher_product_code;
                            voucherProductApplied = { product_id: appliedVoucher.product_id };
                        }
                    }
                }
                else if (voucherType === "product") {
                    appliedVoucher = voucherData.getProductVoucher.find((v) => v.voucher_product_code === voucher_code);
                    if (appliedVoucher) {
                        discountAmount = 0;
                        appliedVoucherCode = appliedVoucher.voucher_product_code;
                        voucherProductApplied = { product_id: appliedVoucher.product_id };
                    }
                }
            }
            const updatedOrder = yield tx.order.update({
                where: { order_id: createdOrder.order_id },
                data: {
                    total_price: total,
                    shipping_price: finalShippingPrice,
                    total_payment: finalTotalPayment,
                    voucher_code: appliedVoucherCode,
                },
                include: { order_items: true },
            });
            for (const item of updatedOrder.order_items) {
                const stock = yield tx.stock.findFirst({
                    where: {
                        product_id: item.product_id,
                        store_id: nearestStore.store_id,
                    },
                });
                if (stock) {
                    let bonus = 0;
                    if (voucherType === "product" &&
                        voucher_code &&
                        (yield (0, voucher_service_1.getVoucher)(nearestStore.store_id, item.product_id)).getProductVoucher.find((v) => v.voucher_product_code === voucher_code)) {
                        bonus = 1;
                    }
                    const deductionQuantity = item.quantity + bonus;
                    yield tx.stock.update({
                        where: { stock_id: stock.stock_id },
                        data: { quantity: stock.quantity - deductionQuantity },
                    });
                    yield tx.stockJournal.create({
                        data: {
                            store_id: nearestStore.store_id,
                            stock_id: stock.stock_id,
                            product_id: item.product_id,
                            quantity: deductionQuantity,
                            type: "out",
                            notes: `Order ${orderNumber} created - stock deducted` +
                                (bonus ? " (buy 1 get 1 applied)" : ""),
                            created_at: now,
                            stock_result: stock.quantity - deductionQuantity,
                        },
                    });
                }
            }
            if (voucherType === "product" && voucherProductApplied) {
                const freeProduct = yield tx.product.findUnique({
                    where: { product_id: voucherProductApplied.product_id },
                });
                if (freeProduct) {
                    updatedOrder.free_item = {
                        product: freeProduct,
                        quantity: 1,
                    };
                }
            }
            return updatedOrder;
        }), { timeout: 10000 });
        return order;
    });
}
