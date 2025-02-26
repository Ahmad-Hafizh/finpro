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
const client_1 = require("../../../../packages/database/src/client");
class StoreController {
    findNearestStore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lat, lng } = req.query;
                if (!lat && !lng) {
                    const mainStore = yield client_1.prisma.store.findUnique({
                        where: { store_id: 12, city: 'jakarta', lat: '-6.980870', lng: '108.477570' },
                    });
                    return responseHandler_1.default.success(res, 200, 'get main store success', Object.assign(Object.assign({}, mainStore), { distance: 999 }));
                }
                const stores = yield client_1.prisma.store.findMany();
                const findDistance = (lat1, lat2, lng1, lng2) => {
                    const radius = 6371;
                    const radians1 = (parseInt(lat1) * Math.PI) / 180;
                    const radians2 = (parseInt(lat2) * Math.PI) / 180;
                    const deltaLat = ((parseInt(lat2) - parseInt(lat1)) * Math.PI) / 180;
                    const deltaLng = ((parseInt(lng2) - parseInt(lng1)) * Math.PI) / 180;
                    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(radians1) * Math.cos(radians2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const d = radius * c;
                    return d;
                };
                const storesDistanceData = stores.map((e) => {
                    const d = findDistance(lat, e.lat, lng, e.lng);
                    return Object.assign(Object.assign({}, e), { distance: d });
                });
                const nearest = storesDistanceData.sort((a, b) => a.distance - b.distance)[0];
                return responseHandler_1.default.success(res, 200, 'get nearest store succeed', nearest);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'server error', error);
            }
        });
    }
}
exports.StoreController = StoreController;
