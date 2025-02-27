-- DropForeignKey
ALTER TABLE "_UserVouchers" DROP CONSTRAINT "_UserVouchers_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserVouchers" DROP CONSTRAINT "_UserVouchers_B_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "product_description" TEXT;

-- AddForeignKey
ALTER TABLE "_UserVouchers" ADD CONSTRAINT "_UserVouchers_A_fkey" FOREIGN KEY ("A") REFERENCES "voucher_store"("voucher_store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserVouchers" ADD CONSTRAINT "_UserVouchers_B_fkey" FOREIGN KEY ("B") REFERENCES "profile"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;
