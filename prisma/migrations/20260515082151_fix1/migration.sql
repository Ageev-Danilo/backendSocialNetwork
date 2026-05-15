-- CreateTable
CREATE TABLE "_PostLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PostViews" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostViews_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostViews_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostLikes_AB_unique" ON "_PostLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_PostLikes_B_index" ON "_PostLikes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostViews_AB_unique" ON "_PostViews"("A", "B");

-- CreateIndex
CREATE INDEX "_PostViews_B_index" ON "_PostViews"("B");
