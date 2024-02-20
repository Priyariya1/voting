import { NextFunction, Request, Response } from 'express';
import Joi from 'joi'


export const validateRequestPayload = (schema: Joi.ObjectSchema) => {

    return (request: Request, response: Response, next: NextFunction) => { 

    
        const isValid = schema.validate(request.body, { 
            errors:{  
                wrap: { label: "" } 
            } 
        })

        if (!isValid.error?.details) next() 
        else { 
            
            response.status(406).send({ 
                error: {
                    code:406,
                    name : 'Not Acceptable',
                    message: isValid.error?.details[0].message,
                    path: isValid.error?.details[0].path
                }
            })
        }
    }
}   