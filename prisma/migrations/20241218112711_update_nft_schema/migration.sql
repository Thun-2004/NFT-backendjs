/*
  Warnings:

  - You are about to drop the column `tag_id` on the `NFT` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NFT" DROP CONSTRAINT "NFT_tag_id_fkey";

-- AlterTable
ALTER TABLE "NFT" DROP COLUMN "tag_id",
ADD COLUMN     "volume" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "_NFTTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NFTTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NFTTags_B_index" ON "_NFTTags"("B");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NFTTags" ADD CONSTRAINT "_NFTTags_A_fkey" FOREIGN KEY ("A") REFERENCES "NFT"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NFTTags" ADD CONSTRAINT "_NFTTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
