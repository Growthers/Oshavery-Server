/*
  Warnings:

  - You are about to alter the column `size` on the `media` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to drop the column `guild_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `guildsId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guild_id]` on the table `media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[message_id]` on the table `media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sub]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `latest_message_id` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `guilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullpath` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guild_id` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message_id` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_key` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- AlterTable
ALTER TABLE `channels` ADD COLUMN `latest_message_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `guilds` ADD COLUMN `icon` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `media` ADD COLUMN `fullpath` VARCHAR(191) NOT NULL,
    ADD COLUMN `guild_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `message_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    MODIFY `size` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `guild_id`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `guildsId` VARCHAR(191),
    MODIFY `content` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `guildsId`,
    ADD COLUMN `avatarurl` VARCHAR(191),
    ADD COLUMN `password` VARCHAR(191),
    ADD COLUMN `private_key` VARCHAR(191),
    ADD COLUMN `public_key` VARCHAR(191) NOT NULL,
    ADD COLUMN `sub` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `user_token` (
    `token` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `media.guild_id_unique` ON `media`(`guild_id`);

-- CreateIndex
CREATE UNIQUE INDEX `media_message_id_unique` ON `media`(`message_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users.sub_unique` ON `users`(`sub`);

-- AddForeignKey
ALTER TABLE `messages` ADD FOREIGN KEY (`guildsId`) REFERENCES `guilds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD FOREIGN KEY (`message_id`) REFERENCES `messages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_token` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
