/*
  Warnings:

  - You are about to drop the column `company` on the `Recruiter` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Recruiter` table. All the data in the column will be lost.
  - Added the required column `fieldOfInterest` to the `Recruiter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `Recruiter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Recruiter` DROP COLUMN `company`,
    DROP COLUMN `position`,
    ADD COLUMN `fieldOfInterest` ENUM('FRONTEND', 'BACKEND', 'FULLSTACK', 'AIML', 'DEVOPS', 'SOFTWARE_DEVELOPER_ENGINEER', 'OTHER') NOT NULL,
    ADD COLUMN `industry` VARCHAR(191) NOT NULL,
    MODIFY `amount` DOUBLE NULL;
