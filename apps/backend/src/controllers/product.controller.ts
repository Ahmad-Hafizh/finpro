import { Request, Response } from "express";
import prisma from "../prisma";
import ResponseHandler from "../utils/responseHandler";
import { findProduct } from "../services/product/getProduct.services";
import { createProduct } from "../services/product/createProduct.services";
import { deleteProduct } from "../services/product/deleteProduct.services";
import { findDetailedProduct } from "../services/product/getDetailedProduct.services";
import { uploadImage } from "../utils/cloudinary";
import { findProductDropdown } from "../services/product/getProductDropdown.services";

export class ProductController {
  async getProduct(req: Request, res: Response): Promise<any> {
    try {
      const { page, search, cat, sort, del, store } = req.query;
      const pageNumber = parseInt(page as string) || 1;
      const pageSize = 8;
      const category = cat as string;
      const keyword = search as string;
      const sortBy = sort as string;
      const deletedAt = del as string;
      const theStore = store as string;

      const objectPayload = {
        category,
        pageNumber,
        pageSize,
        keyword,
        sortBy,
        deletedAt,
        theStore,
      };

      const result = await findProduct(objectPayload);

      return ResponseHandler.success(
        res,
        200,
        "Get Product Data Success",
        result
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server Error", error);
    }
  }

  async getLandingProduct(req: Request, res: Response): Promise<any> {
    try {
      const recommend = await prisma.orderItem.groupBy({
        by: ["product_id"],
        orderBy: {
          _count: { order_id: "desc" },
        },
      });
      console.log("recommend", recommend);
      const productsId = recommend.map((p) => p.product_id);
      const product = await prisma.product.findMany({
        where: {
          product_id: { in: productsId },
        },
        take: 20,
      });
      const categoryProduct = await prisma.productCategory.findMany({
        include: {
          product: true,
        },
      });

      return ResponseHandler.success(res, 200, "Get landing products success", {
        recommend: product,
        category_product: categoryProduct,
      });
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server Error", error);
    }
  }

  async getProductDropdown(req: Request, res: Response): Promise<any> {
    try {
      const { page, search, cat, sort, del, store } = req.query;
      console.log(cat);
      const pageNumber = parseInt(page as string) || 1;
      const pageSize = 8;
      const category = cat as string;
      const keyword = search as string;
      const sortBy = sort as string;
      const deletedAt = del as string;
      const theStore = store as string;

      const objectPayload = {
        category,
        pageNumber,
        pageSize,
        keyword,
        sortBy,
        deletedAt,
        theStore,
      };

      const result = await findProductDropdown(objectPayload);

      return ResponseHandler.success(
        res,
        200,
        "Get Product Data Success",
        result
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server Error", error);
    }
  }

  async createProduct(req: Request, res: Response): Promise<any> {
    try {
      const name = req.body.product_name as string;
      const price = req.body.product_price as string;
      const description = req.body.product_description as string;
      const category = req.body.product_category as string;
      const images = req.body.product_image as string[];

      const user = res.locals.user;
      console.log("USER ", user);

      if (!req.files) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const image = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          const result = await uploadImage(file.path, "product_images");
          return result.secure_url;
        })
      );

      const objectPayload = { name, price, description, category, image };

      console.log("This is category :", category);
      const result = await createProduct(objectPayload);

      return ResponseHandler.success(
        res,
        200,
        "Create Product Success",
        result
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server Error", error);
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<any> {
    try {
      const product_id = req.body.product_id as string;
      console.log("INI PRODUCT ID :", product_id);
      const result = await deleteProduct({ product_id });
      return ResponseHandler.success(
        res,
        200,
        "Create Product Success",
        result
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server Error", error);
    }
  }

  async getDetailedProduct(req: Request, res: Response): Promise<any> {
    try {
      const { name } = req.params;
      const result = await findDetailedProduct({ name });
      return ResponseHandler.success(
        res,
        200,
        "Get detailed product success",
        result
      );
    } catch (error) {
      console.log("error from get detailed product", error);
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }
}
