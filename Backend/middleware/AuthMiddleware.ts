import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import UserModel from "../models/userModel"
import { Schema } from "mongoose"

interface DecodedToken extends jwt.JwtPayload {
    id: Schema.Types.ObjectId
}

interface CustomRequest extends Request {
    user?: any
}

const protectRoute = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    let Token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            Token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(Token, process.env.JWT_SECRET as string) as DecodedToken

            req.user = await UserModel.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            console.log("geta hoy  :", error)
            console.log(error)
            res.status(401) // means unauthorized
            throw new Error("Not authorized")
        }
    }

    if(!Token) {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

export default protectRoute