"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDistance = void 0;
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
exports.findDistance = findDistance;
