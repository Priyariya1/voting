import { NextFunction, Request, Response } from 'express';
import { ElectionRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';
import { getAllPickups, getRequestById, getRequestsByUserId } from '../../Repositories/PickupRequest';


export async function getElections(request: Request, response: Response, next: NextFunction) {
    try {



        const elections = await ElectionRepository.findMany({
            where:{
                //@ts-ignore
                deleted : false,
            },
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


        response.json(elections);

        // const { limit=500, offset = 0, status } = request.query as unknown as { limit: number, offset: number, status: string };


        // const pickups = await getAllPickups({ limit: Number(limit), offset: Number(offset), status })


        // // response.json(pickups);
        // response.send(pickups);



        // return

        // const newRequest = request as unknown as AuthRequest<Request, PickupRequest.createPayload>

        // const { user } = newRequest;

        // const { pickupId } = request.params;

        // const singlePickup = await isPickupRequestIdValid(pickupId, user)

        // const pickup = !pickupId ? await getRequestsByUserId(user.id) : singlePickup;

        // response.json(pickup);
    } catch (err) {

        next(err);
    }

}

// async function isPickupRequestIdValid(pickupId: string, user: User.user) {



//     if (!pickupId) return true;

//     if (!Number(pickupId)) throw Exceptions.invalidRequest('Pickup request Id must be number')

//     const pickup = await getRequestById(Number(pickupId));

//     if (!pickup || pickup.user_id !== user.id) throw Exceptions.invalidRequest('Invalid Pickup id');

//     return pickup;
// }