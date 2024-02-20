import { NextFunction, Request, Response } from "express";
import { Config } from "../../Config";

export async function logout(request: Request, response: Response, next: NextFunction) {

    // response.cookie(Config.authCookieName, '', Config.authCookieOptions({ cookieForLogout: true, request }))
    response.clearCookie(Config.authCookieName);
    response.send()
}
