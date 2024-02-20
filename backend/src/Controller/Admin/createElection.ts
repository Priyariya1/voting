import { NextFunction, Request, Response } from 'express';
import { ElectionOptionRepository, ElectionRepository, PickupRequestRepository } from '../../DB';


export async function createElection(request: Request, response: Response, next: NextFunction) {

    const newRequest = request as unknown as AuthRequest<Request, Election.createPayload>

    const { user } = newRequest;

    const { description, options, title,endTime,startTime } = newRequest.body;



    const newElection = await ElectionRepository.create({
        data: { title, description, status: 'active', user_id: user.id }
    })

    const newOptions = options.map(async (option) => {

        const data = {
            title: option.title,
            description: option.description,
            pollId: newElection.id,
            startingDate : startTime, 
            endingDate : endTime, 
        }
        return await ElectionOptionRepository.create({ data })
    })

    await Promise.allSettled(newOptions);

    return response.send(newElection)


}