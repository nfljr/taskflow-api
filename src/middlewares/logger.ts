import type { Request, Response, NextFunction} from "express"

function getTime(){
    return new Date().toLocaleDateString()
}
export function logger(
    req : Request,
    res : Response,
    next : NextFunction
){
    console.log(`[${req.method}] ${req.url} - ${getTime()}`)
    next()
}