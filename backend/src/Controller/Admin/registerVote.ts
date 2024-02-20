import { NextFunction, Request, Response } from 'express';
import { ElectionOptionRepository, ElectionRepository, PickupRequestRepository, VoteRepository } from '../../DB';


export async function registerVote(request: Request, response: Response, next: NextFunction) {

    const newRequest = request as unknown as AuthRequest<Request, Election.createVote>

    const { user } = newRequest;

    const { electionId, optionId } = newRequest.body;

    try {


        const newVote = await VoteRepository.create({
            data: { user_id: user.id, electionId, optionId }
        })

        return response.send(newVote)
    } catch (err) {
        next(err);
    }

}