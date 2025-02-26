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
exports.AddressController = void 0;
const client_1 = require("../../../../packages/database/src/client");
class AddressController {
    getAddresses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = "1";
            try {
                const profile = yield client_1.prisma.profile.findUnique({
                    where: { user_id: userId },
                });
                if (!profile)
                    return res.status(404).json({ error: "Profile not found" });
                const addresses = yield client_1.prisma.address.findMany({
                    where: { profile_id: profile.profile_id },
                });
                return res.status(200).json(addresses);
            }
            catch (error) {
                console.error("Get Addresses Error:", error);
                return res.status(500).json({ error: "Failed to fetch addresses" });
            }
        });
    }
}
exports.AddressController = AddressController;
