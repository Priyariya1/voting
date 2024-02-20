import { NextFunction, Request, Response } from 'express';
import { PickupRequestRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';


export async function cancelPickupRequest(request: Request, response: Response, next: NextFunction) {

    const newRequest = request as unknown as AuthRequest<Request>

    const { pickupId } = request.params;
    try {

        if (!pickupId) throw Exceptions.invalidRequest('Pickup id is missing.')
        
        if (!Number(pickupId)) throw Exceptions.invalidRequest('Pickup id must be a number.')

        const existingRequest = await PickupRequestRepository.findFirst({
            where :{ id: Number(pickupId)}
        })

        if(!existingRequest) throw Exceptions.invalidRequest(`No pickup request with id ${pickupId} is found!`)

        const data = {status : 'canceled'}

        const newEntry = await PickupRequestRepository.update({ data, where : { id : Number(pickupId)} })

        response.send(newEntry)

    }
    catch (err) {
        next(err);
    }


}