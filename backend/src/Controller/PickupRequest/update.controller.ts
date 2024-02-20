import { NextFunction, Request, Response } from 'express';
import { PickupRequestRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';


export async function updatePickupRequest(request: Request, response: Response, next: NextFunction) {

    const newRequest = request as unknown as AuthRequest<Request, PickupRequest.createPayload>

    const { pickupId } = request.params;
    try {

        if (!pickupId) throw Exceptions.invalidRequest('Pickup id is missing.')
        
        if (!Number(pickupId)) throw Exceptions.invalidRequest('Pickup id must be a number.')

        const existingRequest = await PickupRequestRepository.findFirst({
            where :{ id: Number(pickupId)}
        })

        if(!existingRequest) throw Exceptions.invalidRequest(`No pickup request with id ${pickupId} is found!`)

        const { address, quantity } = newRequest.body

        if(!address && !quantity) throw Exceptions.invalidRequest('Both address and quantity cant be empty')

        const { user } = newRequest;

        if(user.id !== existingRequest.user_id) throw Exceptions.invalidRequest('No such request with given id exist in your account')

        const data = {} as any;

        address ? data.address = address : '';
        
        quantity ? data.quantity = quantity : '';

        const newEntry = await PickupRequestRepository.update({ data, where : { id : Number(pickupId)} })

        response.send(newEntry)

    }
    catch (err) {
        next(err);
    }


}