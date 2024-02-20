-- CreateTable
CREATE TABLE "Election" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Election_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PollingOptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "pollId" INTEGER NOT NULL,
    CONSTRAINT "PollingOptions_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Election" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "electionId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL,
    CONSTRAINT "Vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "PollingOptions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
