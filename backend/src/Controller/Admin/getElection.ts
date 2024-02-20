import { NextFunction, Request, Response } from 'express';
import { ElectionRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';
import { getAllPickups, getRequestById, getRequestsByUserId } from '../../Repositories/PickupRequest';


export async function getElection(request: Request, response: Response, next: NextFunction) {
    try {

        const { electionId } = request.params;

        await isPickupRequestIdValid(electionId)

        const election = await ElectionRepository.findFirst({
            where: { id: Number(electionId) },
            select: {
                id: true,
                createdAt: true,
                description: true,
                status: true,
                title: true,
                startingDate: true,
                endingDate: true,
                options: {
                    select: {
                        id: true,
                        description: true,
                        title: true,

                        _count: {
                            select: {
                                vote: true
                            }
                        }
                    }
                },

                _count: {
                    select: {
                        vote: true,
                    }
                }
            }
        })

        return response.json(election)

    } catch (err) {

        next(err);
    }

}

async function isPickupRequestIdValid(pickupId: string,) {


    if (!pickupId) throw Exceptions.invalidRequest('Pickup request Id must be number');

    if (!Number(pickupId)) throw Exceptions.invalidRequest('Pickup request Id must be number')

    const pickup = await ElectionRepository.findFirst({ where: { id: Number(pickupId) } });

    return pickup;
}