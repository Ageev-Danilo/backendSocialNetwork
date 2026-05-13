/*
  Warnings:

  - You are about to drop the `_PostAlbums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostViews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PostAlbums";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PostLikes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PostViews";
PRAGMA foreign_keys=on;
