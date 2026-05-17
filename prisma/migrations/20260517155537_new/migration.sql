/*
  Warnings:

  - Made the column `signature` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "signature" TEXT NOT NULL,
    "date" TEXT,
    "profileImage" TEXT,
    "pseudonym" TEXT NOT NULL,
    "isImageSignature" BOOLEAN NOT NULL DEFAULT false,
    "isTextSignature" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("date", "id", "isImageSignature", "isTextSignature", "profileImage", "pseudonym", "signature", "userId") SELECT "date", "id", "isImageSignature", "isTextSignature", "profileImage", "pseudonym", "signature", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
