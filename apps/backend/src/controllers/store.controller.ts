import { Request, Response, NextFunction } from "express";
import ResponseHandler from "../utils/responseHandler";
import prisma from "../prisma";
import { findDistance } from "../services/store/findDistance";

export class StoreController {
  async getAllStore(req: Request, res: Response): Promise<any> {
    try {
      const stores = await prisma.store.findMany();
      return ResponseHandler.success(res, 200, "get all store succeed", stores);
    } catch (error) {
      return ResponseHandler.error(res, 500, "server error", error);
    }
  }
  async getStoreByName(req: Request, res: Response): Promise<any> {
    try {
      const store = await prisma.store.findUnique({
        where: { store_name: req.body.store_name },
      });

      if (!store) return ResponseHandler.error(res, 404, "store not found");

      return ResponseHandler.success(res, 200, "get store succeed", store);
    } catch (error) {
      return ResponseHandler.error(res, 500, "server error", error);
    }
  }
  async findNearestStore(req: Request, res: Response): Promise<any> {
    try {
      const { lat, lng } = req.query;
      if (!lat && !lng) {
        const mainStore = await prisma.store.findUnique({
          where: {
            store_id: 8,
          },
        });

        return ResponseHandler.success(res, 200, "get main store success", {
          ...mainStore,
          distance: 999,
        });
      }

      const stores = await prisma.store.findMany({ where: { isActive: true } });

      const storesDistanceData = stores.map((e) => {
        const d = findDistance(lat, e.lat, lng, e.lng);

        return { ...e, distance: d };
      });

      const nearest = storesDistanceData.sort(
        (a, b) => a.distance - b.distance
      )[0];

      return ResponseHandler.success(
        res,
        200,
        "get nearest store succeed",
        nearest
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "server error", error);
    }
  }

  async createStore(req: Request, res: Response): Promise<any> {
    try {
      const { store_name, store_address, city, lat, lng, country } = req.body;

      await prisma.store.create({
        data: {
          store_name,
          store_address,
          city,
          country,
          lat,
          lng,
        },
      });

      return ResponseHandler.success(res, 200, "create store success");
    } catch (error) {
      return ResponseHandler.error(res, 500, "server error", error);
    }
  }

  async deleteStore(req: Request, res: Response): Promise<any> {
    try {
      const { store_id } = req.params;

      await prisma.store.update({
        where: {
          store_id: parseInt(store_id),
        },
        data: {
          isActive: false,
        },
      });
      return ResponseHandler.success(res, 200, "delete store success");
    } catch (error) {
      return ResponseHandler.error(res, 500, "server error", error);
    }
  }

  async updateStore(req: Request, res: Response): Promise<any> {
    try {
      const { store_id } = req.body;

      await prisma.store.update({
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
      return ResponseHandler.success(res, 200, "Update store success");
    } catch (error) {
      return ResponseHandler.error(res, 500, "server error", error);
    }
  }
  async getStoreDistance(req: Request, res: Response): Promise<any> {
    try {
      const { store_id, lat, lng } = req.body;

      const store = await prisma.store.findUnique({
        where: { store_id },
      });

      if (!store) {
        return ResponseHandler.error(res, 404, "store not found");
      }
      const distance = findDistance(lat, store?.lat, lng, store?.lng);

      return ResponseHandler.success(res, 200, "get store distance success", {
        ...store,
        distance,
      });
    } catch (error) {
      return ResponseHandler.error(res, 500, "server error", error);
    }
  }

  async getStoreById(req: Request, res: Response): Promise<any> {
    try {
      const { store_id } = req.body;
      const getStoreName = await prisma.store.findFirst({
        where: {
          store_id: parseInt(store_id as string),
        },
      });
      return ResponseHandler.success(
        res,
        200,
        "Get store success",
        getStoreName
      );
    } catch (error) {
      console.log("Error : ", error);
      return ResponseHandler.error(res, 500, "internal server error");
    }
  }
}
