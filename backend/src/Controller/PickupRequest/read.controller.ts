import { NextFunction, Request, Response } from 'express';
import { PickupRequestRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';
import { getRequestById, getRequestsByUserId } from '../../Repositories/PickupRequest';


export async function readPickupRequests(request: Request, response: Response, next: NextFunction) {
    try {

        const newRequest = request as unknown as AuthRequest<Request, PickupRequest.createPayload>

        const { user } = newRequest;

        const { pickupId } = request.params;

        const singlePickup = await isPickupRequestIdValid(pickupId, user)

        const pickup = !pickupId ? await getRequestsByUserId(user.id) : singlePickup;

        response.json(pickup);
    } catch (err) {

        next(err);
    }

}

async function isPickupRequestIdValid(pickupId: string, user: User.user) {

    

    if (!pickupId ) return true;

    if (!Number(pickupId)) throw Exceptions.invalidRequest('Pickup request Id must be number')

    const pickup = await getRequestById(Number(pickupId));

    if (!pickup || pickup.user_id !== user.id) throw Exceptions.invalidRequest('Invalid Pickup id');

    return pickup;
}