import express from 'express'
import { body } from "express-validator"

import { registerUser, getAllUsers, loginUser, getMe } from '../controllerss/userController'
import userModel from '../models/userModel'
import protectRoute from '../middleware/AuthMiddleware'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.post('/register', [
    body('name').not().isEmpty().withMessage("Name is required"),
    body('email').not().isEmpty().withMessage("Email is required"),
        body('email').isEmail().withMessage("Email must be Valid"),
        body('email').custom(async (email) => {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                throw new Error('Email already exists');
            }
        }),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    ],
    registerUser)

userRouter.post('/login',[ 
    body('email').not().isEmpty().withMessage("Email is required"),
    body('email').isEmail().withMessage("Email must be Valid"),
    body('password').not().isEmpty().withMessage("Password is required")
], loginUser)

userRouter.get('/me',protectRoute, getMe)


export default userRouter