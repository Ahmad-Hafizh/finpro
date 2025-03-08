import { Request, Response } from "express";
import prisma from "../prisma";
import ResponseHandler from "../utils/responseHandler";
import { findAdmin } from "../services/admin/getAdmin.services";
import { hashPassword } from "../utils/hashPassword";
import { findUser } from "../utils/findUser";

export class AdminController {
  async getAdmin(req: Request, res: Response): Promise<any> {
    try {
      const { storeNew, page, keywordNew } = req.query;
      const pageNumber = parseInt(page as string) || 1;
      const pageSize = 6;
      const store = storeNew as string;
      const keyword = keywordNew as string;
      const objectP = { store, pageNumber, pageSize, keyword };

      const result = await findAdmin(objectP);

      return ResponseHandler.success(
        res,
        200,
        "Get Admin Data Success",
        result
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server Error", error);
    }
  }

  async updateAdmin(req: Request, res: Response): Promise<any> {
    try {
      const { admin_id, store_id, position } = req.body;
      const checkAdmin = await prisma.admin.findUnique({
        where: { admin_id: parseInt(admin_id) },
      });

      if (!checkAdmin) {
        throw new Error("Admin not found");
      }

      const result = await prisma.admin.update({
        where: {
          admin_id,
        },
        data: {
          position: position as string,
          store_id: parseInt(store_id) as number,
        },
      });

      return ResponseHandler.success(res, 200, "Update admin success", result);
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server error", error);
    }
  }

  async createAdmin(req: Request, res: Response): Promise<any> {
    try {
      const { email, name, password, store_id, phone, position } = req.body;

      const user = await findUser(email);
      if (user) return ResponseHandler.error(res, 404, "Email already used");

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: await hashPassword(password),
          role: "admin",
          emailVerified: new Date().toISOString(),
        },
      });

      await prisma.admin.create({
        data: {
          user_id: newUser.id,
          phone,
          store_id: parseInt(store_id),
          position,
        },
      });
      return ResponseHandler.success(res, 200, "Create Admin Success");
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server Error", error);
    }
  }

  async assignStoreAdmin(req: Request, res: Response): Promise<any> {
    try {
      const { admin_id, store_id } = req.body;

      await prisma.admin.update({
        where: { admin_id },
        data: { store_id },
      });

      return ResponseHandler.success(res, 200, "Assign Admin Success");
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server Error", error);
    }
  }

  async checkAdminDetailRoleFromFrontend(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { admin_id, email } = req.body;

      let result = [];

      if (admin_id) {
        const getAdminInfo = await prisma.admin.findFirst({
          where: {
            ...(admin_id ? { admin_id: admin_id } : {}),
          },
        });

        result.push(getAdminInfo);
      }

      if (email) {
        const getAdminInfoByEmail = await prisma.admin.findFirst({
          where: {
            user: {
              email: email,
            },
          },
          include: {
            user: true,
            store: true,
          },
        });

        if (!getAdminInfoByEmail) {
          const getSuperAdminByEmail = await prisma.user.findFirst({
            where: {
              email: email,
            },
          });
          result.push(getSuperAdminByEmail);
        }

        result.push(getAdminInfoByEmail);
      }

      return ResponseHandler.success(res, 200, "Get Admin success", result);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async deleteAdmin(req: Request, res: Response): Promise<any> {
    try {
      const { admin_id } = req.body;
      const deleteAdmin = await prisma.admin.update({
        where: {
          admin_id: parseInt(admin_id as string),
        },
        data: {
          deleted_at: new Date(),
        },
      });

      return ResponseHandler.success(
        res,
        200,
        "Delete admin success",
        deleteAdmin
      );
    } catch (error) {
      console.log("Ini error: ", error);
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }
}
