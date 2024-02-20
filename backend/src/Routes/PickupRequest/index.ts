import { Router } from "express";
import { createPickupRequest } from "../../Controller/PickupRequest/create.controller";
import { cancelPickupRequest } from "../../Controller/PickupRequest/delete.controller";
import { readPickupRequests } from "../../Controller/PickupRequest/read.controller";
import { test } from "../../Controller/PickupRequest/test";
import { updatePickupRequest } from "../../Controller/PickupRequest/update.controller";
import { authenticateWithJwt } from "../../Middlewares/jwtAuth";
import { validateRequestPayload } from "../../Middlewares/validateRequestPayload";
import { createFoodRequestSchema } from "../../Schemas/FoodRequest/create";
import { updateFoodRequestSchema } from "../../Schemas/FoodRequest/update";


export const PickupRequestRouter = Router();


PickupRequestRouter.post('/', authenticateWithJwt, validateRequestPayload(createFoodRequestSchema), createPickupRequest);

PickupRequestRouter.patch('/:pickupId', authenticateWithJwt, validateRequestPayload(updateFoodRequestSchema), updatePickupRequest);

PickupRequestRouter.get('/', authenticateWithJwt, readPickupRequests);

PickupRequestRouter.get('/test', authenticateWithJwt, test);

PickupRequestRouter.get('/:pickupId', authenticateWithJwt, readPickupRequests);

PickupRequestRouter.delete('/:pickupId', authenticateWithJwt, cancelPickupRequest);

