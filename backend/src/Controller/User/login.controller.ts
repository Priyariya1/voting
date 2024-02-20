import { CookieOptions, NextFunction, Request, Response } from 'express';
import { Config } from '../../Config';
import { Exceptions } from '../../Exceptions';
import { getUserByEmail } from '../../Repositories/User';
import { Jwt } from '../../Services/jwt';

export async function login(request: Mutate<Request, { body: User.login }>, response: Response, next: NextFunction) {

    const { email, password } = request.body;

    try {

        const existingUser = await getUserByEmail(email);

        if (existingUser === null) throw Exceptions.invalidRequest(`Invalid Email / Password, please try again.`);

        const { name, uuid } = existingUser;

        const authToken = Jwt.create({ email, name, uuid })

        const loginResponse = { authToken } as User.loginResponse



        response.cookie(Config.authCookieName, authToken, Config.authCookieOptions({ cookieForLogout: false, request }))

        return response.json(loginResponse);

    } catch (error) {
        return next(error)
    }

    response.json({ email, name, password })
}
