-- DropForeignKey
ALTER TABLE "referral" DROP CONSTRAINT "referral_user_id_fkey";

-- AlterTable
ALTER TABLE "referral" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "referral" ADD CONSTRAINT "referral_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
