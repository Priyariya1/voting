import Joi from "joi";

export const updateFoodRequestSchema = Joi.object({
    status: Joi.string().required().valid('completed', 'pending', 'failed', 'rejected', 'cancelled'),
})

export const createElectionOptionsSchema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(5).required(),
})
export const updateElectionOptionsSchema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(5).required(),
    id: Joi.number()

})

export const createElectionSchema = Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(5).required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    options: Joi.array().items(createElectionOptionsSchema).required(),
})

export const updateElectionSchema = Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(5).required(),
    options: Joi.array().items(updateElectionOptionsSchema).required(),
    status: Joi.string().required().valid('pending', 'active', 'completed', 'canceled')

})

export const createVoteSchema = Joi.object({
    electionId: Joi.number().min(1).required(),
    optionId: Joi.number().min(1).required(),
})