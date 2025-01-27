/*
  Warnings:

  - You are about to drop the column `contract_address` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `token_id` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `token_url` on the `NFT` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "NFT_contract_address_token_id_key";

-- AlterTable
ALTER TABLE "NFT" DROP COLUMN "contract_address",
DROP COLUMN "token_id",
DROP COLUMN "token_url";
