import HttpError from 'http-errors'

const CommonExceptions = {
    somethingWentWrong(msg?: string) {
        throw new HttpError.InternalServerError(msg ?? "something went wrong. contact support if the issue presist.")
    },
    toBeImplemented() {
        throw new HttpError.InternalServerError("this method has to be implemented.")
    },
    invalidRequest(msg?: string) {
        throw new HttpError.BadRequest(msg ?? "invalid request.")
    },
    contactSupport() {
        throw new HttpError.BadRequest("caontact support.")
    },
    unProcessableEntry(msg?: string) {
        throw new HttpError.UnprocessableEntity(msg ?? "Unprocessable Entry!, Please check the payload.")
    }
    
}


export default CommonExceptions;