import type { Request, Response, NextFunction} from "express"
import {error} from "../utils/response.js"

export function errorHandler(
    err : any,
    req : Request,
    res : Response,
    next : NextFunction
){
    console.error(err)

    res.status(500).json(error(err.message || "server error"))
}