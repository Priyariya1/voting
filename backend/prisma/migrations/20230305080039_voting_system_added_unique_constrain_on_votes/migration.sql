/*
  Warnings:

  - A unique constraint covering the columns `[user_id,electionId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_user_id_electionId_key" ON "Vote"("user_id", "electionId");
