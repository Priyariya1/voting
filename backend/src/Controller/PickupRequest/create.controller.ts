import { NextFunction, Request, Response } from 'express';
import { PickupRequestRepository } from '../../DB';


export async function createPickupRequest(request: Request, response: Response, next: NextFunction) {

    const newRequest = request as unknown as AuthRequest<Request, PickupRequest.createPayload>
    
    const { address, quantity } = newRequest.body 

    const { user } = newRequest;

    const data = {
        address,
        quantity,
        status: 'pending',
        user_id: user.id
    }

   const newEntry =  await PickupRequestRepository.create({ data })


    response.send(newEntry)


}