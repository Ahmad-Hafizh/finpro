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
exports.CartController = void 0;
const client_1 = require("../../../../packages/database/src/client");
class CartController {
    // add to cart
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_id, quantity } = req.body;
            const userId = '1'; // test user id
            try {
                const user = yield client_1.prisma.user.findUnique({
                    where: { id: userId },
                    include: { accounts: true },
                });
                if (!user || !user.emailVerified) {
                    return res.status(403).json({
                        error: 'User not found or not verified',
                    });
                }
                const profile = yield client_1.prisma.profile.findUnique({
                    where: { user_id: user.id },
                });
                if (!profile) {
                    return res.status(404).json({ error: 'Profile not found' });
                }
                const stock = yield client_1.prisma.stock.findFirst({
                    where: { product_id },
                });
                if (!stock || stock.quantity < quantity) {
                    return res.status(400).json({
                        error: 'Insufficient product stock',
                    });
                }
                let cart = yield client_1.prisma.cart.findFirst({
                    where: { profile_id: profile.profile_id },
                    include: { cart_items: true },
                });
                if (!cart) {
                    cart = yield client_1.prisma.cart.create({
                        data: {
                            profile_id: profile.profile_id,
                            created_at: new Date(),
                            cart_items: {
                                create: [],
                            },
                        },
                        include: { cart_items: true },
                    });
                }
                if (!cart) {
                    return res.status(500).json({ error: 'Failed to create cart' });
                }
                const existingCartItem = yield client_1.prisma.cartItem.findFirst({
                    where: {
                        cart_id: cart.cart_id,
                        product_id,
                    },
                });
                if (existingCartItem) {
                    const updatedCartItem = yield client_1.prisma.cartItem.update({
                        where: { cart_item_id: existingCartItem.cart_item_id },
                        data: { quantity: existingCartItem.quantity + quantity },
                    });
                    return res.status(200).json(updatedCartItem);
                }
                const newCartItem = yield client_1.prisma.cartItem.create({
                    data: {
                        cart_id: cart.cart_id,
                        product_id,
                        quantity,
                    },
                });
                return res.status(201).json(newCartItem);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to add to cart' });
            }
        });
    }
    // get cart items count
    getCartItemsCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userId = '1';
            try {
                const profile = yield client_1.prisma.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile) {
                    return res.status(404).json({ error: 'Profile not found' });
                }
                const cart = yield client_1.prisma.cart.findFirst({
                    where: { profile_id: profile.profile_id },
                    include: { cart_items: true },
                });
                const itemCount = (_b = (_a = cart === null || cart === void 0 ? void 0 : cart.cart_items) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
                return res.status(200).json({ count: itemCount });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to get item count' });
            }
        });
    }
    // get cart items
    getCartItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = '1';
            try {
                const profile = yield client_1.prisma.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile) {
                    return res.status(404).json({ error: 'Profile not found' });
                }
                const cart = yield client_1.prisma.cart.findFirst({
                    where: { profile_id: profile.profile_id },
                    include: {
                        cart_items: {
                            include: {
                                product: {
                                    include: {
                                        product_img: true,
                                        stock: {
                                            include: {
                                                store: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
                if (!cart) {
                    return res.status(200).json({ items: [] });
                }
                const itemsWithTotal = cart.cart_items.map((item) => {
                    var _a, _b, _c;
                    return (Object.assign(Object.assign({}, item), { subtotal: item.quantity * item.product.product_price, store_name: (_c = (_b = (_a = item.product.stock) === null || _a === void 0 ? void 0 : _a.store) === null || _b === void 0 ? void 0 : _b.store_name) !== null && _c !== void 0 ? _c : 'Unknown Store', product: Object.assign(Object.assign({}, item.product), { stock: item.product.stock
                                ? Object.assign(Object.assign({}, item.product.stock), { store: item.product.stock.store }) : null }) }));
                });
                const total = itemsWithTotal.reduce((sum, item) => sum + item.subtotal, 0);
                return res.status(200).json({
                    items: itemsWithTotal,
                    total,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to get items' });
            }
        });
    }
    // update cart item quantity
    updateCartItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cart_item_id } = req.params;
            const { quantity } = req.body;
            try {
                if (quantity < 1) {
                    return res.status(400).json({
                        error: 'Quantity should be more than 0',
                    });
                }
                const cartItem = yield client_1.prisma.cartItem.findUnique({
                    where: { cart_item_id: parseInt(cart_item_id, 10) },
                });
                if (!cartItem) {
                    return res.status(404).json({ error: "Item doesn't exist" });
                }
                const stock = yield client_1.prisma.stock.findFirst({
                    where: { product_id: cartItem.product_id },
                });
                if (!stock || stock.quantity < quantity) {
                    return res.status(400).json({ error: 'Insufficient stock' });
                }
                const updatedCartItem = yield client_1.prisma.cartItem.update({
                    where: { cart_item_id: parseInt(cart_item_id, 10) },
                    data: { quantity },
                });
                return res.status(200).json(updatedCartItem);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to update item' });
            }
        });
    }
    // delete cart item
    deleteCartItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cart_item_id } = req.params;
            try {
                yield client_1.prisma.cartItem.delete({
                    where: { cart_item_id: parseInt(cart_item_id, 10) },
                });
                return res.status(200).json({ message: 'Item deleted successfully' });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to delete item' });
            }
        });
    }
}
exports.CartController = CartController;
