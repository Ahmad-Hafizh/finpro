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
exports.getCartItemsCountService = getCartItemsCountService;
const responseHandler_1 = __importDefault(require("../../utils/responseHandler"));
const prisma_1 = __importDefault(require("../../prisma"));
function getCartItemsCountService(res, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const profile = yield prisma_1.default.profile.findUnique({
            where: { user_id: userId },
        });
        if (!profile) {
            return responseHandler_1.default.error(res, 404, 'Profile not found');
        }
        const cart = yield prisma_1.default.cart.findFirst({
            where: { profile_id: profile.profile_id },
            include: { cart_items: true },
        });
        const itemCount = (_b = (_a = cart === null || cart === void 0 ? void 0 : cart.cart_items) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        return { count: itemCount };
    });
}
