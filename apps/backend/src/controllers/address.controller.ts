import { Request, Response } from "express";
import { prisma } from "../../../../packages/database/src/client";

export class AddressController {
  async getAddresses(req: Request, res: Response): Promise<any> {
    const userId = "1";
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const addresses = await prisma.address.findMany({
        where: { profile_id: profile.profile_id },
      });

      return res.status(200).json(addresses);
    } catch (error) {
      console.error("Get Addresses Error:", error);
      return res.status(500).json({ error: "Failed to fetch addresses" });
    }
  }
}
