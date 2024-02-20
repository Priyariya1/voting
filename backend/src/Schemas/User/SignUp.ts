import Joi from "joi";

export const signUpSchema = Joi.object<User.signUp>({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(8).max(50).required(),
    name: Joi.string().min(3).max(50).required(),
})
