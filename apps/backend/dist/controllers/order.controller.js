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
const cloudinary_1 = require("../utils/cloudinary");
const generateOrderNumber = (date) => {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    const datePrefix = `${yyyy}${mm}${dd}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
    return `${datePrefix}${randomDigits}`;
};
class OrderController {
    // create a new order
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = "1";
            try {
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile)
                    return res.status(404).json({ error: "Profile not found" });
                const { address_id, products, total_price, shipping_price } = req.body;
                if (!products || !Array.isArray(products) || products.length === 0) {
                    return res.status(400).json({ error: "No products provided" });
                }
                const address = yield prisma_1.default.address.findFirst({
                    where: {
                        address_id: Number(address_id),
                        profile_id: profile.profile_id,
                    },
                });
                if (!address)
                    return res.status(404).json({ error: "Address not found" });
                const nearestStore = yield prisma_1.default.store.findFirst();
                if (!nearestStore)
                    return res.status(400).json({ error: "No store available" });
                for (const item of products) {
                    const stock = yield prisma_1.default.stock.findFirst({
                        where: {
                            product_id: Number(item.product_id),
                            store_id: nearestStore.store_id,
                        },
                    });
                    if (!stock || stock.quantity < item.quantity) {
                        return res.status(400).json({
                            error: `Insufficient stock for product ${item.product_id}`,
                        });
                    }
                }
                const now = new Date();
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
                            order_date: new Date(),
                            profile_id: profile.profile_id,
                            order_items: {
                                create: products.map((item) => ({
                                    product_id: Number(item.product_id),
                                    quantity: Number(item.quantity),
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
                            const stock = yield tx.stock.findFirst({
                                where: {
                                    product_id: item.product_id,
                                    store_id: nearestStore.store_id,
                                },
                            });
                            if (stock) {
                                yield tx.stock.update({
                                    where: { stock_id: stock.stock_id },
                                    data: { quantity: stock.quantity - item.quantity },
                                });
                                yield tx.stockJournal.create({
                                    data: {
                                        store_id: nearestStore.store_id,
                                        stock_id: stock.stock_id,
                                        product_id: item.product_id,
                                        quantity: item.quantity,
                                        type: "out",
                                        notes: `Order ${orderNumber} created - stock deducted`,
                                        created_at: new Date(),
                                    },
                                });
                            }
                        }
                    }
                    const totalPayment = total + (shipping_price || 0);
                    const updatedOrder = yield tx.order.update({
                        where: { order_id: createdOrder.order_id },
                        data: { total_price: total, total_payment: totalPayment },
                        include: { order_items: true },
                    });
                    return updatedOrder;
                }));
                return res.status(201).json(order);
            }
            catch (error) {
                console.error("Create Order Error:", error);
                return res.status(500).json({ error: "Failed to create order" });
            }
        });
    }
    // upload payment proof, cloudinary
    uploadPaymentProof(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { order_id } = req.params;
                if (!req.file)
                    return res.status(400).json({ error: "No file uploaded" });
                const uploadedResult = yield (0, cloudinary_1.uploadImage)(req.file.path);
                const imageUrl = uploadedResult.secure_url;
                const paymentProof = yield prisma_1.default.paymentProof.create({
                    data: {
                        order_id: Number(order_id),
                        image_url: imageUrl,
                        uploaded_at: new Date(),
                        status: "pending",
                    },
                });
                yield prisma_1.default.order.update({
                    where: { order_id: Number(order_id) },
                    data: { status: "menunggu_konfirmasi" },
                });
                return res.status(200).json({
                    message: "Payment proof uploaded successfully",
                    paymentProof,
                });
            }
            catch (error) {
                console.error("Upload Payment Proof Error:", error);
                return res.status(500).json({ error: "Failed to upload payment proof" });
            }
        });
    }
    // get order list
    getOrderList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = "1";
            try {
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile)
                    return res.status(404).json({ error: "Profile not found" });
                const { date, order_id } = req.query;
                let whereClause = { profile_id: profile.profile_id };
                if (order_id)
                    whereClause.order_id = Number(order_id);
                if (date) {
                    const localStart = new Date(date + "T00:00:00");
                    const localEnd = new Date(date + "T23:59:59");
                    const start = new Date(localStart.getTime() - 7 * 60 * 60 * 1000);
                    const end = new Date(localEnd.getTime() - 7 * 60 * 60 * 1000);
                    console.log("Filtering orders with start:", start, "and end:", end);
                    whereClause.order_date = { gte: start, lt: end };
                }
                const orders = yield prisma_1.default.order.findMany({
                    where: whereClause,
                    include: {
                        order_items: { include: { product: true } },
                        payment_proof: true,
                    },
                });
                return res.status(200).json(orders);
            }
            catch (error) {
                console.error("Get Order List Error:", error);
                return res.status(500).json({ error: "Failed to fetch orders" });
            }
        });
    }
    // cancel order before payment proof upload
    cancelOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = "1";
            try {
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile)
                    return res.status(404).json({ error: "Profile not found" });
                const { order_id } = req.params;
                const order = yield prisma_1.default.order.findUnique({
                    where: { order_id: Number(order_id) },
                    include: { order_items: true },
                });
                if (!order || order.profile_id !== profile.profile_id) {
                    return res.status(404).json({ error: "Order not found" });
                }
                if (order.status !== "menunggu_pembayaran") {
                    return res
                        .status(400)
                        .json({ error: "Order cannot be canceled at this stage" });
                }
                const { reason } = req.body;
                const canceledOrder = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    for (const item of order.order_items) {
                        const stock = yield tx.stock.findFirst({
                            where: {
                                product_id: item.product_id,
                                store_id: order.store_id,
                            },
                        });
                        if (stock) {
                            yield tx.stock.update({
                                where: { stock_id: stock.stock_id },
                                data: { quantity: stock.quantity + item.quantity },
                            });
                            yield tx.stockJournal.create({
                                data: {
                                    store_id: order.store_id,
                                    stock_id: stock.stock_id,
                                    product_id: item.product_id,
                                    quantity: item.quantity,
                                    type: "in",
                                    notes: `Order ${order.order_number || order.order_id} canceled by user: ${reason || "No reason provided"}`,
                                    created_at: new Date(),
                                },
                            });
                        }
                    }
                    yield tx.orderCancel.create({
                        data: {
                            order_id: order.order_id,
                            reason: reason || "User canceled the order",
                            canceled_at: new Date(),
                        },
                    });
                    const updatedOrder = yield tx.order.update({
                        where: { order_id: order.order_id },
                        data: { status: "dibatalkan" },
                    });
                    return updatedOrder;
                }));
                return res.status(200).json({
                    message: "Order canceled successfully and stock has been returned",
                    order: canceledOrder,
                });
            }
            catch (error) {
                console.error("Cancel Order Error:", error);
                return res.status(500).json({ error: "Failed to cancel order" });
            }
        });
    }
    // confirm order receipt
    confirmOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = "1";
            try {
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile)
                    return res.status(404).json({ error: "Profile not found" });
                const { order_id } = req.params;
                const order = yield prisma_1.default.order.findUnique({
                    where: { order_id: Number(order_id) },
                });
                if (!order || order.profile_id !== profile.profile_id) {
                    return res.status(404).json({ error: "Order not found" });
                }
                if (order.status !== "dikirim") {
                    return res
                        .status(400)
                        .json({ error: "Order cannot be confirmed at this stage" });
                }
                const updatedOrder = yield prisma_1.default.order.update({
                    where: { order_id: order.order_id },
                    data: { status: "pesanan_dikonfirmasi" },
                });
                return res.status(200).json({
                    message: "Order confirmed successfully",
                    order: updatedOrder,
                });
            }
            catch (error) {
                console.error("Confirm Order Error:", error);
                return res.status(500).json({ error: "Failed to confirm order" });
            }
        });
    }
    // get order by id
    getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = "1";
            try {
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile) {
                    return res.status(404).json({ error: "Profile not found" });
                }
                const { order_id } = req.params;
                const order = yield prisma_1.default.order.findUnique({
                    where: { order_id: Number(order_id) },
                    include: {
                        order_items: {
                            include: { product: true },
                        },
                        payment_proof: true,
                    },
                });
                if (!order || order.profile_id !== profile.profile_id) {
                    return res.status(404).json({ error: "Order not found" });
                }
                return res.status(200).json(order);
            }
            catch (error) {
                console.error("Get Order By Id Error:", error);
                return res.status(500).json({ error: "Failed to fetch order details" });
            }
        });
    }
    // method auto cancel
    autoCancelOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
                const ordersToCancel = yield prisma_1.default.order.findMany({
                    where: {
                        status: "menunggu_pembayaran",
                        order_date: { lt: oneHourAgo },
                    },
                    include: { order_items: true },
                });
                for (const order of ordersToCancel) {
                    yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                        for (const item of order.order_items) {
                            const stock = yield tx.stock.findFirst({
                                where: {
                                    product_id: item.product_id,
                                    store_id: order.store_id,
                                },
                            });
                            if (stock) {
                                yield tx.stock.update({
                                    where: { stock_id: stock.stock_id },
                                    data: { quantity: stock.quantity + item.quantity },
                                });
                                yield tx.stockJournal.create({
                                    data: {
                                        store_id: order.store_id,
                                        stock_id: stock.stock_id,
                                        product_id: item.product_id,
                                        quantity: item.quantity,
                                        type: "in",
                                        notes: `Auto cancel order ${order.order_number || order.order_id}: stock returned`,
                                        created_at: new Date(),
                                    },
                                });
                            }
                        }
                        yield tx.orderCancel.create({
                            data: {
                                order_id: order.order_id,
                                reason: "Auto cancelled due to timeout",
                                canceled_at: new Date(),
                            },
                        });
                        yield tx.order.update({
                            where: { order_id: order.order_id },
                            data: { status: "dibatalkan" },
                        });
                    }));
                    console.log(`Order ${order.order_id} auto cancelled and stock returned.`);
                }
            }
            catch (error) {
                console.error("Error auto-cancelling orders:", error);
            }
        });
    }
    // method untuk auto-confirmation
    autoConfirmOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
                const ordersToConfirm = yield prisma_1.default.order.findMany({
                    where: {
                        status: "dikirim",
                        order_date: { lt: twoDaysAgo },
                    },
                });
                for (const order of ordersToConfirm) {
                    yield prisma_1.default.order.update({
                        where: { order_id: order.order_id },
                        data: { status: "pesanan_dikonfirmasi" },
                    });
                    console.log(`Order ${order.order_id} auto confirmed.`);
                }
            }
            catch (error) {
                console.error("Error auto-confirming orders:", error);
            }
        });
    }
}
exports.OrderController = OrderController;
