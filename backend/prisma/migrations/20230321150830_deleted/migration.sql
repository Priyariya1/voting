-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Election" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startingDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endingDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Election_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Election" ("createdAt", "description", "endingDate", "id", "startingDate", "status", "title", "updatedAt", "user_id") SELECT "createdAt", "description", "endingDate", "id", "startingDate", "status", "title", "updatedAt", "user_id" FROM "Election";
DROP TABLE "Election";
ALTER TABLE "new_Election" RENAME TO "Election";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
