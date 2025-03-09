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
exports.AdminOrderController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getAllOrder_1 = require("../services/adminOrder/getAllOrder");
const confirmPayment_1 = require("../services/adminOrder/confirmPayment");
const sendUserOrder_1 = require("../services/adminOrder/sendUserOrder");
const cancelUserOrder_1 = require("../services/adminOrder/cancelUserOrder");
class AdminOrderController {
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res.locals.user)
                return res.status(401).json({ error: "Unauthorized" });
            const { id: userId, role } = res.locals.user;
            try {
                const admin = yield prisma_1.default.admin.findUnique({
                    where: { user_id: userId },
                    include: { user: true },
                });
                if (!admin && role !== "super_admin")
                    return res.status(404).json({ error: "Admin tidak ditemukan" });
                const result = yield (0, getAllOrder_1.getAllOrdersService)({ admin, query: req.query });
                return res.status(200).json(result);
            }
            catch (error) {
                console.error("Get All Orders Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Gagal mengambil data pesanan" });
            }
        });
    }
    confirmPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res.locals.user)
                return res.status(401).json({ error: "Unauthorized" });
            const { id: userId, role } = res.locals.user;
            try {
                const admin = yield prisma_1.default.admin.findUnique({
                    where: { user_id: userId },
                    include: { user: true },
                });
                if (!admin && role !== "super_admin")
                    return res.status(404).json({ error: "Admin tidak ditemukan" });
                const { order_id } = req.params;
                const { decision } = req.body;
                const message = yield (0, confirmPayment_1.confirmPaymentService)({
                    admin,
                    order_id,
                    decision,
                });
                return res.status(200).json({ message });
            }
            catch (error) {
                console.error("Confirm Payment Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Gagal mengkonfirmasi pembayaran" });
            }
        });
    }
    sendUserOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res.locals.user)
                return res.status(401).json({ error: "Unauthorized" });
            const { id: userId, role } = res.locals.user;
            try {
                const admin = yield prisma_1.default.admin.findUnique({
                    where: { user_id: userId },
                    include: { user: true },
                });
                if (!admin && role !== "super_admin")
                    return res.status(404).json({ error: "Admin tidak ditemukan" });
                const { order_id } = req.params;
                const { tracking_number } = req.body;
                const updatedOrder = yield (0, sendUserOrder_1.sendUserOrderService)({
                    admin,
                    order_id,
                    tracking_number,
                });
                return res.status(200).json({
                    message: "Order status updated to 'dikirim'",
                    order: updatedOrder,
                });
            }
            catch (error) {
                console.error("Send User Order Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Failed to update order status" });
            }
        });
    }
    cancelUserOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res.locals.user)
                return res.status(401).json({ error: "Unauthorized" });
            const { id: userId, role } = res.locals.user;
            try {
                const admin = yield prisma_1.default.admin.findUnique({
                    where: { user_id: userId },
                    include: { user: true },
                });
                if (!admin && role !== "super_admin")
                    return res.status(404).json({ error: "Admin tidak ditemukan" });
                const { order_id } = req.params;
                const { reason } = req.body;
                const updatedOrder = yield (0, cancelUserOrder_1.cancelUserOrderService)({
                    admin,
                    order_id,
                    reason,
                });
                return res.status(200).json({
                    message: "Order dibatalkan dan stok telah dikembalikan",
                    order: updatedOrder,
                });
            }
            catch (error) {
                console.error("Cancel User Order Error:", error);
                return res
                    .status(500)
                    .json({ error: error.message || "Gagal membatalkan order" });
            }
        });
    }
}
exports.AdminOrderController = AdminOrderController;
