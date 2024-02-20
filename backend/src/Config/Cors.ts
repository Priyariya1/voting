import { Request } from "express"
import { Config } from "../Config"


export const CorsConfig = (request: Request, callback: (...params: any) => void) => {

    const origin = request.headers.origin ?? "http://localhost:5173"

    let options = { origin ,credentials: true,}

    callback(null, options) 

}