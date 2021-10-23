/*
  Warnings:

  - You are about to drop the `user_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_token` DROP FOREIGN KEY `user_token_ibfk_1`;

-- DropTable
DROP TABLE `user_token`;
