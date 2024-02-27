import { NextFunction, Request, Response } from "express"

// Default Error Handler Middle Ware. This will be called when an error is occured on the functions that are wrapped with asyncHandler   
const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 400 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}