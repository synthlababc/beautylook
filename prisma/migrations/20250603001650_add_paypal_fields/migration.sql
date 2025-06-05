/*
  Warnings:

  - A unique constraint covering the columns `[paypalId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'unpaid',
ADD COLUMN     "paypalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paypalId_key" ON "Order"("paypalId");
