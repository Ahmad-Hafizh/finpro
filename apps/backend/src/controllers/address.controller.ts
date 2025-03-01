import { Request, Response } from "express";
import prisma from "../prisma";
import ResponseHandler from "../utils/responseHandler";

export class AddressController {
  async getAddresses(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          profile: true,
        },
      });
      if (!user?.profile)
        return ResponseHandler.error(res, 404, "user not found");

      const addresses = await prisma.address.findMany({
        where: { profile_id: user.profile.profile_id, deleted_at: null },
      });

      return ResponseHandler.success(
        res,
        200,
        "get address success",
        addresses
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "internal server error", error);
    }
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
  async setDeliveryAddress(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          profile: true,
        },
      });

      await prisma.address.create({
        data: {
          ...req.body,
          profile_id: user?.profile?.profile_id,
        },
      });
      return ResponseHandler.success(res, 201, "add address success");
    } catch (error) {
      return ResponseHandler.error(res, 500, "internal server error", error);
    }
  }
  async updateDeliveryAddress(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          profile: true,
        },
      });

      await prisma.address.update({
        where: {
          address_id: req.body.address_id,
          profile_id: user?.profile?.profile_id,
          deleted_at: null,
        },
        data: {
          ...req.body,
        },
      });
      return ResponseHandler.success(res, 201, "update address success");
    } catch (error) {
      return ResponseHandler.error(res, 500, "internal server error", error);
    }
  }
  async deleteAddress(req: Request, res: Response): Promise<any> {
    try {
      const { email, address_id } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          profile: true,
        },
      });

      if (!user) {
        return ResponseHandler.error(res, 404, "User not found");
      }

      await prisma.address.update({
        where: { address_id },
        data: {
          deleted_at: new Date().toISOString(),
        },
      });

      return ResponseHandler.success(res, 200, "Delete Address Success");
    } catch (error) {
      return ResponseHandler.error(res, 500, "internal server error", error);
    }
  }
}
