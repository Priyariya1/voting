import Joi from "joi";

export const loginSchema = Joi.object<User.login>({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(8).max(50).required(),
})
