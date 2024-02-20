import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ElectionOptionRepository, ElectionRepository, PickupRequestRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';

export async function deleteElection(request: Request, response: Response, next: NextFunction) {
    try {

        const newRequest = request as unknown as AuthRequest<Request, Election.updatePayload>


        const { electionId } = newRequest.params;

        validatePickupId(electionId);

        const election = await ElectionOptionRepository.findFirst({ where: { id: Number(electionId) } });

        if (!election) throw Exceptions.invalidRequest('No Election found');

        const data = { deleted: true}

        //@ts-ignore
        const updated = await ElectionRepository.update({ where: { id: Number(electionId), },data });

        response.json(updated);

    } catch (err) {
        console.log(err)
        next(err);
    }
}

function validatePickupId(pickupId: string) {
    const schema = Joi.object({
        pickupId: Joi.number().required(),
    })

    const isValid = schema.validate({ pickupId }, {
        errors: {
            wrap: { label: "" }
        }
    })

    if (isValid.error?.details) throw Exceptions.invalidRequest('ElectionId must be valid')

}