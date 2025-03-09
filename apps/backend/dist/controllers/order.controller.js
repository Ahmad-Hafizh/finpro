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
exports.OrderController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createOrder_1 = require("../services/order/createOrder");
const uploadPaymentProof_1 = require("../services/order/uploadPaymentProof");
const getOrderList_1 = require("../services/order/getOrderList");
const cancelOrder_1 = require("../services/order/cancelOrder");
const confirmOrder_1 = require("../services/order/confirmOrder");
const getOrderById_1 = require("../services/order/getOrderById");
const autoCancelOrders_1 = require("../services/order/autoCancelOrders");
const autoConfirmOrders_1 = require("../services/order/autoConfirmOrders");
class OrderController {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const { address_id, products, shipping_price, voucherType, 
                // voucher_id,
                voucher_code, store_id, } = req.body;
                if (!products || !Array.isArray(products) || products.length === 0) {
                    return res.status(400).json({ error: "No products provided" });
                }
                const order = yield (0, createOrder_1.createOrderService)({
                    userId,
                    address_id: Number(address_id),
                    products,
                    shipping_price,
                    voucherType,
                    // voucher_id,
                    voucher_code,
                    store_id,
                });
                return res.status(201).json(order);
            }
            catch (error) {
                console.error("Create Order Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Failed to create order" });
            }
        });
    }
    uploadPaymentProof(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file)
                return res.status(400).json({ error: "No file uploaded" });
            try {
                const { order_id } = req.params;
                const result = yield (0, uploadPaymentProof_1.uploadPaymentProofService)({
                    order_id: Number(order_id),
                    filePath: req.file.path,
                });
                return res.status(200).json(result);
            }
            catch (error) {
                console.error("Upload Payment Proof Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Failed to upload payment proof" });
            }
        });
    }
    getOrderList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile)
                    return res.status(404).json({ error: "Profile not found" });
                const { date, order_id } = req.query;
                const orders = yield (0, getOrderList_1.getOrderListService)({
                    profile_id: profile.profile_id,
                    date: date,
                    order_id: order_id ? Number(order_id) : undefined,
                });
                return res.status(200).json(orders);
            }
            catch (error) {
                console.error("Get Order List Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Failed to fetch orders" });
            }
        });
    }
    cancelOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile)
                    return res.status(404).json({ error: "Profile not found" });
                const { order_id } = req.params;
                const { reason } = req.body;
                const canceledOrder = yield (0, cancelOrder_1.cancelOrderService)({
                    profile_id: profile.profile_id,
                    order_id: Number(order_id),
                    reason,
                });
                return res.status(200).json({
                    message: "Order canceled successfully and stock has been returned",
                    order: canceledOrder,
                });
            }
            catch (error) {
                console.error("Cancel Order Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Failed to cancel order" });
            }
        });
    }
    confirmOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile)
                    return res.status(404).json({ error: "Profile not found" });
                const { order_id } = req.params;
                const updatedOrder = yield (0, confirmOrder_1.confirmOrderService)({
                    profile_id: profile.profile_id,
                    order_id: Number(order_id),
                });
                return res.status(200).json({
                    message: "Order confirmed successfully",
                    order: updatedOrder,
                });
            }
            catch (error) {
                console.error("Confirm Order Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Failed to confirm order" });
            }
        });
    }
    getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile)
                    return res.status(404).json({ error: "Profile not found" });
                const { order_id } = req.params;
                const order = yield (0, getOrderById_1.getOrderByIdService)(profile.profile_id, Number(order_id));
                return res.status(200).json(order);
            }
            catch (error) {
                console.error("Get Order By Id Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Failed to fetch order details" });
            }
        });
    }
    autoCancelOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, autoCancelOrders_1.autoCancelOrdersService)();
            }
            catch (error) {
                console.error("Error in autoCancelOrders:", error);
            }
        });
    }
    autoConfirmOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, autoConfirmOrders_1.autoConfirmOrdersService)();
            }
            catch (error) {
                console.error("Error in autoConfirmOrders:", error);
            }
        });
    }
}
exports.OrderController = OrderController;
