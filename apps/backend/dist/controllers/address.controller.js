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
                    return responseHandler_1.default.error(res, 404, 'user not found');
                const addresses = yield prisma_1.default.address.findMany({
                    where: { profile_id: user.profile.profile_id, deleted_at: null },
                });
                return responseHandler_1.default.success(res, 200, 'get address success', addresses);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'internal server error', error);
            }
        });
    }
    // async getAddresses(req: Request, res: Response): Promise<any> {
    //   const userId = "1";
    //   try {
    //     const profile = await prisma.profile.findUnique({
    //       where: { user_id: userId },
    //     });
    //     if (!profile) return res.status(404).json({ error: "Profile not found" });
    //     const addresses = await prisma.address.findMany({
    //       where: { profile_id: profile.profile_id },
    //     });
    //     return res.status(200).json(addresses);
    //   } catch (error) {
    //     console.error("Get Addresses Error:", error);
    //     return res.status(500).json({ error: "Failed to fetch addresses" });
    //   }
    // }
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
                if (!((_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.profile_id)) {
                    return responseHandler_1.default.error(res, 400, 'user not found');
                }
                yield prisma_1.default.address.create({
                    data: {
                        profile_id: user.profile.profile_id,
                        address_name: req.body.address_name,
                        address_contact: req.body.address_contact,
                        country: req.body.country,
                        city: req.body.city,
                        street: req.body.street,
                        post_code: req.body.post_code,
                        lat: req.body.lat,
                        lng: req.body.lng,
                    },
                });
                return responseHandler_1.default.success(res, 201, 'add address success');
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'internal server error', error);
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
                return responseHandler_1.default.success(res, 201, 'update address success');
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'internal server error', error);
            }
        });
    }
    deleteAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, address_id } = req.params;
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        email,
                    },
                    include: {
                        profile: true,
                    },
                });
                if (!user) {
                    return responseHandler_1.default.error(res, 404, 'User not found');
                }
                yield prisma_1.default.address.update({
                    where: { address_id: parseInt(address_id) },
                    data: {
                        deleted_at: new Date().toISOString(),
                    },
                });
                return responseHandler_1.default.success(res, 200, 'Delete Address Success');
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'internal server error', error);
            }
        });
    }
}
exports.AddressController = AddressController;
