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
exports.confirmPaymentService = confirmPaymentService;
const prisma_1 = __importDefault(require("../../prisma"));
function confirmPaymentService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ admin, order_id, decision, }) {
        const order = yield prisma_1.default.order.findUnique({
            where: { order_id: Number(order_id) },
            include: { payment_proof: true },
        });
        if (!order)
            throw new Error("Order tidak ditemukan");
        if (!order.payment_proof)
            throw new Error("Bukti pembayaran tidak ditemukan");
        if (decision === "approve") {
            yield prisma_1.default.paymentProof.update({
                where: { payment_proof_id: order.payment_proof.payment_proof_id },
                data: { status: "approved" },
            });
            yield prisma_1.default.order.update({
                where: { order_id: order.order_id },
                data: { status: "diproses" },
            });
        }
        else if (decision === "reject") {
            yield prisma_1.default.paymentProof.update({
                where: { payment_proof_id: order.payment_proof.payment_proof_id },
                data: { status: "rejected" },
            });
            yield prisma_1.default.order.update({
                where: { order_id: order.order_id },
                data: { status: "menunggu_pembayaran" },
            });
        }
        else {
            throw new Error("Keputusan tidak valid");
        }
        // catat aksi admin
        yield prisma_1.default.adminOrder.create({
            data: {
                admin_id: admin ? admin.admin_id : 0,
                order_id: order.order_id,
                action: "konfirmasi_pembayaran",
                action_time: new Date(),
            },
        });
        return `Pembayaran telah ${decision === "approve" ? "disetujui" : "ditolak"} dengan sukses`;
    });
}
