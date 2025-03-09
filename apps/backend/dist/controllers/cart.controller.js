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
const addToCart_1 = require("../services/cart/addToCart");
const getCartItemCount_1 = require("../services/cart/getCartItemCount");
const getCartItems_1 = require("../services/cart/getCartItems");
const updateCartItems_1 = require("../services/cart/updateCartItems");
const deleteCartItem_1 = require("../services/cart/deleteCartItem");
class CartController {
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { product_id, quantity } = req.body;
            const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            try {
                const cartItem = yield (0, addToCart_1.addToCartService)({
                    userId,
                    product_id,
                    quantity,
                });
                return res.status(cartItem ? 200 : 201).json(cartItem);
            }
            catch (error) {
                console.error('Add To Cart Error:', error);
                return res.status(500).json({ error: error.message || 'Failed to add to cart' });
            }
        });
    }
    getCartItemsCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            try {
                const result = yield (0, getCartItemCount_1.getCartItemsCountService)(res, userId);
                return res.status(200).json(result);
            }
            catch (error) {
                console.error('Get Cart Items Count Error:', error);
                return res.status(500).json({ error: error.message || 'Failed to get item count' });
            }
        });
    }
    getCartItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            try {
                const result = yield (0, getCartItems_1.getCartItemsService)(userId);
                return res.status(200).json(result);
            }
            catch (error) {
                console.error('Get Cart Items Error:', error);
                return res.status(500).json({ error: error.message || 'Failed to get items' });
            }
        });
    }
    updateCartItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cart_item_id } = req.params;
            const { quantity } = req.body;
            try {
                const updatedCartItem = yield (0, updateCartItems_1.updateCartItemService)({
                    cart_item_id: parseInt(cart_item_id, 10),
                    quantity,
                });
                return res.status(200).json(updatedCartItem);
            }
            catch (error) {
                console.error('Update Cart Item Error:', error);
                return res.status(500).json({ error: error.message || 'Failed to update item' });
            }
        });
    }
    deleteCartItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cart_item_id } = req.params;
            try {
                const result = yield (0, deleteCartItem_1.deleteCartItemService)(parseInt(cart_item_id, 10));
                return res.status(200).json(result);
            }
            catch (error) {
                console.error('Delete Cart Item Error:', error);
                return res.status(500).json({ error: error.message || 'Failed to delete item' });
            }
        });
    }
}
exports.CartController = CartController;
