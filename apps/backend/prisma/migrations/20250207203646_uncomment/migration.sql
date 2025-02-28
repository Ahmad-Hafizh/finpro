-- AlterTable
ALTER TABLE "user" ADD COLUMN     "referred_id" INTEGER;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_referred_id_fkey" FOREIGN KEY ("referred_id") REFERENCES "referral"("referral_id") ON DELETE SET NULL ON UPDATE CASCADE;
