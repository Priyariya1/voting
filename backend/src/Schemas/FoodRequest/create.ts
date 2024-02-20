import Joi from "joi";

export const createFoodRequestSchema = Joi.object({
    address: Joi.string().min(15).max(200).required(),
    quantity: Joi.number().min(1).max(500).required(),
})
