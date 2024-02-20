import { NextFunction, Request, Response } from "express";
import { Exceptions } from "../Exceptions";


export const PayloadErrorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:
    try {

        //@ts-ignore
        if (error instanceof SyntaxError && error?.status === 400 && 'body' in error) {
            console.error(error);
 

            Exceptions.unProcessableEntry()
        }
    } catch (err) {

        ExceptionHandler(err,request,response,next);
    }

    next();
}


export const ExceptionHandler = (_error: any, _request: Request, _response: Response, _next: NextFunction)=>{
    try { 
        console.log(_error)
        const newError: ErrorResponseType = { 
            code: _error?.statusCode ?? 400,
            name: _error.name,
            message: _error.message
        }
    
        console.log({ newError })

        _response.status(_error?.statusCode ?? 400).send({ error: newError })

    } catch (err) { 
        _response.send(400).send({ error: { message: "unhandled error!..." } })
    }


}