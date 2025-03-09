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
const findDistance_1 = require("../services/store/findDistance");
class AddressController {
    getAddresses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = res.locals.user;
                if (!userId) {
                    return responseHandler_1.default.error(res, 404, 'user not found');
                }
                const profile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: userId.id },
                    include: {
                        Address: true,
                    },
                });
                if (!profile) {
                    return responseHandler_1.default.error(res, 404, 'profile not found');
                }
                const { Address: addresses } = profile;
                // const addresses = await prisma.address.findMany({
                //   where: { profile_id: profile.profile_id },
                // });
                return responseHandler_1.default.success(res, 200, 'get address success', addresses);
            }
            catch (error) {
                console.error('Get Addresses Error:', error);
                return res.status(500).json({ error: 'Failed to fetch addresses' });
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
                    data: {
                        address_name: req.body.address_name,
                        address_contact: req.body.address_contact,
                        country: req.body.country,
                        city: req.body.city,
                        street: req.body.city,
                        post_code: req.body.post_code,
                        lat: req.body.lat,
                        lng: req.body.lng,
                    },
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
                const { address_id } = req.params;
                const authUser = res.locals.user;
                const profile = yield prisma_1.default.profile.findUnique({
                    where: {
                        user_id: authUser.id,
                    },
                });
                if (!profile) {
                    return responseHandler_1.default.error(res, 404, 'User not found');
                }
                yield prisma_1.default.address.update({
                    where: {
                        address_id: parseInt(address_id),
                        profile_id: profile.profile_id,
                    },
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
    getAddressDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address_id } = req.params;
                const authUser = res.locals.user;
                const profile = yield prisma_1.default.profile.findUnique({
                    where: {
                        user_id: authUser.id,
                    },
                });
                if (!profile) {
                    return responseHandler_1.default.error(res, 404, 'User not found');
                }
                const address = yield prisma_1.default.address.findUnique({
                    where: { address_id: parseInt(address_id) },
                });
                return responseHandler_1.default.success(res, 200, 'Get Address Success', address);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'internal server error', error);
            }
        });
    }
    getOngkir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address_id, store_id } = req.body;
                const address = yield prisma_1.default.address.findUnique({
                    where: {
                        address_id,
                    },
                });
                const store = yield prisma_1.default.store.findUnique({
                    where: { store_id },
                });
                const distance = (0, findDistance_1.findDistance)(address === null || address === void 0 ? void 0 : address.lat, store === null || store === void 0 ? void 0 : store.lat, address === null || address === void 0 ? void 0 : address.lng, store === null || store === void 0 ? void 0 : store.lng);
                if (distance > 40) {
                    return responseHandler_1.default.error(res, 403, 'Loaction too far');
                }
                const ongkir = [
                    {
                        courier: 'jnt',
                        cost: distance ? Math.round(distance * 2000) : 15000,
                        estimate: Math.round(distance / 50) * 60,
                    },
                    {
                        courier: 'sicepat',
                        cost: distance ? Math.round(distance * 1900) : 13000,
                        estimate: Math.round(distance / 45) * 60,
                    },
                    {
                        courier: 'jne',
                        cost: distance ? Math.round(distance * 1950) : 14000,
                        estimate: Math.round(distance / 50) * 60,
                    },
                ];
                return responseHandler_1.default.success(res, 200, 'Get Address Success', ongkir);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'internal server error', error);
            }
        });
    }
}
exports.AddressController = AddressController;
