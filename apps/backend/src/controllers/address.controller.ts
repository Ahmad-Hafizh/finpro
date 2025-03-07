import { Request, Response } from 'express';
import prisma from '../prisma';
import ResponseHandler from '../utils/responseHandler';
import { findDistance } from '../services/store/findDistance';
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export class AddressController {
  async getAddresses(req: Request, res: Response): Promise<any> {
    try {
      const userId = res.locals.user;

      if (!userId) {
        return ResponseHandler.error(res, 404, 'user not found');
      }

      const profile = await prisma.profile.findUnique({
        where: { user_id: userId.id },
        include: {
          Address: true,
        },
      });

      if (!profile) {
        return ResponseHandler.error(res, 404, 'profile not found');
      }

      const { Address: addresses } = profile;

      // const addresses = await prisma.address.findMany({
      //   where: { profile_id: profile.profile_id },
      // });

      return ResponseHandler.success(res, 200, 'get address success', addresses);
    } catch (error) {
      console.error('Get Addresses Error:', error);
      return res.status(500).json({ error: 'Failed to fetch addresses' });
    }
  }

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

      if (!user?.profile?.profile_id) {
        return ResponseHandler.error(res, 400, 'user not found');
      }

      await prisma.address.create({
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
      return ResponseHandler.success(res, 201, 'add address success');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'internal server error', error);
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
      return ResponseHandler.success(res, 201, 'update address success');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'internal server error', error);
    }
  }
  async deleteAddress(req: Request, res: Response): Promise<any> {
    try {
      const { address_id } = req.params;
      const authUser = res.locals.user;

      const profile = await prisma.profile.findUnique({
        where: {
          user_id: authUser.id,
        },
      });

      if (!profile) {
        return ResponseHandler.error(res, 404, 'User not found');
      }

      await prisma.address.update({
        where: {
          address_id: parseInt(address_id),
          profile_id: profile.profile_id,
        },
        data: {
          deleted_at: new Date().toISOString(),
        },
      });

      return ResponseHandler.success(res, 200, 'Delete Address Success');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'internal server error', error);
    }
  }
  async getAddressDetail(req: Request, res: Response): Promise<any> {
    try {
      const { address_id } = req.params;
      const authUser = res.locals.user;

      const profile = await prisma.profile.findUnique({
        where: {
          user_id: authUser.id,
        },
      });

      if (!profile) {
        return ResponseHandler.error(res, 404, 'User not found');
      }

      const address = await prisma.address.findUnique({
        where: { address_id: parseInt(address_id) },
      });
      return ResponseHandler.success(res, 200, 'Get Address Success', address);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'internal server error', error);
    }
  }
  async getOngkir(req: Request, res: Response): Promise<any> {
    try {
      const { address_id, store_id } = req.body;
      const address = await prisma.address.findUnique({
        where: {
          address_id,
        },
      });

      const store = await prisma.store.findUnique({
        where: { store_id },
      });

      const distance = findDistance(address?.lat, store?.lat, address?.lng, store?.lng);

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

      return ResponseHandler.success(res, 200, 'Get Address Success', ongkir);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'internal server error', error);
    }
  }
}
