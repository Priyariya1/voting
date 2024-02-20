import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../DB";
import { Exceptions } from "../Exceptions";
import { getUserByEmail, getUserByEmailAndUuid } from "../Repositories/User";
import { Jwt } from "../Services/jwt";

export async function authenticateWithJwt(request: Request, response: Response, next: NextFunction){

    try{

        const authToken = request.cookies.access_token as string;
        
        if(!authToken) throw Exceptions.authorizationHeaderMissing();
        
        const payload = Jwt.decode(authToken);

        if(!payload || typeof payload === 'string') throw Exceptions.unAuthorized();

        const {email,uuid,} = payload;

        const user = await getUserByEmailAndUuid(email,uuid);

        if(!user ) throw Exceptions.unAuthorized();

        request as unknown as Mutate<Request, { user: any }>

        //@ts-ignore
        request.user = user;

        return next()

    }catch(error:any){
        return response.status(error.statusCode ?? 401).send({ 
            error: { 
                code: error?.statusCode ?? 401,
                name: error.name,
                message: error.message
            }
        })
    }
}