import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../utils/responseHandler';
import { prisma } from '../../../../packages/database/src/client';

export class StoreController {
  async findNearestStore(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { lat, lng } = req.query;
      if (!lat && !lng) {
        const mainStore = await prisma.store.findUnique({
          where: { store_id: 12, city: 'jakarta', lat: '-6.980870', lng: '108.477570' },
        });

        return ResponseHandler.success(res, 200, 'get main store success', { ...mainStore, distance: 999 });
      }

      const stores = await prisma.store.findMany();

      const findDistance = (lat1: any, lat2: any, lng1: any, lng2: any) => {
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

        return { ...e, distance: d };
      });

      const nearest = storesDistanceData.sort((a, b) => a.distance - b.distance)[0];

      return ResponseHandler.success(res, 200, 'get nearest store succeed', nearest);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'server error', error);
    }
  }
}
