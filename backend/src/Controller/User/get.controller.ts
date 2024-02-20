import { CookieOptions, NextFunction, Request, Response } from 'express';
import { db } from '../../DB';
import { Exceptions } from '../../Exceptions';
import { getUserByEmail } from '../../Repositories/User';
import { Jwt } from '../../Services/jwt';

export async function getUser(request: Request ,response: Response, next: NextFunction) {

    const authRequest = request as unknown as AuthRequest<Request>;

    const {email,name,uuid,role} = authRequest.user;

    return response.json({email,name,uuid, role });
}
