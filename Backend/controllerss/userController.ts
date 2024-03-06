import { Request, Response } from "express"
import UserModel from "../models/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { validationResult } from "express-validator"
import { Schema } from "mongoose"


interface CustomRequest extends Request {
    user? : any
}
/*
    @desc - Register New User and get token
    @route - POST /api/users/redister
    @access - Public
*/
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400)
        res.json({ errors: errors.array() })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword
    })
    console.log("registered user", user)

    if (user) {
        // status 201 means somthing has created
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

/*
    @desc - Get All Users
    @route - GET /api/users
    @access - Private

*/
export const getAllUsers = asyncHandler(async( req: Request, res: Response) => {

    const users = await UserModel.find()
    res.status(200).json(users)
})

/*
    @desc - Authenticate User & Get Token
    @route - POST /api/users/login
    @access - Public
*/

export const loginUser = asyncHandler(async ( req: Request, res : Response) => {
    
    const { email, password } = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400)
        res.json({ errors: errors.array() })
    }
    const user = await UserModel.findOne({ email })
    
    if(user && (await bcrypt.compare(password, user.password as string))) {
        res.status(200).json({
            message: "User Logged In",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token : generateToken(user._id)
            }            
        })
    } else{
        res.status(401)
        throw new Error("Invalid credentials")
    }

    res.status(200)
    res.json({ message: "Login User" })
})

export const generateToken = (id: Schema.Types.ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "30d" })
}

/*
    @desc - User Details
    @route - POST /api/users/me
    @access - Private
*/
export const getMe = asyncHandler(async (req: CustomRequest, res: Response) => {

    const user = await UserModel.findById(req.user?._id)
    if(user) {
        const {_id, name, email} = user
        res.status(200).json({message: "User Details", id: _id, name, email })
    }
    // res.status(200).json({message: "User Details", _id, name, email }) 
})