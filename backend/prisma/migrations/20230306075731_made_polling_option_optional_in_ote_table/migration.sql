-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "electionId" INTEGER NOT NULL,
    "optionId" INTEGER,
    CONSTRAINT "Vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "PollingOptions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vote" ("electionId", "id", "optionId", "user_id") SELECT "electionId", "id", "optionId", "user_id" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
CREATE UNIQUE INDEX "Vote_user_id_electionId_key" ON "Vote"("user_id", "electionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
