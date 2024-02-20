import { NextFunction, Request, Response } from 'express';
import Joi, { number } from 'joi';
import { ElectionOptionRepository, ElectionRepository, PickupRequestRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';

export async function deleteOption(request: Request, response: Response, next: NextFunction) {
    try {

        const newRequest = request as unknown as AuthRequest<Request, Election.updatePayload>


        const { optionId } = newRequest.params;

        await ElectionOptionRepository.delete({
            where: {
                id: Number(optionId)
            }
        })

        response.json({status : 'success'})
    } catch (err) {
        next(err);

    }
}