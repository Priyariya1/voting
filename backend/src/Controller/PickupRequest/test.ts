import { NextFunction, Request, Response } from 'express';
import { PickupRequestRepository, UsersRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';
import { getRequestById, getRequestsByUserId } from '../../Repositories/PickupRequest';


export async function test(request: Request, response: Response, next: NextFunction) {
    try {

        console.log(111111111)
        const newRequest = request as unknown as AuthRequest<Request, PickupRequest.createPayload>

        const { user } = newRequest;

        const users = await UsersRepository.findMany({
            select : {
                pickupRequests : true
            },
            where : {
                id : user.id
            }

        })

        response.json(users);
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