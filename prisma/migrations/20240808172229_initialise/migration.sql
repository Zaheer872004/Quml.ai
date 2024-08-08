/*
  Warnings:

  - Added the required column `PhoneNo` to the `Recruiter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Recruiter` ADD COLUMN `PhoneNo` VARCHAR(191) NOT NULL;
