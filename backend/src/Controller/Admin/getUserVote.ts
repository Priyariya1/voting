import { NextFunction, Request, Response } from 'express';
import { ElectionRepository, VoteRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';


export async function getVote(request: Request, response: Response, next: NextFunction) {
    try {

        const { electionId } = request.params;

        const newRequest = request as unknown as AuthRequest<Request, Election.createVote>

        const { user } = newRequest;


        if (!electionId) throw Exceptions.invalidRequest('election id must be provided');

        const vote = await VoteRepository.findFirst({
            where: {
                user_id: user.id,
                electionId: Number(electionId)
            }
        })

        response.json(vote)

    } catch (err) {

    }
}