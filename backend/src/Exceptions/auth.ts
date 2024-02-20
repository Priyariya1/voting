import HttpError from 'http-errors'


const AuthExceptions = { 
    authorizationHeaderMissing: () => { 
        throw new HttpError.Unauthorized("Authentication Cookie is missing.")
    },
    unAuthorized: (message?:string) => { 
        throw new HttpError.Unauthorized(message ?? "unauthorized request")
    },
    userAlreadyExist: () => { 
        throw new HttpError.Conflict("An account with that Email already exists.")
    },
}

export default AuthExceptions