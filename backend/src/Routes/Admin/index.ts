import { Router } from "express";
import { createElection } from "../../Controller/Admin/createElection";
import { deleteElection } from "../../Controller/Admin/delete";
import { deleteOption } from "../../Controller/Admin/deleteOption";
import { getElection } from "../../Controller/Admin/getElection";
import { getElections } from "../../Controller/Admin/getElections";
import { getVote } from "../../Controller/Admin/getUserVote";
import { registerVote } from "../../Controller/Admin/registerVote";
import { updateElection } from "../../Controller/Admin/updateElection";
import { createPickupRequest } from "../../Controller/PickupRequest/create.controller";
import { authenticateAdmin } from "../../Middlewares/adminAuth";
import { authenticateWithJwt } from "../../Middlewares/jwtAuth";
import { validateRequestPayload } from "../../Middlewares/validateRequestPayload";
import { createElectionSchema, createVoteSchema, updateElectionSchema, updateFoodRequestSchema } from "../../Schemas/Admin";


export const AdminRouter = Router();


AdminRouter.get('/elections', authenticateWithJwt, getElections);

AdminRouter.get('/elections/:electionId', authenticateWithJwt, getElection);

AdminRouter.get('/elections/:electionId/vote', authenticateWithJwt, getVote);

AdminRouter.post('/elections', authenticateWithJwt,authenticateAdmin,validateRequestPayload(createElectionSchema), createElection);

AdminRouter.post('/elections/vote', authenticateWithJwt,validateRequestPayload(createVoteSchema), registerVote);

AdminRouter.put('/elections/:electionId', authenticateWithJwt,authenticateAdmin, validateRequestPayload(updateElectionSchema), updateElection);

AdminRouter.delete('/elections/:electionId', authenticateWithJwt,authenticateAdmin,  deleteElection);

AdminRouter.delete('/elections/options/:optionId', authenticateWithJwt,authenticateAdmin, deleteOption);
