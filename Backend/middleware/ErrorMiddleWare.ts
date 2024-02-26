import { NextFunction, Request, Response } from "express"
const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 400 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}