-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_store_id_fkey";

-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "store_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE SET NULL ON UPDATE CASCADE;
