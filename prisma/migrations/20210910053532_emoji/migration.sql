/*
  Warnings:

  - You are about to drop the column `channelsId` on the `invitations` table. All the data in the column will be lost.
  - You are about to drop the column `guildsId` on the `invitations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `invitations` DROP FOREIGN KEY `invitations_ibfk_2`;

-- DropForeignKey
ALTER TABLE `invitations` DROP FOREIGN KEY `invitations_ibfk_1`;

-- AlterTable
ALTER TABLE `channels` ADD COLUMN `guildId` VARCHAR(191);

-- AlterTable
ALTER TABLE `invitations` DROP COLUMN `channelsId`,
    DROP COLUMN `guildsId`,
    ADD COLUMN `channelId` VARCHAR(191),
    ADD COLUMN `guildId` VARCHAR(191);

-- CreateTable
CREATE TABLE `emojis` (
    `id` VARCHAR(191) NOT NULL,
    `short_name` VARCHAR(191) NOT NULL,
    `media_id` VARCHAR(191) NOT NULL,
    `uploader_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3),
    `deleted_at` DATETIME(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mime` VARCHAR(191) NOT NULL,
    `size` BIGINT NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `channelId` VARCHAR(191),
    `uploaderId` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invitations` ADD FOREIGN KEY (`guildId`) REFERENCES `guilds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invitations` ADD FOREIGN KEY (`channelId`) REFERENCES `channels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channels` ADD FOREIGN KEY (`guildId`) REFERENCES `guilds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD FOREIGN KEY (`channelId`) REFERENCES `channels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD FOREIGN KEY (`uploaderId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
