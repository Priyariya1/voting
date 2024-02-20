import dotenv from 'dotenv'
import { CookieOptions, Request } from 'express';
dotenv.config();

export class Config{
    
    static clientUrl = process.env.CLIENT_URL || `http://localhost:3000`;

    static passwordSalt = process.env.PASSWORD_SALT || 'afhsaifas323##$$%%^^';

    static authCookieName = 'access_token';

    static authCookieOptions({cookieForLogout,request,} : {cookieForLogout : boolean,request : Request}){
        return{
            maxAge: cookieForLogout ?  -10000 : 1000 * 60 * 60 * 48 , // would expire after 2 days
            httpOnly: true, // The cookie only accessible by the web server
            // signed: true, // Indicates if the cookie should be signed
            path: '/',
            secure : request.headers.origin ? true : false,
            sameSite : 'none'
        } as CookieOptions
    }
}