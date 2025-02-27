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
exports.AddressController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
class AddressController {
    getAddresses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        email,
                    },
                    include: {
                        profile: true,
                    },
                });
                if (!(user === null || user === void 0 ? void 0 : user.profile))
                    return responseHandler_1.default.error(res, 404, "user not found");
                const addresses = yield prisma_1.default.address.findMany({
                    where: { profile_id: user.profile.profile_id, deleted_at: null },
                });
                return responseHandler_1.default.success(res, 200, "get address success", addresses);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "internal server error", error);
            }
        });
    }
    setDeliveryAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { email } = req.body;
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        email,
                    },
                    include: {
                        profile: true,
                    },
                });
                yield prisma_1.default.address.create({
                    data: Object.assign(Object.assign({}, req.body), { profile_id: (_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.profile_id }),
                });
                return responseHandler_1.default.success(res, 201, "add address success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "internal server error", error);
            }
        });
    }
    updateDeliveryAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { email } = req.body;
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        email,
                    },
                    include: {
                        profile: true,
                    },
                });
                yield prisma_1.default.address.update({
                    where: {
                        address_id: req.body.address_id,
                        profile_id: (_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.profile_id,
                        deleted_at: null,
                    },
                    data: Object.assign({}, req.body),
                });
                return responseHandler_1.default.success(res, 201, "update address success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "internal server error", error);
            }
        });
    }
    deleteAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, address_id } = req.body;
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        email,
                    },
                    include: {
                        profile: true,
                    },
                });
                if (!user) {
                    return responseHandler_1.default.error(res, 404, "User not found");
                }
                yield prisma_1.default.address.update({
                    where: { address_id },
                    data: {
                        deleted_at: new Date().toISOString(),
                    },
                });
                return responseHandler_1.default.success(res, 200, "Delete Address Success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "internal server error", error);
            }
        });
    }
}
exports.AddressController = AddressController;
