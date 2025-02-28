-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_referred_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "referred_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_referred_id_fkey" FOREIGN KEY ("referred_id") REFERENCES "referral"("referral_id") ON DELETE SET NULL ON UPDATE CASCADE;
