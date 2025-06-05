-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amountPaid" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "transactionId" TEXT;
