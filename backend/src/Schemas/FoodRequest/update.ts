import Joi from "joi";

export const updateFoodRequestSchema = Joi.object({
    address: Joi.string().min(15).max(200),
    quantity: Joi.number().min(1).max(500),
})
