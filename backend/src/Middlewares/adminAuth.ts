import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../DB";
import { Exceptions } from "../Exceptions";
import { getUserByEmail, getUserByEmailAndUuid } from "../Repositories/User";
import { Jwt } from "../Services/jwt";

export async function authenticateAdmin(request: Request, response: Response, next: NextFunction){

    try{

        const newRequest = request as unknown as AuthRequest<Request, PickupRequest.createPayload>

        const {user} = newRequest
        if(user.role !== 'admin') throw Exceptions.unAuthorized(`You don't have access to this resources. `);

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