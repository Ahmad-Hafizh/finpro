-- AlterTable
ALTER TABLE "product" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "product_category" ADD COLUMN     "deletedAt" TIMESTAMP(3);
