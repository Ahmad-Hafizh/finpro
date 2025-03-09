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
exports.StoreController = void 0;
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const prisma_1 = __importDefault(require("../prisma"));
const findDistance_1 = require("../services/store/findDistance");
class StoreController {
    getAllStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stores = yield prisma_1.default.store.findMany();
                return responseHandler_1.default.success(res, 200, "get all store succeed", stores);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "server error", error);
            }
        });
    }
    getStoreByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield prisma_1.default.store.findUnique({
                    where: { store_name: req.body.store_name },
                });
                if (!store)
                    return responseHandler_1.default.error(res, 404, "store not found");
                return responseHandler_1.default.success(res, 200, "get store succeed", store);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "server error", error);
            }
        });
    }
    findNearestStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lat, lng } = req.query;
                if (!lat && !lng) {
                    const mainStore = yield prisma_1.default.store.findUnique({
                        where: {
                            store_id: 8,
                        },
                    });
                    return responseHandler_1.default.success(res, 200, "get main store success", Object.assign(Object.assign({}, mainStore), { distance: 999 }));
                }
                const stores = yield prisma_1.default.store.findMany({ where: { isActive: true } });
                const storesDistanceData = stores.map((e) => {
                    const d = (0, findDistance_1.findDistance)(lat, e.lat, lng, e.lng);
                    return Object.assign(Object.assign({}, e), { distance: d });
                });
                const nearest = storesDistanceData.sort((a, b) => a.distance - b.distance)[0];
                return responseHandler_1.default.success(res, 200, "get nearest store succeed", nearest);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "server error", error);
            }
        });
    }
    createStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_name, store_address, city, lat, lng, country } = req.body;
                yield prisma_1.default.store.create({
                    data: {
                        store_name,
                        store_address,
                        city,
                        country,
                        lat,
                        lng,
                    },
                });
                return responseHandler_1.default.success(res, 200, "create store success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "server error", error);
            }
        });
    }
    deleteStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id } = req.params;
                yield prisma_1.default.store.update({
                    where: {
                        store_id: parseInt(store_id),
                    },
                    data: {
                        isActive: false,
                    },
                });
                return responseHandler_1.default.success(res, 200, "delete store success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "server error", error);
            }
        });
    }
    updateStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id } = req.body;
                yield prisma_1.default.store.update({
                    where: {
                        store_id,
                    },
                    data: {
                        store_name: req.body.store_name,
                        store_address: req.body.store_address,
                        country: req.body.country,
                        city: req.body.city,
                        lat: req.body.lat,
                        lng: req.body.lng,
                    },
                });
                return responseHandler_1.default.success(res, 200, "Update store success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "server error", error);
            }
        });
    }
    getStoreDistance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id, lat, lng } = req.body;
                const store = yield prisma_1.default.store.findUnique({
                    where: { store_id },
                });
                if (!store) {
                    return responseHandler_1.default.error(res, 404, "store not found");
                }
                const distance = (0, findDistance_1.findDistance)(lat, store === null || store === void 0 ? void 0 : store.lat, lng, store === null || store === void 0 ? void 0 : store.lng);
                return responseHandler_1.default.success(res, 200, "get store distance success", Object.assign(Object.assign({}, store), { distance }));
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "server error", error);
            }
        });
    }
    getStoreById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id } = req.body;
                const getStoreName = yield prisma_1.default.store.findFirst({
                    where: {
                        store_id: parseInt(store_id),
                    },
                });
                return responseHandler_1.default.success(res, 200, "Get store success", getStoreName);
            }
            catch (error) {
                console.log("Error : ", error);
                return responseHandler_1.default.error(res, 500, "internal server error");
            }
        });
    }
}
exports.StoreController = StoreController;
